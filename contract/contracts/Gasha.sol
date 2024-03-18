// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./zora/interfaces/IZoraCreator1155.sol";
import "./interfaces/IGasha.sol";
import "hardhat/console.sol";

contract Gasha is IGasha, OwnableUpgradeable {
    IZoraCreator1155 public ZoraCreator1155;

    IMinter1155 public MerkleMinter;

    address public mintReferral;

    bytes internal minterArguments;

    SeriesItem[] public series;

    uint256 public seed;

    uint256 public unitPrice;

    function initialize(
        address _initialOwner,
        address _zoraCreator1155,
        address _merkleMinter,
        address _mintReferral,
        uint256 _initialSeed,
        uint256 _unitPrice
    ) public initializer {
        __Ownable_init(_initialOwner);
        ZoraCreator1155 = IZoraCreator1155(_zoraCreator1155);
        MerkleMinter = IMinter1155(_merkleMinter);
        mintReferral = _mintReferral;
        seed = _initialSeed;
        unitPrice = _unitPrice;
    }

    function spin(uint256 quantity) public payable {
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

    // todo: onlyOwner
    function setNewSeriesItem(
        uint256 tokenId,
        Rareness rareness,
        uint256 weight
    ) public onlyOwner {
        series.push(SeriesItem(tokenId, rareness, weight, true));
    }

    // todo: onlyOwner
    function activateSeriesItem(uint256 tokenId) public onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].tokenId == tokenId) {
                series[i].isActive = true;
                break;
            }
        }
    }

    // todo: onlyOwner
    function deactivateSeriesItem(uint256 tokenId) public onlyOwner {
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].tokenId == tokenId) {
                series[i].isActive = false;
                break;
            }
        }
    }

    // todo: onlyOwner
    function resetSeed(uint256 newSeed) public onlyOwner {
        seed = newSeed;
    }

    // todo: onlyOwner
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