// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "../interfaces/IHat.sol";
import "../interfaces/ITokenERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Forwarder is Ownable {
    IHat public hat;

    ITokenERC1155 public lostNFT;

    mapping(address => bool) public operators;

    modifier onlyOperator() {
        require(operators[msg.sender], "Forwarder: caller is not the operator");
        _;
    }

    constructor(
        address _initialOwner,
        address _hat,
        address _lostNFT
    ) Ownable(_initialOwner) {
        hat = IHat(_hat);
        lostNFT = ITokenERC1155(_lostNFT);
    }

    function burnAndRedeemReward(address to) external payable onlyOperator {
        require(hat.erc721BalanceOf(to) > 0, "Forwarder: NFT required");
        require(msg.value > 0, "Forwarder: msg.value required");

        hat.useTicket(to);

        (bool success, ) = to.call{value: msg.value}("");
        require(success, "Transfer failed.");
    }

    function burnAndRedeemLostNFT(address to) external onlyOperator {
        require(hat.erc721BalanceOf(to) > 0, "Forwarder: NFT required");
        hat.useTicket(to);

        lostNFT.mintTo(to, 1, "", 1);
    }

    function setOperator(address operator, bool enabled) external onlyOwner {
        operators[operator] = enabled;
    }
}
