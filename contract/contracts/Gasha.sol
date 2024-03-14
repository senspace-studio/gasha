// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@zoralabs/zora-1155-contracts/src/interfaces/IZoraCreator1155.sol";
import "./interfaces/IGasha.sol";
import "hardhat/console.sol";

contract Gasha is IGasha {
    IZoraCreator1155 public ZoraCreator1155;

    IMinter1155 public MerkleMinter;

    address public mintReferral;

    SeriesItem[] public series;

    uint256 public seed;

    constructor(
        address _zoraCreator1155,
        address _merkleMinter,
        address _mintReferral,
        uint256 initialSeed
    ) {
        ZoraCreator1155 = IZoraCreator1155(_zoraCreator1155);
        MerkleMinter = IMinter1155(_merkleMinter);
        mintReferral = _mintReferral;
        seed = initialSeed;
    }

    function spin(
        uint256 quantity,
        bytes calldata minterArguments
    ) public payable {
        require(quantity > 0 && quantity < 1000, "Gasha: quantity is invalid");

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
                ZoraCreator1155.mintWithRewards{value: 777e12 * quantities[i]}(
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
        for (uint256 i = 0; i < series.length; i++) {
            totalWeight += series[i].weight;
        }

        uint256 randomNum = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, seed - salt)
            )
        ) % totalWeight;

        uint256 sum = 0;
        for (uint256 i = 0; i < series.length; i++) {
            sum += series[i].weight;
            if (randomNum < sum) {
                return series[i];
            }
        }

        revert("Gasha: failed to pick a random ball");
    }

    function setNewSeriesItem(
        uint256 tokenId,
        Rareness rareness,
        uint256 weight
    ) public {
        series.push(SeriesItem(tokenId, rareness, weight));
    }

    function removeSeriesItem(uint256 tokenId) public {
        for (uint256 i = 0; i < series.length; i++) {
            if (series[i].tokenId == tokenId) {
                for (uint256 j = i; j < series.length - 1; j++) {
                    series[j] = series[j + 1];
                }
                series.pop();
                break;
            }
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
