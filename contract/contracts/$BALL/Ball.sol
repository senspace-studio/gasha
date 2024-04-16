//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "./ERC404.sol";

contract Ball is OwnableUpgradeable, ERC404 {
  string private baseURI;

  function initialize(
    address _initialOwner,
    string memory _name,
    string memory _symbol,
    uint8 _decimals
  ) public initializer {
    __Ownable_init(_initialOwner);
    __ERC404_init(_name, _symbol, _decimals);
  }

  function mint(address _to, uint256 _amount) external {
    _mintERC20(_to, _amount);
  }

  function useTicket(address user) external onlyOwner {
    _withdrawAndStoreERC721(user);
  }

  function tokenURI(uint256 id_) public view override returns (string memory) {
    return string.concat(baseURI, Strings.toString(id_));
  }

  function setBaseURI(string memory baseURI_) external onlyOwner {
    baseURI = baseURI_;
  }
}