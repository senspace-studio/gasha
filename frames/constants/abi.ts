export const DEGEN_ABI = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "DelegateChanged",
    inputs: [
      {
        type: "address",
        name: "delegator",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "fromDelegate",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "toDelegate",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "DelegateVotesChanged",
    inputs: [
      {
        type: "address",
        name: "delegate",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "previousBalance",
        indexed: false,
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "newBalance",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "EIP712DomainChanged",
    inputs: [],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "FlatPlatformFeeUpdated",
    inputs: [
      {
        type: "address",
        name: "platformFeeRecipient",
        indexed: false,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "flatFee",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        type: "uint8",
        name: "version",
        indexed: false,
        internalType: "uint8",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PlatformFeeInfoUpdated",
    inputs: [
      {
        type: "address",
        name: "platformFeeRecipient",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "platformFeeBps",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PlatformFeeTypeUpdated",
    inputs: [
      {
        type: "uint8",
        name: "feeType",
        indexed: false,
        internalType: "enum IPlatformFee.PlatformFeeType",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrimarySaleRecipientUpdated",
    inputs: [
      {
        type: "address",
        name: "recipient",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "previousAdminRole",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "newAdminRole",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        indexed: true,
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "sender",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensMinted",
    inputs: [
      {
        type: "address",
        name: "mintedTo",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "quantityMinted",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensMintedWithSignature",
    inputs: [
      {
        type: "address",
        name: "signer",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "mintedTo",
        indexed: true,
        internalType: "address",
      },
      {
        type: "tuple",
        name: "mintRequest",
        components: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "address",
            name: "primarySaleRecipient",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "quantity",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "currency",
            internalType: "address",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        indexed: false,
        internalType: "struct ITokenERC20.MintRequest",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        type: "address",
        name: "from",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        indexed: true,
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "CLOCK_MODE",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "burnFrom",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkpoints",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
      {
        type: "uint32",
        name: "pos",
        internalType: "uint32",
      },
    ],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {
            type: "uint32",
            name: "fromBlock",
            internalType: "uint32",
          },
          {
            type: "uint224",
            name: "votes",
            internalType: "uint224",
          },
        ],
        internalType: "struct ERC20VotesUpgradeable.Checkpoint",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "clock",
    inputs: [],
    outputs: [
      {
        type: "uint48",
        name: "",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractType",
    inputs: [],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractVersion",
    inputs: [],
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decreaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "subtractedValue",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegate",
    inputs: [
      {
        type: "address",
        name: "delegatee",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegateBySig",
    inputs: [
      {
        type: "address",
        name: "delegatee",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "nonce",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "expiry",
        internalType: "uint256",
      },
      {
        type: "uint8",
        name: "v",
        internalType: "uint8",
      },
      {
        type: "bytes32",
        name: "r",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "s",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delegates",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eip712Domain",
    inputs: [],
    outputs: [
      {
        type: "bytes1",
        name: "fields",
        internalType: "bytes1",
      },
      {
        type: "string",
        name: "name",
        internalType: "string",
      },
      {
        type: "string",
        name: "version",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "chainId",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "verifyingContract",
        internalType: "address",
      },
      {
        type: "bytes32",
        name: "salt",
        internalType: "bytes32",
      },
      {
        type: "uint256[]",
        name: "extensions",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPastTotalSupply",
    inputs: [
      {
        type: "uint256",
        name: "timepoint",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPastVotes",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "timepoint",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPlatformFeeInfo",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
      {
        type: "uint16",
        name: "",
        internalType: "uint16",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleMember",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "uint256",
        name: "index",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleMemberCount",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVotes",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "increaseAllowance",
    inputs: [
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "addedValue",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        type: "address",
        name: "_defaultAdmin",
        internalType: "address",
      },
      {
        type: "string",
        name: "_name",
        internalType: "string",
      },
      {
        type: "string",
        name: "_symbol",
        internalType: "string",
      },
      {
        type: "string",
        name: "_contractURI",
        internalType: "string",
      },
      {
        type: "address[]",
        name: "_trustedForwarders",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "_primarySaleRecipient",
        internalType: "address",
      },
      {
        type: "address",
        name: "_platformFeeRecipient",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_platformFeeBps",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isTrustedForwarder",
    inputs: [
      {
        type: "address",
        name: "forwarder",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintTo",
    inputs: [
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintWithSignature",
    inputs: [
      {
        type: "tuple",
        name: "_req",
        components: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "address",
            name: "primarySaleRecipient",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "quantity",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "currency",
            internalType: "address",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        internalType: "struct ITokenERC20.MintRequest",
      },
      {
        type: "bytes",
        name: "_signature",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [
      {
        type: "bytes[]",
        name: "data",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        type: "bytes[]",
        name: "results",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "numCheckpoints",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "uint32",
        name: "",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "permit",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
      {
        type: "uint8",
        name: "v",
        internalType: "uint8",
      },
      {
        type: "bytes32",
        name: "r",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "s",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "primarySaleRecipient",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        type: "bytes32",
        name: "role",
        internalType: "bytes32",
      },
      {
        type: "address",
        name: "account",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setContractURI",
    inputs: [
      {
        type: "string",
        name: "_uri",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPlatformFeeInfo",
    inputs: [
      {
        type: "address",
        name: "_platformFeeRecipient",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "_platformFeeBps",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrimarySaleRecipient",
    inputs: [
      {
        type: "address",
        name: "_saleRecipient",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        type: "bytes4",
        name: "interfaceId",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        type: "address",
        name: "from",
        internalType: "address",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verify",
    inputs: [
      {
        type: "tuple",
        name: "_req",
        components: [
          {
            type: "address",
            name: "to",
            internalType: "address",
          },
          {
            type: "address",
            name: "primarySaleRecipient",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "quantity",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "price",
            internalType: "uint256",
          },
          {
            type: "address",
            name: "currency",
            internalType: "address",
          },
          {
            type: "uint128",
            name: "validityStartTimestamp",
            internalType: "uint128",
          },
          {
            type: "uint128",
            name: "validityEndTimestamp",
            internalType: "uint128",
          },
          {
            type: "bytes32",
            name: "uid",
            internalType: "bytes32",
          },
        ],
        internalType: "struct ITokenERC20.MintRequest",
      },
      {
        type: "bytes",
        name: "_signature",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "",
        internalType: "bool",
      },
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
] as const

export const GASHA_ABI = [
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ActivateSeriesItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "DeactivateSeriesItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "seed",
        type: "uint256",
      },
    ],
    name: "ResetSeed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "endTime",
        type: "uint64",
      },
    ],
    name: "SetAvailableTime",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum IGasha.Rareness",
        name: "rareness",
        type: "uint8",
      },
    ],
    name: "SetNewSeriesItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "quantities",
        type: "uint256[]",
      },
    ],
    name: "Spin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "Ball",
    outputs: [
      {
        internalType: "contract IBall",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GashaItem",
    outputs: [
      {
        internalType: "contract IGashaItem",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "activateSeriesItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "activeSeriesItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "enum IGasha.Rareness",
            name: "rareness",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct IGasha.SeriesItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "basePoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bonusPoint",
    outputs: [
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "endTime",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "multiplier",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "deactivateSeriesItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "quantities",
        type: "uint256[]",
      },
    ],
    name: "dropByOwner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gashaItemERC1155",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ballERC404",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialSeed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unitPrice",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSeed",
        type: "uint256",
      },
    ],
    name: "resetSeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "series",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "enum IGasha.Rareness",
        name: "rareness",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seriesItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "enum IGasha.Rareness",
            name: "rareness",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct IGasha.SeriesItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_endTime",
        type: "uint64",
      },
    ],
    name: "setAvailableTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "enum IGasha.Rareness",
        name: "rareness",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    name: "setNewSeriesItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "spin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "togglePause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unitPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const
