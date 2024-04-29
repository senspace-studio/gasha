// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./zora/interfaces/IERC20Minter.sol";
import "./zora/interfaces/IZoraCreator1155.sol";
import "./interfaces/IGasha.sol";

contract Gasha is IGasha, OwnableUpgradeable, PausableUpgradeable {
    address public zora1155Creator;

    address public currency;

    address public mintReferral;

    IERC20Minter public ERC20Minter;

    SeriesItem[] public series;

    uint256 public seed;

    uint256 public unitPrice;

    uint64 public startTime;

    uint64 public endTime;

    modifier isAvailableTime() {
        uint256 currentTime = block.timestamp;
        require(
            startTime <= currentTime && currentTime <= endTime,
            "Gasha: not available now"
        );
        _;
    }

    function initialize(
        address _initialOwner,
        address _zora1155Creator,
        address _currency,
        address _mintReferral,
        address _erc20Minter,
        uint256 _initialSeed,
        uint256 _unitPrice
    ) public initializer {
        __Ownable_init();
        __Pausable_init();
        transferOwnership(_initialOwner);
        zora1155Creator = _zora1155Creator;
        currency = _currency;
        mintReferral = _mintReferral;
        ERC20Minter = IERC20Minter(_erc20Minter);
        seed = _initialSeed;
        unitPrice = _unitPrice;
    }

    function spin(
        uint256 quantity
    ) external isAvailableTime whenNotPaused {
        require(quantity > 0 && quantity < 1000, "Gasha: quantity is invalid");

        SeriesItem[] memory activeSeriesItem = activeSeriesItems();
        uint256[] memory ids = new uint256[](activeSeriesItem.length);
        uint256[] memory quantities = new uint256[](activeSeriesItem.length);
        for (uint256 i = 0; i < activeSeriesItem.length; i++) {
            ids[i] = activeSeriesItem[i].tokenId;
            quantities[i] = 0;
        }

        uint256 totalWeight = _totalWeight();

        require(totalWeight > 0, "Gasha: total weight is 0");

        for (uint256 i = 0; i < quantity; i++) {
            SeriesItem memory item = _pickRandomBall(totalWeight, i);
            for (uint256 j = 0; j < activeSeriesItem.length; j++) {
                if (activeSeriesItem[j].tokenId == item.tokenId) {
                    quantities[j]++;
                    break;
                }
            }
        }

        _mintBatch(msg.sender, ids, quantities);

        emit Spin(msg.sender, ids, quantities);
    }

    function dropByOwner(
        address to,
        uint256[] memory ids,
        uint256[] memory quantities
    ) external payable onlyOwner {
        uint256 totalQuantity = 0;
        for (uint256 i = 0; i < quantities.length; i++) {
            totalQuantity += quantities[i];
        }
        require(
            msg.value >= unitPrice * totalQuantity,
            "Gasha: insufficient funds"
        );

        _mintBatch(to, ids, quantities);

        emit Spin(to, ids, quantities);
    }

    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory quantities
    ) private {
        for (uint256 i = 0; i < ids.length; i++) {
            if (quantities[i] > 0) {
                ERC20Minter.mint(
                    to,
                    quantities[i],
                    zora1155Creator,
                    ids[i],
                    unitPrice * quantities[i],
                    currency,
                    mintReferral,
                    ""
                );
            }
        }
    }

    function _pickRandomBall(
        uint256 totalWeight,
        uint256 salt
    ) internal view returns (SeriesItem memory item) {
        SeriesItem[] memory seriesItem = activeSeriesItems();

        uint256 randomNum = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, salt)
            )
        ) % totalWeight;

        uint256 sum = 0;
        for (uint256 i = 0; i < seriesItem.length; i++) {
            sum += seriesItem[i].weight;
            if (randomNum < sum) {
                return seriesItem[i];
            }
        }

        return seriesItem[0];
    }

    function _totalWeight() internal view returns (uint256 totalWeight) {
        SeriesItem[] memory seriesItem = activeSeriesItems();
        for (uint256 i = 0; i < seriesItem.length; i++) {
            totalWeight += series[i].weight;
        }
    }

    function activeSeriesItems() public view returns (SeriesItem[] memory) {
        uint256 activeItemCount = 0;
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].isActive) {
                activeItemCount++;
            }
        }

        SeriesItem[] memory activeItems = new SeriesItem[](activeItemCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].isActive) {
                activeItems[currentIndex] = series[i];
                currentIndex++;
            }
        }

        return activeItems;
    }

    function seriesItems() public view returns (SeriesItem[] memory) {
        return series;
    }

    function setNewSeriesItem(
        uint256 tokenId,
        Rareness rareness,
        uint256 weight
    ) public onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            require(
                series[i].tokenId != tokenId,
                "Gasha: tokenId is already exist"
            );
        }
        series.push(SeriesItem(tokenId, rareness, weight, false));
    }

    function activateSeriesItem(uint256 tokenId) public onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].tokenId == tokenId) {
                series[i].isActive = true;
                break;
            }
        }
    }

    function deactivateSeriesItem(uint256 tokenId) public onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].tokenId == tokenId) {
                series[i].isActive = false;
                break;
            }
        }
    }

    function resetSeed(uint256 newSeed) external onlyOwner {
        seed = newSeed;
    }

    function setAvailableTime(
        uint64 _startTime,
        uint64 _endTime
    ) external onlyOwner {
        startTime = _startTime;
        endTime = _endTime;

        emit SetAvailableTime(_startTime, _endTime);
    }

    function togglePause() external onlyOwner {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}
