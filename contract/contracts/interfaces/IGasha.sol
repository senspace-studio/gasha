// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IGasha {
    event Spin(address indexed minter, uint256[] ids, uint256[] quantities);

    enum Rareness {
        Common,
        Rare,
        Special
    }

    struct SeriesItem {
        uint256 tokenId;
        Rareness rareness;
        uint256 weight;
    }

    struct PickedSeriesItem {
        uint256 tokenId;
        uint256 quantity;
    }

    function spin(uint256 quantity) external payable;

    function setMinterArguments(bytes memory _minterArguments) external;
}
