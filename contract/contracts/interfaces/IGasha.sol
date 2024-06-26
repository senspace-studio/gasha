// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IGasha {
    // ***********************
    // *** Events Section ****
    // ***********************

    event Spin(address indexed minter, uint256[] ids, uint256[] quantities);

    event SetNewSeriesItem(
        uint256 indexed tokenId,
        uint256 weight,
        Rareness rareness
    );

    event ActivateSeriesItem(uint256 indexed tokenId);

    event DeactivateSeriesItem(uint256 indexed tokenId);

    event ResetSeed(uint256 indexed seed);

    event SetAvailableTime(uint64 startTime, uint64 endTime);

    // ***********************
    // *** Structs Section ****
    // ***********************

    enum Rareness {
        Common,
        Rare,
        Special
    }

    struct SeriesItem {
        uint256 tokenId;
        Rareness rareness;
        uint256 weight;
        bool isActive;
    }

    struct PickedSeriesItem {
        uint256 tokenId;
        uint256 quantity;
    }

    // ***********************
    // *** Functions Section ****
    // ***********************

    function spin(uint256 quantity) external payable;

    function setMinterArguments(bytes memory _minterArguments) external;

    function setAvailableTime(uint64 _startTime, uint64 _endTime) external;

    function resetSeed(uint256 newSeed) external;

    function togglePause() external;

    function activateSeriesItem(uint256 tokenId) external;

    function deactivateSeriesItem(uint256 tokenId) external;

    function setNewSeriesItem(
        uint256 tokenId,
        Rareness rareness,
        uint256 weight
    ) external;
}
