// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IBall {
    function mint(address to, uint256 amount) external;

    function useTicket(address user) external;

    function setBaseURI(string memory baseURI_) external;
}