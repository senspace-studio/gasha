// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./zora/interfaces/IZoraCreator1155.sol";
import "./interfaces/IGasha.sol";
import "hardhat/console.sol";

contract Gasha is IGasha, OwnableUpgradeable, PausableUpgradeable {
    IZoraCreator1155 public ZoraCreator1155;

    IMinter1155 public MerkleMinter;

    address public mintReferral;

    bytes internal minterArguments;

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
        address _zoraCreator1155,
        address _merkleMinter,
        address _mintReferral,
        uint256 _initialSeed,
        uint256 _unitPrice
    ) public initializer {
        __Ownable_init();
        __Pausable_init();
        transferOwnership(_initialOwner);
        ZoraCreator1155 = IZoraCreator1155(_zoraCreator1155);
        MerkleMinter = IMinter1155(_merkleMinter);
        mintReferral = _mintReferral;
        seed = _initialSeed;
        unitPrice = _unitPrice;
    }

    function spin(
        uint256 quantity
    ) public payable isAvailableTime whenNotPaused {
        require(quantity > 0 && quantity < 1000, "Gasha: quantity is invalid");
        require(msg.value >= unitPrice * quantity, "Gasha: insufficient funds");

        uint256[] memory ids = new uint256[](series.length);
        uint256[] memory quantities = new uint256[](series.length);
        for (uint256 i = 0; i < series.length; i++) {
            ids[i] = series[i].tokenId;
            quantities[i] = 0;
        }

        for (uint256 i = 0; i < quantity; i++) {
            SeriesItem memory item = _pickRandomBall(i);
            for (uint256 j = 0; j < series.length; j++) {
                if (series[j].tokenId == item.tokenId) {
                    quantities[j]++;
                    break;
                }
            }
        }

        for (uint256 i = 0; i < series.length; i++) {
            if (quantities[i] > 0) {
                ZoraCreator1155.mintWithRewards{
                    value: unitPrice * quantities[i]
                }(
                    MerkleMinter,
                    ids[i],
                    quantities[i],
                    minterArguments,
                    mintReferral
                );
            }
        }

        ZoraCreator1155.safeBatchTransferFrom(
            address(this),
            msg.sender,
            ids,
            quantities,
            ""
        );

        emit Spin(msg.sender, ids, quantities);
    }

    // FreeSpin

    // DropSpin

    function dropByOwner(
        address to,
        uint256[] calldata ids,
        uint256[] calldata quantities
    ) external onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            if (quantities[i] > 0) {
                ZoraCreator1155.mintWithRewards{
                    value: unitPrice * quantities[i]
                }(
                    MerkleMinter,
                    ids[i],
                    quantities[i],
                    minterArguments,
                    mintReferral
                );
            }
        }

        ZoraCreator1155.safeBatchTransferFrom(
            address(this),
            to,
            ids,
            quantities,
            ""
        );

        emit Spin(to, ids, quantities);
    }

    function _pickRandomBall(
        uint256 salt
    ) internal view returns (SeriesItem memory item) {
        uint256 totalWeight = 0;
        SeriesItem[] memory seriesItem = activeSeriesItems();
        for (uint256 i = 0; i < seriesItem.length; i++) {
            totalWeight += seriesItem[i].weight;
        }

        uint256 randomNum = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, seed - salt)
            )
        ) % totalWeight;

        uint256 sum = 0;
        for (uint256 i = 0; i < seriesItem.length; i++) {
            sum += seriesItem[i].weight;
            if (randomNum < sum) {
                return seriesItem[i];
            }
        }

        revert("Gasha: failed to pick a random ball");
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
        series.push(SeriesItem(tokenId, rareness, weight, true));
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

    function setMinterArguments(
        bytes memory _minterArguments
    ) external onlyOwner {
        minterArguments = _minterArguments;
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
