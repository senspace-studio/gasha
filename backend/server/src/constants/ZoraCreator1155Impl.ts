export const ZoraCreator1155Impl = {
  _format: 'hh-sol-artifact-1',
  contractName: 'ZoraCreator1155Impl',
  sourceName: 'contracts/zora/nft/ZoraCreator1155Impl.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_mintFeeRecipient',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_upgradeGate',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_protocolRewards',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'ADDRESS_DELEGATECALL_TO_NON_CONTRACT',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ADDRESS_LOW_LEVEL_CALL_FAILED',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'Burn_NotOwnerOrApproved',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CREATOR_FUNDS_RECIPIENT_NOT_SET',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'reason',
          type: 'bytes',
        },
      ],
      name: 'CallFailed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Call_TokenIdMismatch',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CallerNotZoraCreator1155',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'totalMinted',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'maxSupply',
          type: 'uint256',
        },
      ],
      name: 'CannotMintMoreTokens',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'proposedAddress',
          type: 'address',
        },
      ],
      name: 'Config_TransferHookNotSupported',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_ACCOUNTS_AND_IDS_LENGTH_MISMATCH',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_ADDRESS_ZERO_IS_NOT_A_VALID_OWNER',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_BURN_AMOUNT_EXCEEDS_BALANCE',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_BURN_FROM_ZERO_ADDRESS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_CALLER_IS_NOT_TOKEN_OWNER_OR_APPROVED',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_ERC1155RECEIVER_REJECTED_TOKENS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_IDS_AND_AMOUNTS_LENGTH_MISMATCH',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_INSUFFICIENT_BALANCE_FOR_TRANSFER',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_MINT_TO_ZERO_ADDRESS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_MINT_TO_ZERO_ADDRESS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_SETTING_APPROVAL_FOR_SELF',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_TRANSFER_TO_NON_ERC1155RECEIVER_IMPLEMENTER',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1155_TRANSFER_TO_ZERO_ADDRESS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967_NEW_IMPL_NOT_CONTRACT',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967_NEW_IMPL_NOT_UUPS',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967_UNSUPPORTED_PROXIABLEUUID',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'ETHWithdrawFailed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FUNCTION_MUST_BE_CALLED_THROUGH_ACTIVE_PROXY',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FUNCTION_MUST_BE_CALLED_THROUGH_DELEGATECALL',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'contractValue',
          type: 'uint256',
        },
      ],
      name: 'FundsWithdrawInsolvent',
      type: 'error',
    },
    {
      inputs: [],
      name: 'INITIALIZABLE_CONTRACT_ALREADY_INITIALIZED',
      type: 'error',
    },
    {
      inputs: [],
      name: 'INITIALIZABLE_CONTRACT_IS_NOT_INITIALIZING',
      type: 'error',
    },
    {
      inputs: [],
      name: 'INVALID_ADDRESS_ZERO',
      type: 'error',
    },
    {
      inputs: [],
      name: 'INVALID_ETH_AMOUNT',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'mintTo',
          type: 'address',
        },
        {
          internalType: 'bytes32[]',
          name: 'merkleProof',
          type: 'bytes32[]',
        },
        {
          internalType: 'bytes32',
          name: 'merkleRoot',
          type: 'bytes32',
        },
      ],
      name: 'InvalidMerkleProof',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidMintSchedule',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'enum ECDSAUpgradeable.RecoverError',
          name: 'recoverError',
          type: 'uint8',
        },
      ],
      name: 'InvalidSignature',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidSignatureVersion',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'magicValue',
          type: 'bytes4',
        },
      ],
      name: 'InvalidSigner',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintNotYetStarted',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Mint_InsolventSaleTransfer',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Mint_TokenIDMintNotAllowed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Mint_UnknownCommand',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Mint_ValueTransferFail',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MinterContractAlreadyExists',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MinterContractDoesNotExist',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NewOwnerNeedsToBeAdmin',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'NoRendererForToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ONLY_CREATE_REFERRAL',
      type: 'error',
    },
    {
      inputs: [],
      name: 'PremintDeleted',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'caller',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'ProtocolRewardsWithdrawFailed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'renderer',
          type: 'address',
        },
      ],
      name: 'RendererNotValid',
      type: 'error',
    },
    {
      inputs: [],
      name: 'Renderer_NotValidRendererContract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'SaleEnded',
      type: 'error',
    },
    {
      inputs: [],
      name: 'SaleHasNotStarted',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'targetContract',
          type: 'address',
        },
      ],
      name: 'Sale_CannotCallNonSalesContract',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'expected',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'actual',
          type: 'uint256',
        },
      ],
      name: 'TokenIdMismatch',
      type: 'error',
    },
    {
      inputs: [],
      name: 'UUPS_UPGRADEABLE_MUST_NOT_BE_CALLED_THROUGH_DELEGATECALL',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'limit',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'requestedAmount',
          type: 'uint256',
        },
      ],
      name: 'UserExceedsMintLimit',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
      ],
      name: 'UserMissingRoleForToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'WrongValueSent',
      type: 'error',
    },
    {
      inputs: [],
      name: 'premintSignerContractFailedToRecoverSigner',
      type: 'error',
    },
    {
      inputs: [],
      name: 'premintSignerContractNotAContract',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'previousAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'AdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'beacon',
          type: 'address',
        },
      ],
      name: 'BeaconUpgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'updater',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'enum IZoraCreator1155.ConfigUpdate',
          name: 'updateType',
          type: 'uint8',
        },
        {
          components: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'uint96',
              name: '__gap1',
              type: 'uint96',
            },
            {
              internalType: 'address payable',
              name: 'fundsRecipient',
              type: 'address',
            },
            {
              internalType: 'uint96',
              name: '__gap2',
              type: 'uint96',
            },
            {
              internalType: 'contract ITransferHookReceiver',
              name: 'transferHook',
              type: 'address',
            },
            {
              internalType: 'uint96',
              name: '__gap3',
              type: 'uint96',
            },
          ],
          indexed: false,
          internalType: 'struct IZoraCreator1155TypesV1.ContractConfig',
          name: 'newConfig',
          type: 'tuple',
        },
      ],
      name: 'ConfigUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'updater',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
      ],
      name: 'ContractMetadataUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract IRenderer1155',
          name: 'renderer',
          type: 'address',
        },
      ],
      name: 'ContractRendererUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'structHash',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'domainName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'version',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'creator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'signature',
          type: 'bytes',
        },
      ],
      name: 'CreatorAttribution',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'lastOwner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Purchased',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'renderer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'RendererUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'newURI',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maxSupply',
          type: 'uint256',
        },
      ],
      name: 'SetupNewToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
      ],
      name: 'TransferBatch',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'TransferSingle',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'value',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'URI',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'permissions',
          type: 'uint256',
        },
      ],
      name: 'UpdatedPermissions',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          components: [
            {
              internalType: 'uint32',
              name: 'royaltyMintSchedule',
              type: 'uint32',
            },
            {
              internalType: 'uint32',
              name: 'royaltyBPS',
              type: 'uint32',
            },
            {
              internalType: 'address',
              name: 'royaltyRecipient',
              type: 'address',
            },
          ],
          indexed: false,
          internalType: 'struct ICreatorRoyaltiesControl.RoyaltyConfiguration',
          name: 'configuration',
          type: 'tuple',
        },
      ],
      name: 'UpdatedRoyalties',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          components: [
            {
              internalType: 'string',
              name: 'uri',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'maxSupply',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'totalMinted',
              type: 'uint256',
            },
          ],
          indexed: false,
          internalType: 'struct IZoraCreator1155TypesV1.TokenData',
          name: 'tokenData',
          type: 'tuple',
        },
      ],
      name: 'UpdatedToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      inputs: [],
      name: 'CONTRACT_BASE_ID',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PERMISSION_BIT_ADMIN',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PERMISSION_BIT_FUNDS_MANAGER',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PERMISSION_BIT_METADATA',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PERMISSION_BIT_MINTER',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PERMISSION_BIT_SALES',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'permissionBits',
          type: 'uint256',
        },
      ],
      name: 'addPermission',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'adminMint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'quantities',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'adminMintBatch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'lastTokenId',
          type: 'uint256',
        },
      ],
      name: 'assumeLastTokenIdMatches',
      outputs: [],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'accounts',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
      ],
      name: 'balanceOfBatch',
      outputs: [
        {
          internalType: 'uint256[]',
          name: 'batchBalances',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
      ],
      name: 'burnBatch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'callRenderer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'contract IMinter1155',
          name: 'salesConfig',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'callSale',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'numTokens',
          type: 'uint256',
        },
      ],
      name: 'computeFreeMintRewards',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'creatorReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'createReferralReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'mintReferralReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'firstMinterReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'zoraReward',
              type: 'uint256',
            },
          ],
          internalType: 'struct RewardsSettings',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'numTokens',
          type: 'uint256',
        },
      ],
      name: 'computePaidMintRewards',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'creatorReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'createReferralReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'mintReferralReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'firstMinterReward',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'zoraReward',
              type: 'uint256',
            },
          ],
          internalType: 'struct RewardsSettings',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'numTokens',
          type: 'uint256',
        },
      ],
      name: 'computeTotalReward',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'config',
      outputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint96',
          name: '__gap1',
          type: 'uint96',
        },
        {
          internalType: 'address payable',
          name: 'fundsRecipient',
          type: 'address',
        },
        {
          internalType: 'uint96',
          name: '__gap2',
          type: 'uint96',
        },
        {
          internalType: 'contract ITransferHookReceiver',
          name: 'transferHook',
          type: 'address',
        },
        {
          internalType: 'uint96',
          name: '__gap3',
          type: 'uint96',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractVersion',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'createReferrals',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'customRenderers',
      outputs: [
        {
          internalType: 'contract IRenderer1155',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: 'premintConfig',
          type: 'bytes',
        },
        {
          internalType: 'bytes32',
          name: 'premintVersion',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'signature',
          type: 'bytes',
        },
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'premintSignerContract',
          type: 'address',
        },
      ],
      name: 'delegateSetupNewToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'newTokenId',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint32',
          name: '',
          type: 'uint32',
        },
      ],
      name: 'delegatedTokenId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'firstMinters',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getCreatorRewardRecipient',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getCustomRenderer',
      outputs: [
        {
          internalType: 'contract IRenderer1155',
          name: 'customRenderer',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getRoyalties',
      outputs: [
        {
          components: [
            {
              internalType: 'uint32',
              name: 'royaltyMintSchedule',
              type: 'uint32',
            },
            {
              internalType: 'uint32',
              name: 'royaltyBPS',
              type: 'uint32',
            },
            {
              internalType: 'address',
              name: 'royaltyRecipient',
              type: 'address',
            },
          ],
          internalType: 'struct ICreatorRoyaltiesControl.RoyaltyConfiguration',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getTokenInfo',
      outputs: [
        {
          components: [
            {
              internalType: 'string',
              name: 'uri',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'maxSupply',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'totalMinted',
              type: 'uint256',
            },
          ],
          internalType: 'struct IZoraCreator1155TypesV1.TokenData',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'implementation',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'contractName',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'newContractURI',
          type: 'string',
        },
        {
          components: [
            {
              internalType: 'uint32',
              name: 'royaltyMintSchedule',
              type: 'uint32',
            },
            {
              internalType: 'uint32',
              name: 'royaltyBPS',
              type: 'uint32',
            },
            {
              internalType: 'address',
              name: 'royaltyRecipient',
              type: 'address',
            },
          ],
          internalType: 'struct ICreatorRoyaltiesControl.RoyaltyConfiguration',
          name: 'defaultRoyaltyConfiguration',
          type: 'tuple',
        },
        {
          internalType: 'address payable',
          name: 'defaultAdmin',
          type: 'address',
        },
        {
          internalType: 'bytes[]',
          name: 'setupActions',
          type: 'bytes[]',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'role',
          type: 'uint256',
        },
      ],
      name: 'isAdminOrRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'metadataRendererContract',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IMinter1155',
          name: 'minter',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'address[]',
          name: 'rewardsRecipients',
          type: 'address[]',
        },
        {
          internalType: 'bytes',
          name: 'minterArguments',
          type: 'bytes',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'mintFee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IMinter1155',
          name: 'minter',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'minterArguments',
          type: 'bytes',
        },
        {
          internalType: 'address',
          name: 'mintReferral',
          type: 'address',
        },
      ],
      name: 'mintWithRewards',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes[]',
          name: 'data',
          type: 'bytes[]',
        },
      ],
      name: 'multicall',
      outputs: [
        {
          internalType: 'bytes[]',
          name: 'results',
          type: 'bytes[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nextTokenId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'permissions',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'permissionBits',
          type: 'uint256',
        },
      ],
      name: 'removePermission',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'royalties',
      outputs: [
        {
          internalType: 'uint32',
          name: 'royaltyMintSchedule',
          type: 'uint32',
        },
        {
          internalType: 'uint32',
          name: 'royaltyBPS',
          type: 'uint32',
        },
        {
          internalType: 'address',
          name: 'royaltyRecipient',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'salePrice',
          type: 'uint256',
        },
      ],
      name: 'royaltyInfo',
      outputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'royaltyAmount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: 'ids',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: 'amounts',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeBatchTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address payable',
          name: 'fundsRecipient',
          type: 'address',
        },
      ],
      name: 'setFundsRecipient',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'setOwner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'contract IRenderer1155',
          name: 'renderer',
          type: 'address',
        },
      ],
      name: 'setTokenMetadataRenderer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract ITransferHookReceiver',
          name: 'transferHook',
          type: 'address',
        },
      ],
      name: 'setTransferHook',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newURI',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'maxSupply',
          type: 'uint256',
        },
      ],
      name: 'setupNewToken',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newURI',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'maxSupply',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'createReferral',
          type: 'address',
        },
      ],
      name: 'setupNewTokenWithCreateReferral',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'supportedPremintSignatureVersions',
      outputs: [
        {
          internalType: 'string[]',
          name: '',
          type: 'string[]',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_newURI',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_newName',
          type: 'string',
        },
      ],
      name: 'updateContractMetadata',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
      ],
      name: 'updateCreateReferral',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          components: [
            {
              internalType: 'uint32',
              name: 'royaltyMintSchedule',
              type: 'uint32',
            },
            {
              internalType: 'uint32',
              name: 'royaltyBPS',
              type: 'uint32',
            },
            {
              internalType: 'address',
              name: 'royaltyRecipient',
              type: 'address',
            },
          ],
          internalType: 'struct ICreatorRoyaltiesControl.RoyaltyConfiguration',
          name: 'newConfiguration',
          type: 'tuple',
        },
      ],
      name: 'updateRoyaltiesForToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_newURI',
          type: 'string',
        },
      ],
      name: 'updateTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
      ],
      name: 'upgradeTo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'uri',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
  bytecode:
    '0x6101206040523060805261271060a0523480156200001c57600080fd5b5060405162006222380380620062228339810160408190526200003f91620001b0565b808381816001600160a01b03821615806200006157506001600160a01b038116155b156200008057604051632d87658960e01b815260040160405180910390fd5b6001600160a01b0391821660e0521660c0525050600054610100900460ff1615801580620000b2575060005460ff1615155b8015620000e25750620000d0306200018460201b620024e51760201c565b80620000e2575060005460ff16600114155b156200010157604051633d5c224160e11b815260040160405180910390fd5b6000805460ff19166001179055801562000125576000805461ff0019166101001790555b6001600160a01b0383166101005280156200017a576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050620001fa565b6001600160a01b03163b151590565b80516001600160a01b0381168114620001ab57600080fd5b919050565b600080600060608486031215620001c657600080fd5b620001d18462000193565b9250620001e16020850162000193565b9150620001f16040850162000193565b90509250925092565b60805160a05160c05160e05161010051615f9d620002856000396000612b0b015260008181613faf01526140bf015260008181613f2e01528181613f6001528181613fe8015281816140690152818161409b0152614104015260006110460152600081816111480152818161118901528181611366015281816113a701526114200152615f9d6000f3fe6080604052600436106102f75760003560e01c8062fdd58e14610303578063011442011461033657806301ffc9a71461034b57806306fdde031461037b5780630e89341c1461039d57806310a7eb5d146103bd57806313966db5146103df57806313af4035146103f957806317bd48bb1461041957806318711c7d1461043957806318e97fd11461044e57806323bd03861461046e5780632a55205a1461048e5780632eb2c2d6146104bc578063300ecdb9146104dc578063359f1302146105155780633659cfe6146105285780633ccfd60b146105485780634132239b1461055d5780634e1273f41461057d5780634f1ef286146105aa57806352d1902d146105bd5780635c046084146105d25780635c60da1b146106345780635d0f6cba146106565780635e4e0404146106765780636661a9ba14610696578063674cbae6146106b657806369a5b302146106d65780636b20c4541461070d578063709e537f1461072d578063722933f71461074d57806375794a3c1461076d57806379502c55146107845780637dafae4d1461081c5780637f2dc61c146108535780637f77f574146108735780638a08eb4c146108f15780638c7a63ae146109115780638da5cb5b1461093e5780638ec998a01461095d578063929a71281461097d57806395d89b41146109925780639c5c63c9146109a65780639dbb844d146109c65780639ebb8324146109d9578063a0a8e46014610a10578063a22cb46514610a3e578063a453eaf014610a5e578063ac9650d814610a73578063afed7e9e14610aa0578063bb3bafd614610ac0578063bdd864f214610aed578063c046435614610b1b578063c238d1ee14610b30578063d1ad846b14610b50578063d258609a14610b70578063d904b94a14610b90578063dd15e05f14610bb0578063e72878b414610be7578063e74d86c214610c07578063e8a3d48514610c27578063e985e9c514610c3c578063ed78891314610c5c578063ef71c82e14610c7e578063f1b0d6bb14610c9e578063f242432a14610cb357600080fd5b366102fe57005b600080fd5b34801561030f57600080fd5b5061032361031e36600461436e565b610cd3565b6040519081526020015b60405180910390f35b34801561034257600080fd5b50610323600081565b34801561035757600080fd5b5061036b6103663660046143b0565b610d27565b604051901515815260200161032d565b34801561038757600080fd5b50610390610dbd565b60405161032d919061441d565b3480156103a957600080fd5b506103906103b8366004614430565b610e50565b3480156103c957600080fd5b506103dd6103d8366004614449565b610f1f565b005b3480156103eb57600080fd5b506602c2ad68fd9000610323565b34801561040557600080fd5b506103dd610414366004614449565b610f3c565b34801561042557600080fd5b506103dd610434366004614466565b610f7f565b34801561044557600080fd5b50610323600881565b34801561045a57600080fd5b506103dd6104693660046145ab565b610fc1565b34801561047a57600080fd5b5061036b6104893660046145f1565b61101f565b34801561049a57600080fd5b506104ae6104a9366004614626565b611034565b60405161032d929190614648565b3480156104c857600080fd5b506103dd6104d73660046146f5565b611095565b3480156104e857600080fd5b506103236104f7366004614466565b6101fe60209081526000928352604080842090915290825290205481565b6103dd61052336600461482e565b6110e0565b34801561053457600080fd5b506103dd610543366004614449565b61113e565b34801561055457600080fd5b506103dd611208565b34801561056957600080fd5b50610323610578366004614430565b61126a565b34801561058957600080fd5b5061059d6105983660046148c3565b61127d565b60405161032d91906149c0565b6103dd6105b83660046149d3565b61135c565b3480156105c957600080fd5b50610323611413565b3480156105de57600080fd5b506105f26105ed366004614430565b611472565b60405161032d9190600060a082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015292915050565b34801561064057600080fd5b506106496114e5565b60405161032d9190614a0c565b34801561066257600080fd5b506103dd610671366004614a20565b6114f4565b34801561068257600080fd5b50610649610691366004614430565b611551565b3480156106a257600080fd5b506103dd6106b1366004614466565b6115a6565b3480156106c257600080fd5b506103236106d1366004614a58565b611647565b3480156106e257600080fd5b506106496106f1366004614430565b6101c7602052600090815260409020546001600160a01b031681565b34801561071957600080fd5b506103dd610728366004614ab6565b6116c8565b34801561073957600080fd5b50610323610748366004614b38565b611778565b34801561075957600080fd5b506105f2610768366004614430565b6118dd565b34801561077957600080fd5b506103236101c85481565b34801561079057600080fd5b506101c9546101ca546101cb546107d5926001600160a01b03808216936001600160601b03600160a01b93849004811694828416949283900482169381169290041686565b604080516001600160a01b0397881681526001600160601b0396871660208201529487169085015291841660608401529093166080820152911660a082015260c00161032d565b34801561082857600080fd5b50610649610837366004614430565b610231602052600090815260409020546001600160a01b031681565b34801561085f57600080fd5b506103dd61086e366004614449565b611957565b34801561087f57600080fd5b506108c561088e366004614430565b6101606020526000908152604090205463ffffffff80821691600160201b810490911690600160401b90046001600160a01b031683565b6040805163ffffffff94851681529390921660208401526001600160a01b03169082015260600161032d565b3480156108fd57600080fd5b506103dd61090c366004614c57565b611a57565b34801561091d57600080fd5b5061093161092c366004614430565b611b98565b60405161032d9190614d0b565b34801561094a57600080fd5b506101c9546001600160a01b0316610649565b34801561096957600080fd5b506103dd610978366004614a20565b611c82565b34801561098957600080fd5b50610323602081565b34801561099e57600080fd5b506060610390565b3480156109b257600080fd5b506103dd6109c13660046145ab565b611c98565b6103dd6109d4366004614d47565b611d30565b3480156109e557600080fd5b506106496109f4366004614430565b610232602052600090815260409020546001600160a01b031681565b348015610a1c57600080fd5b50604080518082019091526005815264322e372e3360d81b6020820152610390565b348015610a4a57600080fd5b506103dd610a59366004614dc2565b611d9c565b348015610a6a57600080fd5b50610323601081565b348015610a7f57600080fd5b50610a93610a8e366004614df0565b611da7565b60405161032d9190614e31565b348015610aac57600080fd5b506103dd610abb366004614e93565b611e9b565b348015610acc57600080fd5b50610ae0610adb366004614430565b611eb3565b60405161032d9190614ec0565b348015610af957600080fd5b50610323610b08366004614ef5565b6102336020526000908152604090205481565b348015610b2757600080fd5b50610323600281565b348015610b3c57600080fd5b506103dd610b4b366004614f12565b611fb2565b348015610b5c57600080fd5b506103dd610b6b366004614f74565b611fe0565b348015610b7c57600080fd5b50610323610b8b366004615002565b612057565b348015610b9c57600080fd5b506103dd610bab36600461504d565b6120cc565b348015610bbc57600080fd5b50610649610bcb366004614430565b61012d602052600090815260409020546001600160a01b031681565b348015610bf357600080fd5b506103dd610c02366004614430565b612243565b348015610c1357600080fd5b50610649610c22366004614430565b612273565b348015610c3357600080fd5b506103906122cd565b348015610c4857600080fd5b5061036b610c573660046150a8565b612362565b348015610c6857600080fd5b50610c71612390565b60405161032d91906150d6565b348015610c8a57600080fd5b506103dd610c9936600461512b565b612403565b348015610caa57600080fd5b50610323600481565b348015610cbf57600080fd5b506103dd610cce366004615184565b61249a565b60006001600160a01b038316610cfc57604051632188330d60e21b815260040160405180910390fd5b5060008181526097602090815260408083206001600160a01b03861684529091529020545b92915050565b600063152a902d60e11b6001600160e01b031983161480610d5857506001600160e01b031982166304aca5db60e51b145b80610d675750610d67826124f4565b80610d8257506001600160e01b0319821663ed78891360e01b145b80610d9d57506001600160e01b0319821663709e537f60e01b145b80610d2157506001600160e01b03198216631acf898160e11b1492915050565b60606101938054610dcd906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610df9906151ec565b8015610e465780601f10610e1b57610100808354040283529160200191610e46565b820191906000526020600020905b815481529060010190602001808311610e2957829003601f168201915b5050505050905090565b60008181526101c66020526040812080546060929190610e6f906151ec565b90501115610f165760008281526101c6602052604090208054610e91906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610ebd906151ec565b8015610f0a5780601f10610edf57610100808354040283529160200191610f0a565b820191906000526020600020905b815481529060010190602001808311610eed57829003601f168201915b50505050509050919050565b610d2182612544565b60006020610f2e3383836125c1565b610f3783612607565b505050565b6000610f483382612659565b610f55600083600261269c565b610f725760405163131dd3a760e31b815260040160405180910390fd5b610f7b826126c8565b5050565b600082815261023160205260409020546001600160a01b03163314610fb757604051632afb0ecf60e01b815260040160405180910390fd5b610f7b828261272b565b816010610fcf3383836125c1565b83610fd957600080fd5b83600080516020615f0183398151915284604051610ff7919061441d565b60405180910390a260008481526101c6602052604090206110188482615266565b5050505050565b600061102c84848461275a565b949350505050565b600080600061104285611eb3565b90507f000000000000000000000000000000000000000000000000000000000000000084826020015163ffffffff1661107b919061533b565b6110859190615352565b6040909101519590945092505050565b6001600160a01b03851633148015906110b557506110b38533612362565b155b156110d357604051633e2ea01560e21b815260040160405180910390fd5b611018858585858561276a565b6110e861292a565b61112b8787878787808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508992508891506129839050565b6111356001606555565b50505050505050565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361118757604051631932df4560e01b815260040160405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166111b9612ae1565b6001600160a01b0316146111e0576040516364cd8d1960e01b815260040160405180910390fd5b6111e981612afd565b6040805160008082526020820190925261120591839190612ba8565b50565b600060206112173383836125c1565b6101ca544790611234906001600160a01b0316826204baf0612c8c565b610f37576101ca5460405163292264c360e21b8152611261916001600160a01b0316908390600401614648565b60405180910390fd5b6000610d216602c2ad68fd90008361533b565b815181516060919081146112a45760405163133933f760e21b815260040160405180910390fd5b806001600160401b038111156112bc576112bc614496565b6040519080825280602002602001820160405280156112e5578160200160208202803683370190505b50915060005b818110156113545761132f85828151811061130857611308615374565b602002602001015185838151811061132257611322615374565b6020026020010151610cd3565b83828151811061134157611341615374565b60209081029190910101526001016112eb565b505092915050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036113a557604051631932df4560e01b815260040160405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166113d7612ae1565b6001600160a01b0316146113fe576040516364cd8d1960e01b815260040160405180910390fd5b61140782612afd565b610f7b82826001612ba8565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461145e57604051635e4c25f160e01b815260040160405180910390fd5b50600080516020615f218339815191525b90565b61147a61432a565b6040518060a001604052806000815260200165c9e86723e0008461149e919061533b565b81526020016114b365c9e86723e0008561533b565b81526020016114c86564f43391f0008561533b565b81526020016114dd65c9e86723e0008561533b565b905292915050565b60006114ef612ae1565b905090565b826114ff3382612659565b61150a848484612cec565b8315801561152657506101c9546001600160a01b038481169116145b801561153c575061153a600084600261269c565b155b1561154b5761154b60006126c8565b50505050565b60008061155d83611eb3565b6040015190506001600160a01b038116156115785792915050565b6101ca546001600160a01b03161561159e5750506101ca546001600160a01b0316919050565b503092915050565b6115ae61292a565b8160106115bc3383836125c1565b6115c68484612d39565b8360000361160a577f56e810c8cae84731149f628981d25769a084570b9ba6eebf3c32879e3dce5609836040516115fd9190614a0c565b60405180910390a161163b565b83600080516020615f0183398151915260405161163290602080825260009082015260400190565b60405180910390a25b5050610f7b6001606555565b60008060046116573383836125c1565b61165f61292a565b60006116a688888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a925033915060029050612e38565b90506116b2818661272b565b92506116be6001606555565b5050949350505050565b6001600160a01b03851633148015906116e857506116e68533612362565b155b1561170a5733856040516341ce11f960e11b815260040161126192919061538a565b6110188585858080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808902828101820190935288825290935088925087918291850190849080828437600092019190915250612ecd92505050565b600061178261292a565b600080600073__$76e65f60d292189c5f1c0695fc5f5098a1$__63784a80788b8b8b8b306101c8548c6040518863ffffffff1660e01b81526004016117cd97969594939291906153cd565b600060405180830381865af41580156117ea573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261181291908101906155b9565b60208084015163ffffffff166000908152610233909152604090205492955090935091501561186057505060209081015163ffffffff166000908152610233909152604090205490506118c9565b7f06c5a80e592816bd4f60093568e69affa68b5e378a189b2f59a1121703de47de826000015183602001518460400151856060015186608001516040516118ab9594939291906156c5565b60405180910390a16118c3838360600151838961305a565b93505050505b6118d36001606555565b9695505050505050565b6118e561432a565b6040518060a0016040528066012edc9ab5d00084611903919061533b565b81526020016119186564f43391f0008561533b565b815260200161192d6564f43391f0008561533b565b81526020016119426564f43391f0008561533b565b81526020016114dd6564f43391f0008561533b565b60006119633382612659565b6001600160a01b03821615611a03576040516301ffc9a760e01b81526001600160a01b038316906301ffc9a7906119a49062123aaf60e51b9060040161571f565b602060405180830381865afa1580156119c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e59190615734565b611a03578160405162be74ab60e51b81526004016112619190614a0c565b6101cb80546001600160a01b0319166001600160a01b03841617905560025b336001600160a01b0316600080516020615ec18339815191526101c9604051611a4b9190615767565b60405180910390a35050565b611a5f61292a565b600054610100900460ff1615801580611a7c575060005460ff1615155b8015611a9d5750611a8c306124e5565b80611a9d575060005460ff16600114155b15611abb57604051633d5c224160e11b815260040160405180910390fd5b6000805460ff191660011790558015611ade576000805461ff0019166101001790555b611ae66130f1565b611aee61311a565b611af9848787613149565b611b02846126c8565b611b0b84612607565b611b148761316d565b8115611b3f57611b27600033600261317a565b611b318383611da7565b50611b3f6000336002612cec565b8015611b85576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50611b906001606555565b505050505050565b611bbc60405180606001604052806060815260200160008152602001600081525090565b60008281526101c6602052604090819020815160608101909252805482908290611be5906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054611c11906151ec565b8015611c5e5780601f10611c3357610100808354040283529160200191611c5e565b820191906000526020600020905b815481529060010190602001808311611c4157829003601f168201915b50505050508152602001600182015481526020016002820154815250509050919050565b82611c8d3382612659565b61154b84848461317a565b816010611ca63383836125c1565b600080611cb286612273565b6001600160a01b031685604051611cc991906157b2565b6000604051808303816000865af19150503d8060008114611d06576040519150601f19603f3d011682016040523d82523d6000602084013e611d0b565b606091505b509150915081611b90578060405163a5fa8d2b60e01b8152600401611261919061441d565b611d3861292a565b604080516001808252818301909252600091602080830190803683370190505090508181600081518110611d6e57611d6e615374565b60200260200101906001600160a01b031690816001600160a01b031681525050611b85878787848888612983565b610f7b3383836131c6565b6060816001600160401b03811115611dc157611dc1614496565b604051908082528060200260200182016040528015611df457816020015b6060815260200190600190039081611ddf5790505b50905060005b82811015611e9457611e6430858584818110611e1857611e18615374565b9050602002810190611e2a91906157ce565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061326592505050565b828281518110611e7657611e76615374565b60200260200101819052508080611e8c90615814565b915050611dfa565b5092915050565b816020611ea93383836125c1565b61154b8484613291565b604080516060810182526000808252602082018190529181019190915260008281526101606020526040902054600160401b90046001600160a01b031615611f475750600090815261016060209081526040918290208251606081018452905463ffffffff8082168352600160201b82041692820192909252600160401b9091046001600160a01b03169181019190915290565b5050600080526101606020908152604080516060810182527fe202c269d77798732efec7617aed439009af6a5bc60648e5771bc32ef6e071df5463ffffffff8082168352600160201b82041693820193909352600160401b9092046001600160a01b03169082015290565b611fba61292a565b826004611fc83383836125c1565b611fd48686868661337f565b505061154b6001606555565b611fe861292a565b6000611ff7336000600461275a565b905060005b845181101561203f578161202f5761202f3386838151811061202057612020615374565b602002602001015160046125c1565b61203881615814565b9050611ffc565b5061204c858585856133bd565b5061154b6001606555565b60008060046120673383836125c1565b61206f61292a565b60006120b687878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525089925033915060029050612e38565b9350506120c36001606555565b50509392505050565b8360086120da3383836125c1565b6120e6858760046125c1565b6040516301ffc9a760e01b81526001600160a01b038616906301ffc9a79061211990636890e5b360e01b9060040161571f565b602060405180830381865afa158015612136573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061215a9190615734565b61217957846040516370adc70360e11b81526004016112619190614a0c565b600061218960246004868861582d565b61219291615857565b90508681146121b45760405163fe486c2b60e01b815260040160405180910390fd5b600080876001600160a01b031687876040516121d1929190615875565b6000604051808303816000865af19150503d806000811461220e576040519150601f19603f3d011682016040523d82523d6000602084013e612213565b606091505b509150915081612238578060405163a5fa8d2b60e01b8152600401611261919061441d565b505050505050505050565b8060016101c8540314611205578060016101c85403604051634fa09b3f60e01b8152600401611261929190615885565b600081815261012d60205260409020546001600160a01b0316806122c857506000805261012d6020527fa581b17bfc4d6578e300cafbf34fd2dc1fef0270d8c73f88a99dcde2859a6639546001600160a01b03165b919050565b606060006122db6000612273565b90506001600160a01b0381161561235857806001600160a01b031663e8a3d4856040518163ffffffff1660e01b8152600401600060405180830381865afa15801561232a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526123529190810190615893565b91505090565b6123526000610e50565b6001600160a01b03918216600090815260986020908152604080832093909416825291909152205460ff1690565b606073__$76e65f60d292189c5f1c0695fc5f5098a1$__63ed7889136040518163ffffffff1660e01b8152600401600060405180830381865af41580156123db573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114ef91908101906158c7565b600060106124123383836125c1565b600080526101c66020527f8fb2e61fbe82269b67a8079678544013e6501c776e6e6ec937885147d8d1261c6124478582615266565b506124518361316d565b336001600160a01b03167f74b7c2afa3f89c562b59674a101e2c48bceeb27cdb620afefa14446f1ffa487b858560405161248c929190615982565b60405180910390a250505050565b6001600160a01b03851633148015906124ba57506124b88533612362565b155b156124d857604051633e2ea01560e21b815260040160405180910390fd5b6110188585858585613482565b6001600160a01b03163b151590565b60006001600160e01b03198216636cdb3d1360e11b148061252557506001600160e01b031982166303a24d0760e21b145b80610d2157506301ffc9a760e01b6001600160e01b0319831614610d21565b606061254f82612273565b6001600160a01b0316630e89341c836040518263ffffffff1660e01b815260040161257c91815260200190565b600060405180830381865afa158015612599573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d219190810190615893565b6125cf82848360021761269c565b806125e457506125e46000848360021761269c565b610f3757828282604051634baa2a4d60e01b8152600401611261939291906159a7565b6101ca80546001600160a01b0319166001600160a01b0383161790556001336001600160a01b0316600080516020615ec18339815191526101c960405161264e9190615767565b60405180910390a350565b6126658183600261269c565b806126785750612678600083600261269c565b610f7b5781816002604051634baa2a4d60e01b8152600401611261939291906159a7565b60009283526101fe602090815260408085206001600160a01b0394909416855292905291205416151590565b6101c980546001600160a01b038381166001600160a01b03198316179092556040519116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09061271c908390859061538a565b60405180910390a16000611a22565b6000918252610231602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b600061102c83858460021761269c565b82518251811461278d5760405163133933f760e21b815260040160405180910390fd5b6001600160a01b0385166127b457604051631c53f61160e21b815260040160405180910390fd5b336127c3818888888888613595565b6000806000805b858110156128ca578881815181106127e4576127e4615374565b6020026020010151935087818151811061280057612800615374565b602002602001015192506097600085815260200190815260200160002060008c6001600160a01b03166001600160a01b031681526020019081526020016000205491508282101561286457604051636eaa1ea960e11b815260040160405180910390fd5b60008481526097602090815260408083206001600160a01b038e168452909152812080548592906128969084906159c8565b909155505060008481526097602090815260408083206001600160a01b038f168452909152902083830390556001016127ca565b50886001600160a01b03168a6001600160a01b0316856001600160a01b0316600080516020615e818339815191528b8b6040516129089291906159db565b60405180910390a461291e848b8b8b8b8b613612565b50505050505050505050565b60026065540361297c5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401611261565b6002606555565b61298f868660046125c1565b8251600090156129b757836000815181106129ac576129ac615374565b602002602001015190505b60006129f834876129c78a611551565b60008b81526102316020908152604080832054610232909252909120546001600160a01b0391821691889116613729565b9050612a82886001600160a01b0316636890e5b3338a8a868a8a6040518763ffffffff1660e01b8152600401612a3396959493929190615a00565b6000604051808303816000875af1158015612a52573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052612a7a9190810190615a34565b51828961379f565b86886001600160a01b0316336001600160a01b03167fb362243af1e2070d7d5bf8d713f2e0fab64203f1b71462afbe20572909788c5e8934604051612ac8929190615885565b60405180910390a45050505050505050565b6001606555565b600080516020615f21833981519152546001600160a01b031690565b6000612b093382612659565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166321f74347612b40612ae1565b846040518363ffffffff1660e01b8152600401612b5e92919061538a565b602060405180830381865afa158015612b7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b9f9190615734565b610f7b57600080fd5b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612bdb57610f3783613925565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612c35575060408051601f3d908101601f19168201909252612c3291810190615b72565b60015b612c525760405163e5ec176960e01b815260040160405180910390fd5b600080516020615f218339815191528114612c80576040516308373ebf60e41b815260040160405180910390fd5b50610f3783838361397a565b6000836001600160a01b0316838390604051600060405180830381858888f193505050503d8060008114612cdc576040519150601f19603f3d011682016040523d82523d6000602084013e612ce1565b606091505b509095945050505050565b60008381526101fe602090815260408083206001600160a01b0386168085529252808320805485191690819055905190928392918791600080516020615ee183398151915291a450505050565b600082815261012d6020526040902080546001600160a01b0319166001600160a01b03831690811790915515612dfc576040516301ffc9a760e01b81526001600160a01b038216906301ffc9a790612d9c90633de3f32360e11b9060040161571f565b602060405180830381865afa158015612db9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ddd9190615734565b612dfc578060405163da755beb60e01b81526004016112619190614a0c565b60405133906001600160a01b0383169084907f5010f780a0de79bcfb9f3d6fec3cfe29758ef5c5800d575af709bc590bd78ade90600090a45050565b600080612e45868661399f565b9050612e5281858561317a565b855115612e805780600080516020615f0183398151915287604051612e77919061441d565b60405180910390a25b836001600160a01b0316817f1b944478023872bf91b25a13fdba3a686fdb1bf4dbb872f850240fad4b8cc0688888604051612ebc929190615b8b565b60405180910390a395945050505050565b6001600160a01b038316612ef4576040516345d40ad560e01b815260040160405180910390fd5b815181518114612f175760405163f9532c3960e01b815260040160405180910390fd5b6000339050612f3a81866000878760405180602001604052806000815250613595565b6000806000805b85811015612ffa57878181518110612f5b57612f5b615374565b60200260200101519350868181518110612f7757612f77615374565b60209081029190910181015160008681526097835260408082206001600160a01b038e1683529093529190912054909350915082821015612fcb57604051632fc4b76160e11b815260040160405180910390fd5b60008481526097602090815260408083206001600160a01b038d16845290915290208383039055600101612f41565b5060006001600160a01b0316886001600160a01b0316856001600160a01b0316600080516020615e818339815191528a8a6040516130399291906159db565b60405180910390a46040805160208101909152600090525050505050505050565b600061306984600060046125c1565b61307e85604001518660600151336002612e38565b905061308e81866080015161272b565b60208581015163ffffffff166000908152610233825260408082208490558382526102329092522080546001600160a01b0319166001600160a01b0384161790556130d883613a4b565b506130e581336002612cec565b61102c8185600261317a565b600054610100900460ff16613118576040516296bfb160e81b815260040160405180910390fd5b565b600054610100900460ff16613141576040516296bfb160e81b815260040160405180910390fd5b613118613b01565b613156600084600261317a565b61316182600061399f565b50610f37600082613291565b610193610f7b8282615266565b60008381526101fe602090815260408083206001600160a01b03861680855292528083208054851790819055905190928392918791600080516020615ee183398151915291a450505050565b816001600160a01b0316836001600160a01b0316036131f857604051636b3fa0d960e11b815260040160405180910390fd5b6001600160a01b03838116600081815260986020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b606061328a8383604051806060016040528060278152602001615f4160279139613b28565b9392505050565b805163ffffffff16156132a357600081525b60408101516001600160a01b03161580156132c857506000816020015163ffffffff16115b156132e657604051630d9b92f160e01b815260040160405180910390fd5b600082815261016060209081526040918290208351815492850151848601516001600160a01b0316600160401b02600160401b600160e01b031963ffffffff928316600160201b026001600160401b03199096169290931691909117939093171691909117905551339083907f5837d55897cfc337f160a71d7b63a047abd50a3a8834f1c5d70f338846358c6d90611a4b908590614ec0565b6133898383613b96565b60008381526101c66020526040812060020180548492906133ab9084906159c8565b9091555061154b905084848484613bfa565b825160005b81811015613475576134068582815181106133df576133df615374565b60200260200101518583815181106133f9576133f9615374565b6020026020010151613b96565b83818151811061341857613418615374565b60200260200101516101c6600087848151811061343757613437615374565b60200260200101518152602001908152602001600020600201600082825461345f91906159c8565b9091555061346e905081615814565b90506133c2565b5061101885858585613cbf565b6001600160a01b0384166134a957604051631c53f61160e21b815260040160405180910390fd5b336134b8818787878787613dff565b60008481526097602090815260408083206001600160a01b038a168452909152902054838110156134fc57604051636eaa1ea960e11b815260040160405180910390fd5b60008581526097602090815260408083206001600160a01b038b811685529252808320878503905590881682528120805486929061353b9084906159c8565b92505081905550856001600160a01b0316876001600160a01b0316836001600160a01b0316600080516020615ea1833981519152888860405161357f929190615885565b60405180910390a4611135828888888888613e4e565b6101cb546001600160a01b031615611b90576101cb54604051634058856760e11b81526001600160a01b03909116906380b10ace906135e49030908a908a908a908a908a908a90600401615bad565b600060405180830381600087803b1580156135fe57600080fd5b505af115801561291e573d6000803e3d6000fd5b613624846001600160a01b03166124e5565b15611b905760405163bc197c8160e01b81526001600160a01b0385169063bc197c819061365d9089908990889088908890600401615c1d565b6020604051808303816000875af1925050508015613698575060408051601f3d908101601f1916820190925261369591810190615c6f565b60015b6136f8576136a4615c8c565b806308c379a0036136dd57506136b8615ca7565b806136c357506136df565b8060405162461bcd60e51b8152600401611261919061441d565b505b6040516377d5b49160e11b815260040160405180910390fd5b6001600160e01b0319811663bc197c8160e01b1461113557604051633fbfe7f560e21b815260040160405180910390fd5b6000806137358761126a565b90506001600160a01b038316613749578592505b8088101561376a57604051633b78763760e21b815260040160405180910390fd5b8088036137895761377f818888888888613f11565b60009150506118d3565b613796818887878761404c565b870390506118d3565b60005b835181101561154b5760008482815181106137bf576137bf615374565b602090810291909101015151905060018160028111156137e1576137e1615751565b03613871576000808684815181106137fb576137fb615374565b60200260200101516020015180602001905181019061381a9190615d25565b915091508086111561383f57604051631913cf3760e21b815260040160405180910390fd5b61384d82826204baf0612c8c565b61386a576040516338dcead760e21b815260040160405180910390fd5b5050613914565b600281600281111561388557613885615751565b036139145760008060008785815181106138a1576138a1615374565b6020026020010151602001518060200190518101906138c09190615d53565b925092509250856000141580156138d75750858214155b156138f557604051634cdcfbf960e01b815260040160405180910390fd5b6139108387836040518060200160405280600081525061337f565b5050505b5061391e81615814565b90506137a2565b61392e816124e5565b61394b5760405163529880eb60e01b815260040160405180910390fd5b600080516020615f2183398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61398383614187565b6000825111806139905750805b15610f375761154b83836141c7565b60006139b36101c880546001810190915590565b60408051606081018252858152602080820186905260008284018190528481526101c6909152919091208151929350909182919081906139f39082615266565b506020820151600182015560409182015160029091015551829033907f5086d1bcea28999da9875111e3592688fbfa821db63214c695ca35768080c2fe90613a3c908590614d0b565b60405180910390a35092915050565b606081516001600160401b03811115613a6657613a66614496565b604051908082528060200260200182016040528015613a9957816020015b6060815260200190600190039081613a845790505b50905060005b8251811015613afb57613acb30848381518110613abe57613abe615374565b6020026020010151613265565b828281518110613add57613add615374565b60200260200101819052508080613af390615814565b915050613a9f565b50919050565b600054610100900460ff16612ada576040516296bfb160e81b815260040160405180910390fd5b6060600080856001600160a01b031685604051613b4591906157b2565b600060405180830381855af49150503d8060008114613b80576040519150601f19603f3d011682016040523d82523d6000602084013e613b85565b606091505b50915091506118d386838387614262565b60008281526101c66020526040902060018101546002820154613bba9084906159c8565b1115610f375760028101546001820154604051631255c8fd60e01b8152600481018690526024810185905260448101929092526064820152608401611261565b6001600160a01b038416613c21576040516310227bb960e31b815260040160405180910390fd5b33613c3181600087878787613dff565b60008481526097602090815260408083206001600160a01b038916845290915281208054859290613c639084906159c8565b92505081905550846001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020615ea18339815191528787604051613ca8929190615885565b60405180910390a461101881600087878787613e4e565b6001600160a01b038416613ce6576040516310227bb960e31b815260040160405180910390fd5b825182518114613d095760405163f9532c3960e01b815260040160405180910390fd5b33613d1981600088888888613595565b60005b82811015613da957848181518110613d3657613d36615374565b602002602001015160976000888481518110613d5457613d54615374565b602002602001015181526020019081526020016000206000896001600160a01b03166001600160a01b031681526020019081526020016000206000828254613d9c91906159c8565b9091555050600101613d1c565b50856001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020615e818339815191528888604051613de89291906159db565b60405180910390a4611b9081600088888888613612565b6101cb546001600160a01b031615611b90576101cb5460405163417b2f9760e11b81526001600160a01b03909116906382f65f2e906135e49030908a908a908a908a908a908a90600401615d8a565b613e60846001600160a01b03166124e5565b15611b905760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190613e999089908990889088908890600401615de1565b6020604051808303816000875af1925050508015613ed4575060408051601f3d908101601f19168201909252613ed191810190615c6f565b60015b613ee0576136a4615c8c565b6001600160e01b0319811663f23a6e6160e01b1461113557604051633fbfe7f560e21b815260040160405180910390fd5b6000613f1c866118dd565b90506001600160a01b038416613f50577f000000000000000000000000000000000000000000000000000000000000000093505b6001600160a01b038316613f82577f000000000000000000000000000000000000000000000000000000000000000092505b8051602082015160408084015160608501516080860151925163faa3516f60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169563faa3516f958e95614011958e9593948e948e938e927f00000000000000000000000000000000000000000000000000000000000000009190600401615e26565b6000604051808303818588803b15801561402a57600080fd5b505af115801561403e573d6000803e3d6000fd5b505050505050505050505050565b600061405785611472565b90506001600160a01b03841661408b577f000000000000000000000000000000000000000000000000000000000000000093505b6001600160a01b0383166140bd577f000000000000000000000000000000000000000000000000000000000000000092505b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663faa3516f876000808886602001518988604001518a8a606001517f00000000000000000000000000000000000000000000000000000000000000008c608001516040518c63ffffffff1660e01b815260040161414d9a99989796959493929190615e26565b6000604051808303818588803b15801561416657600080fd5b505af115801561417a573d6000803e3d6000fd5b5050505050505050505050565b61419081613925565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606141d2836124e5565b6141ef5760405163369891e760e01b815260040160405180910390fd5b600080846001600160a01b03168460405161420a91906157b2565b600060405180830381855af49150503d8060008114614245576040519150601f19603f3d011682016040523d82523d6000602084013e61424a565b606091505b509150915061425982826142d9565b95945050505050565b606083156142cf5782516000036142c85761427c856124e5565b6142c85760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401611261565b508161102c565b61102c83836142f1565b606082156142e8575080610d21565b610d2182614301565b8151156136c35781518083602001fd5b8051156143115780518082602001fd5b6040516350a28c9b60e11b815260040160405180910390fd5b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b6001600160a01b038116811461120557600080fd5b6000806040838503121561438157600080fd5b823561438c81614359565b946020939093013593505050565b6001600160e01b03198116811461120557600080fd5b6000602082840312156143c257600080fd5b813561328a8161439a565b60005b838110156143e85781810151838201526020016143d0565b50506000910152565b600081518084526144098160208601602086016143cd565b601f01601f19169290920160200192915050565b60208152600061328a60208301846143f1565b60006020828403121561444257600080fd5b5035919050565b60006020828403121561445b57600080fd5b813561328a81614359565b6000806040838503121561447957600080fd5b82359150602083013561448b81614359565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60a081016001600160401b03811182821017156144cb576144cb614496565b60405250565b604081016001600160401b03811182821017156144cb576144cb614496565b601f8201601f191681016001600160401b038111828210171561451557614515614496565b6040525050565b60405161146f816144ac565b60006001600160401b0382111561454157614541614496565b50601f01601f191660200190565b600082601f83011261456057600080fd5b813561456b81614528565b60405161457882826144f0565b82815285602084870101111561458d57600080fd5b82602086016020830137600092810160200192909252509392505050565b600080604083850312156145be57600080fd5b8235915060208301356001600160401b038111156145db57600080fd5b6145e78582860161454f565b9150509250929050565b60008060006060848603121561460657600080fd5b833561461181614359565b95602085013595506040909401359392505050565b6000806040838503121561463957600080fd5b50508035926020909101359150565b6001600160a01b03929092168252602082015260400190565b60006001600160401b0382111561467a5761467a614496565b5060051b60200190565b600082601f83011261469557600080fd5b813560206146a282614661565b6040516146af82826144f0565b83815260059390931b85018201928281019150868411156146cf57600080fd5b8286015b848110156146ea57803583529183019183016146d3565b509695505050505050565b600080600080600060a0868803121561470d57600080fd5b853561471881614359565b9450602086013561472881614359565b935060408601356001600160401b038082111561474457600080fd5b61475089838a01614684565b9450606088013591508082111561476657600080fd5b61477289838a01614684565b9350608088013591508082111561478857600080fd5b506147958882890161454f565b9150509295509295909350565b60008083601f8401126147b457600080fd5b5081356001600160401b038111156147cb57600080fd5b6020830191508360208260051b85010111156147e657600080fd5b9250929050565b60008083601f8401126147ff57600080fd5b5081356001600160401b0381111561481657600080fd5b6020830191508360208285010111156147e657600080fd5b600080600080600080600060a0888a03121561484957600080fd5b873561485481614359565b9650602088013595506040880135945060608801356001600160401b038082111561487e57600080fd5b61488a8b838c016147a2565b909650945060808a01359150808211156148a357600080fd5b506148b08a828b016147ed565b989b979a50959850939692959293505050565b600080604083850312156148d657600080fd5b82356001600160401b03808211156148ed57600080fd5b818501915085601f83011261490157600080fd5b8135602061490e82614661565b60405161491b82826144f0565b83815260059390931b850182019282810191508984111561493b57600080fd5b948201945b8386101561496257853561495381614359565b82529482019490820190614940565b9650508601359250508082111561497857600080fd5b506145e785828601614684565b600081518084526020808501945080840160005b838110156149b557815187529582019590820190600101614999565b509495945050505050565b60208152600061328a6020830184614985565b600080604083850312156149e657600080fd5b82356149f181614359565b915060208301356001600160401b038111156145db57600080fd5b6001600160a01b0391909116815260200190565b600080600060608486031215614a3557600080fd5b833592506020840135614a4781614359565b929592945050506040919091013590565b60008060008060608587031215614a6e57600080fd5b84356001600160401b03811115614a8457600080fd5b614a90878288016147ed565b909550935050602085013591506040850135614aab81614359565b939692955090935050565b600080600080600060608688031215614ace57600080fd5b8535614ad981614359565b945060208601356001600160401b0380821115614af557600080fd5b614b0189838a016147a2565b90965094506040880135915080821115614b1a57600080fd5b50614b27888289016147a2565b969995985093965092949392505050565b60008060008060008060a08789031215614b5157600080fd5b86356001600160401b0380821115614b6857600080fd5b614b748a838b0161454f565b9750602089013596506040890135915080821115614b9157600080fd5b50614b9e89828a016147ed565b9095509350506060870135614bb281614359565b91506080870135614bc281614359565b809150509295509295509295565b63ffffffff8116811461120557600080fd5b600060608284031215614bf457600080fd5b604051606081016001600160401b0381118282101715614c1657614c16614496565b6040529050808235614c2781614bd0565b81526020830135614c3781614bd0565b60208201526040830135614c4a81614359565b6040919091015292915050565b60008060008060008060e08789031215614c7057600080fd5b86356001600160401b0380821115614c8757600080fd5b614c938a838b0161454f565b97506020890135915080821115614ca957600080fd5b614cb58a838b0161454f565b9650614cc48a60408b01614be2565b955060a08901359150614cd682614359565b90935060c08801359080821115614cec57600080fd5b50614cf989828a016147a2565b979a9699509497509295939492505050565b602081526000825160606020840152614d2760808401826143f1565b905060208401516040840152604084015160608401528091505092915050565b60008060008060008060a08789031215614d6057600080fd5b8635614d6b81614359565b9550602087013594506040870135935060608701356001600160401b03811115614d9457600080fd5b614da089828a016147ed565b9094509250506080870135614bc281614359565b801515811461120557600080fd5b60008060408385031215614dd557600080fd5b8235614de081614359565b9150602083013561448b81614db4565b60008060208385031215614e0357600080fd5b82356001600160401b03811115614e1957600080fd5b614e25858286016147a2565b90969095509350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015614e8657603f19888603018452614e748583516143f1565b94509285019290850190600101614e58565b5092979650505050505050565b60008060808385031215614ea657600080fd5b82359150614eb78460208501614be2565b90509250929050565b815163ffffffff9081168252602080840151909116908201526040918201516001600160a01b03169181019190915260600190565b600060208284031215614f0757600080fd5b813561328a81614bd0565b60008060008060808587031215614f2857600080fd5b8435614f3381614359565b9350602085013592506040850135915060608501356001600160401b03811115614f5c57600080fd5b614f688782880161454f565b91505092959194509250565b60008060008060808587031215614f8a57600080fd5b8435614f9581614359565b935060208501356001600160401b0380821115614fb157600080fd5b614fbd88838901614684565b94506040870135915080821115614fd357600080fd5b614fdf88838901614684565b93506060870135915080821115614ff557600080fd5b50614f688782880161454f565b60008060006040848603121561501757600080fd5b83356001600160401b0381111561502d57600080fd5b615039868287016147ed565b909790965060209590950135949350505050565b6000806000806060858703121561506357600080fd5b84359350602085013561507581614359565b925060408501356001600160401b0381111561509057600080fd5b61509c878288016147ed565b95989497509550505050565b600080604083850312156150bb57600080fd5b82356150c681614359565b9150602083013561448b81614359565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015614e8657603f198886030184526151198583516143f1565b945092850192908501906001016150fd565b6000806040838503121561513e57600080fd5b82356001600160401b038082111561515557600080fd5b6151618683870161454f565b9350602085013591508082111561517757600080fd5b506145e78582860161454f565b600080600080600060a0868803121561519c57600080fd5b85356151a781614359565b945060208601356151b781614359565b9350604086013592506060860135915060808601356001600160401b038111156151e057600080fd5b6147958882890161454f565b600181811c9082168061520057607f821691505b602082108103613afb57634e487b7160e01b600052602260045260246000fd5b601f821115610f3757600081815260208120601f850160051c810160208610156152475750805b601f850160051c820191505b81811015611b9057828155600101615253565b81516001600160401b0381111561527f5761527f614496565b6152938161528d84546151ec565b84615220565b602080601f8311600181146152c857600084156152b05750858301515b600019600386901b1c1916600185901b178555611b90565b600085815260208120601f198616915b828110156152f7578886015182559484019460019091019084016152d8565b50858210156153155787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610d2157610d21615325565b60008261536f57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0392831681529116602082015260400190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60c0815260006153e060c083018a6143f1565b88602084015282810360408401526153f981888a6153a4565b6001600160a01b03968716606085015260808401959095525050921660a090920191909152949350505050565b600082601f83011261543757600080fd5b815161544281614528565b60405161544f82826144f0565b82815285602084870101111561546457600080fd5b6142598360208301602088016143cd565b80516122c881614359565b600060a0828403121561549257600080fd5b61549a61451c565b8251815260208301519091506001600160401b03808211156154bb57600080fd5b6154c785838601615426565b602084015260408401519150808211156154e057600080fd5b6154ec85838601615426565b60408401526154fd60608501615475565b6060840152608084015191508082111561551657600080fd5b5061552384828501615426565b60808301525092915050565b600082601f83011261554057600080fd5b8151602061554d82614661565b60405161555a82826144f0565b83815260059390931b850182019282810191508684111561557a57600080fd5b8286015b848110156146ea5780516001600160401b0381111561559d5760008081fd5b6155ab8986838b0101615426565b84525091830191830161557e565b6000806000606084860312156155ce57600080fd5b83516001600160401b03808211156155e557600080fd5b9085019060a082880312156155f957600080fd5b604051615605816144ac565b82518281111561561457600080fd5b61562089828601615480565b825250602083015161563181614bd0565b602082015260408301518281111561564857600080fd5b61565489828601615426565b6040830152506060830151606082015261567060808401615475565b6080820152602087015190955091508082111561568c57600080fd5b61569887838801615480565b935060408601519150808211156156ae57600080fd5b506156bb8682870161552f565b9150509250925092565b85815260a0602082015260006156de60a08301876143f1565b82810360408401526156f081876143f1565b6001600160a01b03861660608501528381036080850152905061571381856143f1565b98975050505050505050565b6001600160e01b031991909116815260200190565b60006020828403121561574657600080fd5b815161328a81614db4565b634e487b7160e01b600052602160045260246000fd5b81546001600160a01b03808216835260a091821c602084015260018401548082166040850152821c6060840152600290930154928316608083015291821c9181019190915260c00190565b600082516157c48184602087016143cd565b9190910192915050565b6000808335601e198436030181126157e557600080fd5b8301803591506001600160401b038211156157ff57600080fd5b6020019150368190038213156147e657600080fd5b60006001820161582657615826615325565b5060010190565b6000808585111561583d57600080fd5b8386111561584a57600080fd5b5050820193919092039150565b80356020831015610d2157600019602084900360031b1b1692915050565b8183823760009101908152919050565b918252602082015260400190565b6000602082840312156158a557600080fd5b81516001600160401b038111156158bb57600080fd5b61102c84828501615426565b600060208083850312156158da57600080fd5b82516001600160401b03808211156158f157600080fd5b818501915085601f83011261590557600080fd5b815161591081614661565b60405161591d82826144f0565b82815260059290921b840185019185810191508883111561593d57600080fd5b8585015b83811015615975578051858111156159595760008081fd5b6159678b89838a0101615426565b845250918601918601615941565b5098975050505050505050565b60408152600061599560408301856143f1565b828103602084015261425981856143f1565b6001600160a01b039390931683526020830191909152604082015260600190565b80820180821115610d2157610d21615325565b6040815260006159ee6040830185614985565b82810360208401526142598185614985565b60018060a01b038716815285602082015284604082015283606082015260a06080820152600061571360a0830184866153a4565b60006020808385031215615a4757600080fd5b82516001600160401b0380821115615a5e57600080fd5b9084019060408287031215615a7257600080fd5b604051615a7e816144d1565b825182811115615a8d57600080fd5b8301601f81018813615a9e57600080fd5b8051615aa981614661565b604051615ab682826144f0565b82815260059290921b830187019187810191508a831115615ad657600080fd5b8784015b83811015615b5957805187811115615af157600080fd5b85016040818e03601f19011215615b0757600080fd5b604051615b13816144d1565b8a82015160038110615b2457600080fd5b8152604082015189811115615b3857600080fd5b615b468f8d83860101615426565b828d015250845250918801918801615ada565b5084525050509183015192820192909252949350505050565b600060208284031215615b8457600080fd5b5051919050565b604081526000615b9e60408301856143f1565b90508260208301529392505050565b6001600160a01b038881168252878116602083015286811660408301528516606082015260e060808201819052600090615be990830186614985565b82810360a0840152615bfb8186614985565b905082810360c0840152615c0f81856143f1565b9a9950505050505050505050565b6001600160a01b0386811682528516602082015260a060408201819052600090615c4990830186614985565b8281036060840152615c5b8186614985565b9050828103608084015261571381856143f1565b600060208284031215615c8157600080fd5b815161328a8161439a565b600060033d111561146f5760046000803e5060005160e01c90565b600060443d1015615cb55790565b6040516003193d81016004833e81513d6001600160401b038083116024840183101715615ce457505050505090565b8285019150815181811115615cfc5750505050505090565b843d8701016020828501011115615d165750505050505090565b612ce1602082860101876144f0565b60008060408385031215615d3857600080fd5b8251615d4381614359565b6020939093015192949293505050565b600080600060608486031215615d6857600080fd5b8351615d7381614359565b602085015160409095015190969495509392505050565b6001600160a01b03888116825287811660208301528681166040830152851660608201526080810184905260a0810183905260e060c08201819052600090615dd4908301846143f1565b9998505050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090615e1b908301846143f1565b979650505050505050565b6001600160a01b039a8b168152602081019990995296891660408901526060880195909552928716608087015260a0860191909152851660c085015260e0840152909216610100820152610120810191909152610140019056fe4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fbc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f623be6d3a1d957610f7e900c66889b874cdc9f0c22901aa8be6ec3d2d04c14ca0f35fb03d0d293ef5b362761900725ce891f8f766b5a662cdd445372355448e7ca6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220aebe57e57ceeb4b7b7f08b2153bdced781455886d4266c845264e1f272cb5c7b64736f6c63430008110033',
  deployedBytecode:
    '0x6080604052600436106102f75760003560e01c8062fdd58e14610303578063011442011461033657806301ffc9a71461034b57806306fdde031461037b5780630e89341c1461039d57806310a7eb5d146103bd57806313966db5146103df57806313af4035146103f957806317bd48bb1461041957806318711c7d1461043957806318e97fd11461044e57806323bd03861461046e5780632a55205a1461048e5780632eb2c2d6146104bc578063300ecdb9146104dc578063359f1302146105155780633659cfe6146105285780633ccfd60b146105485780634132239b1461055d5780634e1273f41461057d5780634f1ef286146105aa57806352d1902d146105bd5780635c046084146105d25780635c60da1b146106345780635d0f6cba146106565780635e4e0404146106765780636661a9ba14610696578063674cbae6146106b657806369a5b302146106d65780636b20c4541461070d578063709e537f1461072d578063722933f71461074d57806375794a3c1461076d57806379502c55146107845780637dafae4d1461081c5780637f2dc61c146108535780637f77f574146108735780638a08eb4c146108f15780638c7a63ae146109115780638da5cb5b1461093e5780638ec998a01461095d578063929a71281461097d57806395d89b41146109925780639c5c63c9146109a65780639dbb844d146109c65780639ebb8324146109d9578063a0a8e46014610a10578063a22cb46514610a3e578063a453eaf014610a5e578063ac9650d814610a73578063afed7e9e14610aa0578063bb3bafd614610ac0578063bdd864f214610aed578063c046435614610b1b578063c238d1ee14610b30578063d1ad846b14610b50578063d258609a14610b70578063d904b94a14610b90578063dd15e05f14610bb0578063e72878b414610be7578063e74d86c214610c07578063e8a3d48514610c27578063e985e9c514610c3c578063ed78891314610c5c578063ef71c82e14610c7e578063f1b0d6bb14610c9e578063f242432a14610cb357600080fd5b366102fe57005b600080fd5b34801561030f57600080fd5b5061032361031e36600461436e565b610cd3565b6040519081526020015b60405180910390f35b34801561034257600080fd5b50610323600081565b34801561035757600080fd5b5061036b6103663660046143b0565b610d27565b604051901515815260200161032d565b34801561038757600080fd5b50610390610dbd565b60405161032d919061441d565b3480156103a957600080fd5b506103906103b8366004614430565b610e50565b3480156103c957600080fd5b506103dd6103d8366004614449565b610f1f565b005b3480156103eb57600080fd5b506602c2ad68fd9000610323565b34801561040557600080fd5b506103dd610414366004614449565b610f3c565b34801561042557600080fd5b506103dd610434366004614466565b610f7f565b34801561044557600080fd5b50610323600881565b34801561045a57600080fd5b506103dd6104693660046145ab565b610fc1565b34801561047a57600080fd5b5061036b6104893660046145f1565b61101f565b34801561049a57600080fd5b506104ae6104a9366004614626565b611034565b60405161032d929190614648565b3480156104c857600080fd5b506103dd6104d73660046146f5565b611095565b3480156104e857600080fd5b506103236104f7366004614466565b6101fe60209081526000928352604080842090915290825290205481565b6103dd61052336600461482e565b6110e0565b34801561053457600080fd5b506103dd610543366004614449565b61113e565b34801561055457600080fd5b506103dd611208565b34801561056957600080fd5b50610323610578366004614430565b61126a565b34801561058957600080fd5b5061059d6105983660046148c3565b61127d565b60405161032d91906149c0565b6103dd6105b83660046149d3565b61135c565b3480156105c957600080fd5b50610323611413565b3480156105de57600080fd5b506105f26105ed366004614430565b611472565b60405161032d9190600060a082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015292915050565b34801561064057600080fd5b506106496114e5565b60405161032d9190614a0c565b34801561066257600080fd5b506103dd610671366004614a20565b6114f4565b34801561068257600080fd5b50610649610691366004614430565b611551565b3480156106a257600080fd5b506103dd6106b1366004614466565b6115a6565b3480156106c257600080fd5b506103236106d1366004614a58565b611647565b3480156106e257600080fd5b506106496106f1366004614430565b6101c7602052600090815260409020546001600160a01b031681565b34801561071957600080fd5b506103dd610728366004614ab6565b6116c8565b34801561073957600080fd5b50610323610748366004614b38565b611778565b34801561075957600080fd5b506105f2610768366004614430565b6118dd565b34801561077957600080fd5b506103236101c85481565b34801561079057600080fd5b506101c9546101ca546101cb546107d5926001600160a01b03808216936001600160601b03600160a01b93849004811694828416949283900482169381169290041686565b604080516001600160a01b0397881681526001600160601b0396871660208201529487169085015291841660608401529093166080820152911660a082015260c00161032d565b34801561082857600080fd5b50610649610837366004614430565b610231602052600090815260409020546001600160a01b031681565b34801561085f57600080fd5b506103dd61086e366004614449565b611957565b34801561087f57600080fd5b506108c561088e366004614430565b6101606020526000908152604090205463ffffffff80821691600160201b810490911690600160401b90046001600160a01b031683565b6040805163ffffffff94851681529390921660208401526001600160a01b03169082015260600161032d565b3480156108fd57600080fd5b506103dd61090c366004614c57565b611a57565b34801561091d57600080fd5b5061093161092c366004614430565b611b98565b60405161032d9190614d0b565b34801561094a57600080fd5b506101c9546001600160a01b0316610649565b34801561096957600080fd5b506103dd610978366004614a20565b611c82565b34801561098957600080fd5b50610323602081565b34801561099e57600080fd5b506060610390565b3480156109b257600080fd5b506103dd6109c13660046145ab565b611c98565b6103dd6109d4366004614d47565b611d30565b3480156109e557600080fd5b506106496109f4366004614430565b610232602052600090815260409020546001600160a01b031681565b348015610a1c57600080fd5b50604080518082019091526005815264322e372e3360d81b6020820152610390565b348015610a4a57600080fd5b506103dd610a59366004614dc2565b611d9c565b348015610a6a57600080fd5b50610323601081565b348015610a7f57600080fd5b50610a93610a8e366004614df0565b611da7565b60405161032d9190614e31565b348015610aac57600080fd5b506103dd610abb366004614e93565b611e9b565b348015610acc57600080fd5b50610ae0610adb366004614430565b611eb3565b60405161032d9190614ec0565b348015610af957600080fd5b50610323610b08366004614ef5565b6102336020526000908152604090205481565b348015610b2757600080fd5b50610323600281565b348015610b3c57600080fd5b506103dd610b4b366004614f12565b611fb2565b348015610b5c57600080fd5b506103dd610b6b366004614f74565b611fe0565b348015610b7c57600080fd5b50610323610b8b366004615002565b612057565b348015610b9c57600080fd5b506103dd610bab36600461504d565b6120cc565b348015610bbc57600080fd5b50610649610bcb366004614430565b61012d602052600090815260409020546001600160a01b031681565b348015610bf357600080fd5b506103dd610c02366004614430565b612243565b348015610c1357600080fd5b50610649610c22366004614430565b612273565b348015610c3357600080fd5b506103906122cd565b348015610c4857600080fd5b5061036b610c573660046150a8565b612362565b348015610c6857600080fd5b50610c71612390565b60405161032d91906150d6565b348015610c8a57600080fd5b506103dd610c9936600461512b565b612403565b348015610caa57600080fd5b50610323600481565b348015610cbf57600080fd5b506103dd610cce366004615184565b61249a565b60006001600160a01b038316610cfc57604051632188330d60e21b815260040160405180910390fd5b5060008181526097602090815260408083206001600160a01b03861684529091529020545b92915050565b600063152a902d60e11b6001600160e01b031983161480610d5857506001600160e01b031982166304aca5db60e51b145b80610d675750610d67826124f4565b80610d8257506001600160e01b0319821663ed78891360e01b145b80610d9d57506001600160e01b0319821663709e537f60e01b145b80610d2157506001600160e01b03198216631acf898160e11b1492915050565b60606101938054610dcd906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610df9906151ec565b8015610e465780601f10610e1b57610100808354040283529160200191610e46565b820191906000526020600020905b815481529060010190602001808311610e2957829003601f168201915b5050505050905090565b60008181526101c66020526040812080546060929190610e6f906151ec565b90501115610f165760008281526101c6602052604090208054610e91906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054610ebd906151ec565b8015610f0a5780601f10610edf57610100808354040283529160200191610f0a565b820191906000526020600020905b815481529060010190602001808311610eed57829003601f168201915b50505050509050919050565b610d2182612544565b60006020610f2e3383836125c1565b610f3783612607565b505050565b6000610f483382612659565b610f55600083600261269c565b610f725760405163131dd3a760e31b815260040160405180910390fd5b610f7b826126c8565b5050565b600082815261023160205260409020546001600160a01b03163314610fb757604051632afb0ecf60e01b815260040160405180910390fd5b610f7b828261272b565b816010610fcf3383836125c1565b83610fd957600080fd5b83600080516020615f0183398151915284604051610ff7919061441d565b60405180910390a260008481526101c6602052604090206110188482615266565b5050505050565b600061102c84848461275a565b949350505050565b600080600061104285611eb3565b90507f000000000000000000000000000000000000000000000000000000000000000084826020015163ffffffff1661107b919061533b565b6110859190615352565b6040909101519590945092505050565b6001600160a01b03851633148015906110b557506110b38533612362565b155b156110d357604051633e2ea01560e21b815260040160405180910390fd5b611018858585858561276a565b6110e861292a565b61112b8787878787808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508992508891506129839050565b6111356001606555565b50505050505050565b6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016300361118757604051631932df4560e01b815260040160405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166111b9612ae1565b6001600160a01b0316146111e0576040516364cd8d1960e01b815260040160405180910390fd5b6111e981612afd565b6040805160008082526020820190925261120591839190612ba8565b50565b600060206112173383836125c1565b6101ca544790611234906001600160a01b0316826204baf0612c8c565b610f37576101ca5460405163292264c360e21b8152611261916001600160a01b0316908390600401614648565b60405180910390fd5b6000610d216602c2ad68fd90008361533b565b815181516060919081146112a45760405163133933f760e21b815260040160405180910390fd5b806001600160401b038111156112bc576112bc614496565b6040519080825280602002602001820160405280156112e5578160200160208202803683370190505b50915060005b818110156113545761132f85828151811061130857611308615374565b602002602001015185838151811061132257611322615374565b6020026020010151610cd3565b83828151811061134157611341615374565b60209081029190910101526001016112eb565b505092915050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036113a557604051631932df4560e01b815260040160405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166113d7612ae1565b6001600160a01b0316146113fe576040516364cd8d1960e01b815260040160405180910390fd5b61140782612afd565b610f7b82826001612ba8565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461145e57604051635e4c25f160e01b815260040160405180910390fd5b50600080516020615f218339815191525b90565b61147a61432a565b6040518060a001604052806000815260200165c9e86723e0008461149e919061533b565b81526020016114b365c9e86723e0008561533b565b81526020016114c86564f43391f0008561533b565b81526020016114dd65c9e86723e0008561533b565b905292915050565b60006114ef612ae1565b905090565b826114ff3382612659565b61150a848484612cec565b8315801561152657506101c9546001600160a01b038481169116145b801561153c575061153a600084600261269c565b155b1561154b5761154b60006126c8565b50505050565b60008061155d83611eb3565b6040015190506001600160a01b038116156115785792915050565b6101ca546001600160a01b03161561159e5750506101ca546001600160a01b0316919050565b503092915050565b6115ae61292a565b8160106115bc3383836125c1565b6115c68484612d39565b8360000361160a577f56e810c8cae84731149f628981d25769a084570b9ba6eebf3c32879e3dce5609836040516115fd9190614a0c565b60405180910390a161163b565b83600080516020615f0183398151915260405161163290602080825260009082015260400190565b60405180910390a25b5050610f7b6001606555565b60008060046116573383836125c1565b61165f61292a565b60006116a688888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508a925033915060029050612e38565b90506116b2818661272b565b92506116be6001606555565b5050949350505050565b6001600160a01b03851633148015906116e857506116e68533612362565b155b1561170a5733856040516341ce11f960e11b815260040161126192919061538a565b6110188585858080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808902828101820190935288825290935088925087918291850190849080828437600092019190915250612ecd92505050565b600061178261292a565b600080600073__$76e65f60d292189c5f1c0695fc5f5098a1$__63784a80788b8b8b8b306101c8548c6040518863ffffffff1660e01b81526004016117cd97969594939291906153cd565b600060405180830381865af41580156117ea573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261181291908101906155b9565b60208084015163ffffffff166000908152610233909152604090205492955090935091501561186057505060209081015163ffffffff166000908152610233909152604090205490506118c9565b7f06c5a80e592816bd4f60093568e69affa68b5e378a189b2f59a1121703de47de826000015183602001518460400151856060015186608001516040516118ab9594939291906156c5565b60405180910390a16118c3838360600151838961305a565b93505050505b6118d36001606555565b9695505050505050565b6118e561432a565b6040518060a0016040528066012edc9ab5d00084611903919061533b565b81526020016119186564f43391f0008561533b565b815260200161192d6564f43391f0008561533b565b81526020016119426564f43391f0008561533b565b81526020016114dd6564f43391f0008561533b565b60006119633382612659565b6001600160a01b03821615611a03576040516301ffc9a760e01b81526001600160a01b038316906301ffc9a7906119a49062123aaf60e51b9060040161571f565b602060405180830381865afa1580156119c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119e59190615734565b611a03578160405162be74ab60e51b81526004016112619190614a0c565b6101cb80546001600160a01b0319166001600160a01b03841617905560025b336001600160a01b0316600080516020615ec18339815191526101c9604051611a4b9190615767565b60405180910390a35050565b611a5f61292a565b600054610100900460ff1615801580611a7c575060005460ff1615155b8015611a9d5750611a8c306124e5565b80611a9d575060005460ff16600114155b15611abb57604051633d5c224160e11b815260040160405180910390fd5b6000805460ff191660011790558015611ade576000805461ff0019166101001790555b611ae66130f1565b611aee61311a565b611af9848787613149565b611b02846126c8565b611b0b84612607565b611b148761316d565b8115611b3f57611b27600033600261317a565b611b318383611da7565b50611b3f6000336002612cec565b8015611b85576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50611b906001606555565b505050505050565b611bbc60405180606001604052806060815260200160008152602001600081525090565b60008281526101c6602052604090819020815160608101909252805482908290611be5906151ec565b80601f0160208091040260200160405190810160405280929190818152602001828054611c11906151ec565b8015611c5e5780601f10611c3357610100808354040283529160200191611c5e565b820191906000526020600020905b815481529060010190602001808311611c4157829003601f168201915b50505050508152602001600182015481526020016002820154815250509050919050565b82611c8d3382612659565b61154b84848461317a565b816010611ca63383836125c1565b600080611cb286612273565b6001600160a01b031685604051611cc991906157b2565b6000604051808303816000865af19150503d8060008114611d06576040519150601f19603f3d011682016040523d82523d6000602084013e611d0b565b606091505b509150915081611b90578060405163a5fa8d2b60e01b8152600401611261919061441d565b611d3861292a565b604080516001808252818301909252600091602080830190803683370190505090508181600081518110611d6e57611d6e615374565b60200260200101906001600160a01b031690816001600160a01b031681525050611b85878787848888612983565b610f7b3383836131c6565b6060816001600160401b03811115611dc157611dc1614496565b604051908082528060200260200182016040528015611df457816020015b6060815260200190600190039081611ddf5790505b50905060005b82811015611e9457611e6430858584818110611e1857611e18615374565b9050602002810190611e2a91906157ce565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061326592505050565b828281518110611e7657611e76615374565b60200260200101819052508080611e8c90615814565b915050611dfa565b5092915050565b816020611ea93383836125c1565b61154b8484613291565b604080516060810182526000808252602082018190529181019190915260008281526101606020526040902054600160401b90046001600160a01b031615611f475750600090815261016060209081526040918290208251606081018452905463ffffffff8082168352600160201b82041692820192909252600160401b9091046001600160a01b03169181019190915290565b5050600080526101606020908152604080516060810182527fe202c269d77798732efec7617aed439009af6a5bc60648e5771bc32ef6e071df5463ffffffff8082168352600160201b82041693820193909352600160401b9092046001600160a01b03169082015290565b611fba61292a565b826004611fc83383836125c1565b611fd48686868661337f565b505061154b6001606555565b611fe861292a565b6000611ff7336000600461275a565b905060005b845181101561203f578161202f5761202f3386838151811061202057612020615374565b602002602001015160046125c1565b61203881615814565b9050611ffc565b5061204c858585856133bd565b5061154b6001606555565b60008060046120673383836125c1565b61206f61292a565b60006120b687878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525089925033915060029050612e38565b9350506120c36001606555565b50509392505050565b8360086120da3383836125c1565b6120e6858760046125c1565b6040516301ffc9a760e01b81526001600160a01b038616906301ffc9a79061211990636890e5b360e01b9060040161571f565b602060405180830381865afa158015612136573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061215a9190615734565b61217957846040516370adc70360e11b81526004016112619190614a0c565b600061218960246004868861582d565b61219291615857565b90508681146121b45760405163fe486c2b60e01b815260040160405180910390fd5b600080876001600160a01b031687876040516121d1929190615875565b6000604051808303816000865af19150503d806000811461220e576040519150601f19603f3d011682016040523d82523d6000602084013e612213565b606091505b509150915081612238578060405163a5fa8d2b60e01b8152600401611261919061441d565b505050505050505050565b8060016101c8540314611205578060016101c85403604051634fa09b3f60e01b8152600401611261929190615885565b600081815261012d60205260409020546001600160a01b0316806122c857506000805261012d6020527fa581b17bfc4d6578e300cafbf34fd2dc1fef0270d8c73f88a99dcde2859a6639546001600160a01b03165b919050565b606060006122db6000612273565b90506001600160a01b0381161561235857806001600160a01b031663e8a3d4856040518163ffffffff1660e01b8152600401600060405180830381865afa15801561232a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526123529190810190615893565b91505090565b6123526000610e50565b6001600160a01b03918216600090815260986020908152604080832093909416825291909152205460ff1690565b606073__$76e65f60d292189c5f1c0695fc5f5098a1$__63ed7889136040518163ffffffff1660e01b8152600401600060405180830381865af41580156123db573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114ef91908101906158c7565b600060106124123383836125c1565b600080526101c66020527f8fb2e61fbe82269b67a8079678544013e6501c776e6e6ec937885147d8d1261c6124478582615266565b506124518361316d565b336001600160a01b03167f74b7c2afa3f89c562b59674a101e2c48bceeb27cdb620afefa14446f1ffa487b858560405161248c929190615982565b60405180910390a250505050565b6001600160a01b03851633148015906124ba57506124b88533612362565b155b156124d857604051633e2ea01560e21b815260040160405180910390fd5b6110188585858585613482565b6001600160a01b03163b151590565b60006001600160e01b03198216636cdb3d1360e11b148061252557506001600160e01b031982166303a24d0760e21b145b80610d2157506301ffc9a760e01b6001600160e01b0319831614610d21565b606061254f82612273565b6001600160a01b0316630e89341c836040518263ffffffff1660e01b815260040161257c91815260200190565b600060405180830381865afa158015612599573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d219190810190615893565b6125cf82848360021761269c565b806125e457506125e46000848360021761269c565b610f3757828282604051634baa2a4d60e01b8152600401611261939291906159a7565b6101ca80546001600160a01b0319166001600160a01b0383161790556001336001600160a01b0316600080516020615ec18339815191526101c960405161264e9190615767565b60405180910390a350565b6126658183600261269c565b806126785750612678600083600261269c565b610f7b5781816002604051634baa2a4d60e01b8152600401611261939291906159a7565b60009283526101fe602090815260408085206001600160a01b0394909416855292905291205416151590565b6101c980546001600160a01b038381166001600160a01b03198316179092556040519116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09061271c908390859061538a565b60405180910390a16000611a22565b6000918252610231602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b600061102c83858460021761269c565b82518251811461278d5760405163133933f760e21b815260040160405180910390fd5b6001600160a01b0385166127b457604051631c53f61160e21b815260040160405180910390fd5b336127c3818888888888613595565b6000806000805b858110156128ca578881815181106127e4576127e4615374565b6020026020010151935087818151811061280057612800615374565b602002602001015192506097600085815260200190815260200160002060008c6001600160a01b03166001600160a01b031681526020019081526020016000205491508282101561286457604051636eaa1ea960e11b815260040160405180910390fd5b60008481526097602090815260408083206001600160a01b038e168452909152812080548592906128969084906159c8565b909155505060008481526097602090815260408083206001600160a01b038f168452909152902083830390556001016127ca565b50886001600160a01b03168a6001600160a01b0316856001600160a01b0316600080516020615e818339815191528b8b6040516129089291906159db565b60405180910390a461291e848b8b8b8b8b613612565b50505050505050505050565b60026065540361297c5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401611261565b6002606555565b61298f868660046125c1565b8251600090156129b757836000815181106129ac576129ac615374565b602002602001015190505b60006129f834876129c78a611551565b60008b81526102316020908152604080832054610232909252909120546001600160a01b0391821691889116613729565b9050612a82886001600160a01b0316636890e5b3338a8a868a8a6040518763ffffffff1660e01b8152600401612a3396959493929190615a00565b6000604051808303816000875af1158015612a52573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052612a7a9190810190615a34565b51828961379f565b86886001600160a01b0316336001600160a01b03167fb362243af1e2070d7d5bf8d713f2e0fab64203f1b71462afbe20572909788c5e8934604051612ac8929190615885565b60405180910390a45050505050505050565b6001606555565b600080516020615f21833981519152546001600160a01b031690565b6000612b093382612659565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166321f74347612b40612ae1565b846040518363ffffffff1660e01b8152600401612b5e92919061538a565b602060405180830381865afa158015612b7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b9f9190615734565b610f7b57600080fd5b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615612bdb57610f3783613925565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015612c35575060408051601f3d908101601f19168201909252612c3291810190615b72565b60015b612c525760405163e5ec176960e01b815260040160405180910390fd5b600080516020615f218339815191528114612c80576040516308373ebf60e41b815260040160405180910390fd5b50610f3783838361397a565b6000836001600160a01b0316838390604051600060405180830381858888f193505050503d8060008114612cdc576040519150601f19603f3d011682016040523d82523d6000602084013e612ce1565b606091505b509095945050505050565b60008381526101fe602090815260408083206001600160a01b0386168085529252808320805485191690819055905190928392918791600080516020615ee183398151915291a450505050565b600082815261012d6020526040902080546001600160a01b0319166001600160a01b03831690811790915515612dfc576040516301ffc9a760e01b81526001600160a01b038216906301ffc9a790612d9c90633de3f32360e11b9060040161571f565b602060405180830381865afa158015612db9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ddd9190615734565b612dfc578060405163da755beb60e01b81526004016112619190614a0c565b60405133906001600160a01b0383169084907f5010f780a0de79bcfb9f3d6fec3cfe29758ef5c5800d575af709bc590bd78ade90600090a45050565b600080612e45868661399f565b9050612e5281858561317a565b855115612e805780600080516020615f0183398151915287604051612e77919061441d565b60405180910390a25b836001600160a01b0316817f1b944478023872bf91b25a13fdba3a686fdb1bf4dbb872f850240fad4b8cc0688888604051612ebc929190615b8b565b60405180910390a395945050505050565b6001600160a01b038316612ef4576040516345d40ad560e01b815260040160405180910390fd5b815181518114612f175760405163f9532c3960e01b815260040160405180910390fd5b6000339050612f3a81866000878760405180602001604052806000815250613595565b6000806000805b85811015612ffa57878181518110612f5b57612f5b615374565b60200260200101519350868181518110612f7757612f77615374565b60209081029190910181015160008681526097835260408082206001600160a01b038e1683529093529190912054909350915082821015612fcb57604051632fc4b76160e11b815260040160405180910390fd5b60008481526097602090815260408083206001600160a01b038d16845290915290208383039055600101612f41565b5060006001600160a01b0316886001600160a01b0316856001600160a01b0316600080516020615e818339815191528a8a6040516130399291906159db565b60405180910390a46040805160208101909152600090525050505050505050565b600061306984600060046125c1565b61307e85604001518660600151336002612e38565b905061308e81866080015161272b565b60208581015163ffffffff166000908152610233825260408082208490558382526102329092522080546001600160a01b0319166001600160a01b0384161790556130d883613a4b565b506130e581336002612cec565b61102c8185600261317a565b600054610100900460ff16613118576040516296bfb160e81b815260040160405180910390fd5b565b600054610100900460ff16613141576040516296bfb160e81b815260040160405180910390fd5b613118613b01565b613156600084600261317a565b61316182600061399f565b50610f37600082613291565b610193610f7b8282615266565b60008381526101fe602090815260408083206001600160a01b03861680855292528083208054851790819055905190928392918791600080516020615ee183398151915291a450505050565b816001600160a01b0316836001600160a01b0316036131f857604051636b3fa0d960e11b815260040160405180910390fd5b6001600160a01b03838116600081815260986020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b606061328a8383604051806060016040528060278152602001615f4160279139613b28565b9392505050565b805163ffffffff16156132a357600081525b60408101516001600160a01b03161580156132c857506000816020015163ffffffff16115b156132e657604051630d9b92f160e01b815260040160405180910390fd5b600082815261016060209081526040918290208351815492850151848601516001600160a01b0316600160401b02600160401b600160e01b031963ffffffff928316600160201b026001600160401b03199096169290931691909117939093171691909117905551339083907f5837d55897cfc337f160a71d7b63a047abd50a3a8834f1c5d70f338846358c6d90611a4b908590614ec0565b6133898383613b96565b60008381526101c66020526040812060020180548492906133ab9084906159c8565b9091555061154b905084848484613bfa565b825160005b81811015613475576134068582815181106133df576133df615374565b60200260200101518583815181106133f9576133f9615374565b6020026020010151613b96565b83818151811061341857613418615374565b60200260200101516101c6600087848151811061343757613437615374565b60200260200101518152602001908152602001600020600201600082825461345f91906159c8565b9091555061346e905081615814565b90506133c2565b5061101885858585613cbf565b6001600160a01b0384166134a957604051631c53f61160e21b815260040160405180910390fd5b336134b8818787878787613dff565b60008481526097602090815260408083206001600160a01b038a168452909152902054838110156134fc57604051636eaa1ea960e11b815260040160405180910390fd5b60008581526097602090815260408083206001600160a01b038b811685529252808320878503905590881682528120805486929061353b9084906159c8565b92505081905550856001600160a01b0316876001600160a01b0316836001600160a01b0316600080516020615ea1833981519152888860405161357f929190615885565b60405180910390a4611135828888888888613e4e565b6101cb546001600160a01b031615611b90576101cb54604051634058856760e11b81526001600160a01b03909116906380b10ace906135e49030908a908a908a908a908a908a90600401615bad565b600060405180830381600087803b1580156135fe57600080fd5b505af115801561291e573d6000803e3d6000fd5b613624846001600160a01b03166124e5565b15611b905760405163bc197c8160e01b81526001600160a01b0385169063bc197c819061365d9089908990889088908890600401615c1d565b6020604051808303816000875af1925050508015613698575060408051601f3d908101601f1916820190925261369591810190615c6f565b60015b6136f8576136a4615c8c565b806308c379a0036136dd57506136b8615ca7565b806136c357506136df565b8060405162461bcd60e51b8152600401611261919061441d565b505b6040516377d5b49160e11b815260040160405180910390fd5b6001600160e01b0319811663bc197c8160e01b1461113557604051633fbfe7f560e21b815260040160405180910390fd5b6000806137358761126a565b90506001600160a01b038316613749578592505b8088101561376a57604051633b78763760e21b815260040160405180910390fd5b8088036137895761377f818888888888613f11565b60009150506118d3565b613796818887878761404c565b870390506118d3565b60005b835181101561154b5760008482815181106137bf576137bf615374565b602090810291909101015151905060018160028111156137e1576137e1615751565b03613871576000808684815181106137fb576137fb615374565b60200260200101516020015180602001905181019061381a9190615d25565b915091508086111561383f57604051631913cf3760e21b815260040160405180910390fd5b61384d82826204baf0612c8c565b61386a576040516338dcead760e21b815260040160405180910390fd5b5050613914565b600281600281111561388557613885615751565b036139145760008060008785815181106138a1576138a1615374565b6020026020010151602001518060200190518101906138c09190615d53565b925092509250856000141580156138d75750858214155b156138f557604051634cdcfbf960e01b815260040160405180910390fd5b6139108387836040518060200160405280600081525061337f565b5050505b5061391e81615814565b90506137a2565b61392e816124e5565b61394b5760405163529880eb60e01b815260040160405180910390fd5b600080516020615f2183398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61398383614187565b6000825111806139905750805b15610f375761154b83836141c7565b60006139b36101c880546001810190915590565b60408051606081018252858152602080820186905260008284018190528481526101c6909152919091208151929350909182919081906139f39082615266565b506020820151600182015560409182015160029091015551829033907f5086d1bcea28999da9875111e3592688fbfa821db63214c695ca35768080c2fe90613a3c908590614d0b565b60405180910390a35092915050565b606081516001600160401b03811115613a6657613a66614496565b604051908082528060200260200182016040528015613a9957816020015b6060815260200190600190039081613a845790505b50905060005b8251811015613afb57613acb30848381518110613abe57613abe615374565b6020026020010151613265565b828281518110613add57613add615374565b60200260200101819052508080613af390615814565b915050613a9f565b50919050565b600054610100900460ff16612ada576040516296bfb160e81b815260040160405180910390fd5b6060600080856001600160a01b031685604051613b4591906157b2565b600060405180830381855af49150503d8060008114613b80576040519150601f19603f3d011682016040523d82523d6000602084013e613b85565b606091505b50915091506118d386838387614262565b60008281526101c66020526040902060018101546002820154613bba9084906159c8565b1115610f375760028101546001820154604051631255c8fd60e01b8152600481018690526024810185905260448101929092526064820152608401611261565b6001600160a01b038416613c21576040516310227bb960e31b815260040160405180910390fd5b33613c3181600087878787613dff565b60008481526097602090815260408083206001600160a01b038916845290915281208054859290613c639084906159c8565b92505081905550846001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020615ea18339815191528787604051613ca8929190615885565b60405180910390a461101881600087878787613e4e565b6001600160a01b038416613ce6576040516310227bb960e31b815260040160405180910390fd5b825182518114613d095760405163f9532c3960e01b815260040160405180910390fd5b33613d1981600088888888613595565b60005b82811015613da957848181518110613d3657613d36615374565b602002602001015160976000888481518110613d5457613d54615374565b602002602001015181526020019081526020016000206000896001600160a01b03166001600160a01b031681526020019081526020016000206000828254613d9c91906159c8565b9091555050600101613d1c565b50856001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020615e818339815191528888604051613de89291906159db565b60405180910390a4611b9081600088888888613612565b6101cb546001600160a01b031615611b90576101cb5460405163417b2f9760e11b81526001600160a01b03909116906382f65f2e906135e49030908a908a908a908a908a908a90600401615d8a565b613e60846001600160a01b03166124e5565b15611b905760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190613e999089908990889088908890600401615de1565b6020604051808303816000875af1925050508015613ed4575060408051601f3d908101601f19168201909252613ed191810190615c6f565b60015b613ee0576136a4615c8c565b6001600160e01b0319811663f23a6e6160e01b1461113557604051633fbfe7f560e21b815260040160405180910390fd5b6000613f1c866118dd565b90506001600160a01b038416613f50577f000000000000000000000000000000000000000000000000000000000000000093505b6001600160a01b038316613f82577f000000000000000000000000000000000000000000000000000000000000000092505b8051602082015160408084015160608501516080860151925163faa3516f60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169563faa3516f958e95614011958e9593948e948e938e927f00000000000000000000000000000000000000000000000000000000000000009190600401615e26565b6000604051808303818588803b15801561402a57600080fd5b505af115801561403e573d6000803e3d6000fd5b505050505050505050505050565b600061405785611472565b90506001600160a01b03841661408b577f000000000000000000000000000000000000000000000000000000000000000093505b6001600160a01b0383166140bd577f000000000000000000000000000000000000000000000000000000000000000092505b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663faa3516f876000808886602001518988604001518a8a606001517f00000000000000000000000000000000000000000000000000000000000000008c608001516040518c63ffffffff1660e01b815260040161414d9a99989796959493929190615e26565b6000604051808303818588803b15801561416657600080fd5b505af115801561417a573d6000803e3d6000fd5b5050505050505050505050565b61419081613925565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606141d2836124e5565b6141ef5760405163369891e760e01b815260040160405180910390fd5b600080846001600160a01b03168460405161420a91906157b2565b600060405180830381855af49150503d8060008114614245576040519150601f19603f3d011682016040523d82523d6000602084013e61424a565b606091505b509150915061425982826142d9565b95945050505050565b606083156142cf5782516000036142c85761427c856124e5565b6142c85760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401611261565b508161102c565b61102c83836142f1565b606082156142e8575080610d21565b610d2182614301565b8151156136c35781518083602001fd5b8051156143115780518082602001fd5b6040516350a28c9b60e11b815260040160405180910390fd5b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b6001600160a01b038116811461120557600080fd5b6000806040838503121561438157600080fd5b823561438c81614359565b946020939093013593505050565b6001600160e01b03198116811461120557600080fd5b6000602082840312156143c257600080fd5b813561328a8161439a565b60005b838110156143e85781810151838201526020016143d0565b50506000910152565b600081518084526144098160208601602086016143cd565b601f01601f19169290920160200192915050565b60208152600061328a60208301846143f1565b60006020828403121561444257600080fd5b5035919050565b60006020828403121561445b57600080fd5b813561328a81614359565b6000806040838503121561447957600080fd5b82359150602083013561448b81614359565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60a081016001600160401b03811182821017156144cb576144cb614496565b60405250565b604081016001600160401b03811182821017156144cb576144cb614496565b601f8201601f191681016001600160401b038111828210171561451557614515614496565b6040525050565b60405161146f816144ac565b60006001600160401b0382111561454157614541614496565b50601f01601f191660200190565b600082601f83011261456057600080fd5b813561456b81614528565b60405161457882826144f0565b82815285602084870101111561458d57600080fd5b82602086016020830137600092810160200192909252509392505050565b600080604083850312156145be57600080fd5b8235915060208301356001600160401b038111156145db57600080fd5b6145e78582860161454f565b9150509250929050565b60008060006060848603121561460657600080fd5b833561461181614359565b95602085013595506040909401359392505050565b6000806040838503121561463957600080fd5b50508035926020909101359150565b6001600160a01b03929092168252602082015260400190565b60006001600160401b0382111561467a5761467a614496565b5060051b60200190565b600082601f83011261469557600080fd5b813560206146a282614661565b6040516146af82826144f0565b83815260059390931b85018201928281019150868411156146cf57600080fd5b8286015b848110156146ea57803583529183019183016146d3565b509695505050505050565b600080600080600060a0868803121561470d57600080fd5b853561471881614359565b9450602086013561472881614359565b935060408601356001600160401b038082111561474457600080fd5b61475089838a01614684565b9450606088013591508082111561476657600080fd5b61477289838a01614684565b9350608088013591508082111561478857600080fd5b506147958882890161454f565b9150509295509295909350565b60008083601f8401126147b457600080fd5b5081356001600160401b038111156147cb57600080fd5b6020830191508360208260051b85010111156147e657600080fd5b9250929050565b60008083601f8401126147ff57600080fd5b5081356001600160401b0381111561481657600080fd5b6020830191508360208285010111156147e657600080fd5b600080600080600080600060a0888a03121561484957600080fd5b873561485481614359565b9650602088013595506040880135945060608801356001600160401b038082111561487e57600080fd5b61488a8b838c016147a2565b909650945060808a01359150808211156148a357600080fd5b506148b08a828b016147ed565b989b979a50959850939692959293505050565b600080604083850312156148d657600080fd5b82356001600160401b03808211156148ed57600080fd5b818501915085601f83011261490157600080fd5b8135602061490e82614661565b60405161491b82826144f0565b83815260059390931b850182019282810191508984111561493b57600080fd5b948201945b8386101561496257853561495381614359565b82529482019490820190614940565b9650508601359250508082111561497857600080fd5b506145e785828601614684565b600081518084526020808501945080840160005b838110156149b557815187529582019590820190600101614999565b509495945050505050565b60208152600061328a6020830184614985565b600080604083850312156149e657600080fd5b82356149f181614359565b915060208301356001600160401b038111156145db57600080fd5b6001600160a01b0391909116815260200190565b600080600060608486031215614a3557600080fd5b833592506020840135614a4781614359565b929592945050506040919091013590565b60008060008060608587031215614a6e57600080fd5b84356001600160401b03811115614a8457600080fd5b614a90878288016147ed565b909550935050602085013591506040850135614aab81614359565b939692955090935050565b600080600080600060608688031215614ace57600080fd5b8535614ad981614359565b945060208601356001600160401b0380821115614af557600080fd5b614b0189838a016147a2565b90965094506040880135915080821115614b1a57600080fd5b50614b27888289016147a2565b969995985093965092949392505050565b60008060008060008060a08789031215614b5157600080fd5b86356001600160401b0380821115614b6857600080fd5b614b748a838b0161454f565b9750602089013596506040890135915080821115614b9157600080fd5b50614b9e89828a016147ed565b9095509350506060870135614bb281614359565b91506080870135614bc281614359565b809150509295509295509295565b63ffffffff8116811461120557600080fd5b600060608284031215614bf457600080fd5b604051606081016001600160401b0381118282101715614c1657614c16614496565b6040529050808235614c2781614bd0565b81526020830135614c3781614bd0565b60208201526040830135614c4a81614359565b6040919091015292915050565b60008060008060008060e08789031215614c7057600080fd5b86356001600160401b0380821115614c8757600080fd5b614c938a838b0161454f565b97506020890135915080821115614ca957600080fd5b614cb58a838b0161454f565b9650614cc48a60408b01614be2565b955060a08901359150614cd682614359565b90935060c08801359080821115614cec57600080fd5b50614cf989828a016147a2565b979a9699509497509295939492505050565b602081526000825160606020840152614d2760808401826143f1565b905060208401516040840152604084015160608401528091505092915050565b60008060008060008060a08789031215614d6057600080fd5b8635614d6b81614359565b9550602087013594506040870135935060608701356001600160401b03811115614d9457600080fd5b614da089828a016147ed565b9094509250506080870135614bc281614359565b801515811461120557600080fd5b60008060408385031215614dd557600080fd5b8235614de081614359565b9150602083013561448b81614db4565b60008060208385031215614e0357600080fd5b82356001600160401b03811115614e1957600080fd5b614e25858286016147a2565b90969095509350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015614e8657603f19888603018452614e748583516143f1565b94509285019290850190600101614e58565b5092979650505050505050565b60008060808385031215614ea657600080fd5b82359150614eb78460208501614be2565b90509250929050565b815163ffffffff9081168252602080840151909116908201526040918201516001600160a01b03169181019190915260600190565b600060208284031215614f0757600080fd5b813561328a81614bd0565b60008060008060808587031215614f2857600080fd5b8435614f3381614359565b9350602085013592506040850135915060608501356001600160401b03811115614f5c57600080fd5b614f688782880161454f565b91505092959194509250565b60008060008060808587031215614f8a57600080fd5b8435614f9581614359565b935060208501356001600160401b0380821115614fb157600080fd5b614fbd88838901614684565b94506040870135915080821115614fd357600080fd5b614fdf88838901614684565b93506060870135915080821115614ff557600080fd5b50614f688782880161454f565b60008060006040848603121561501757600080fd5b83356001600160401b0381111561502d57600080fd5b615039868287016147ed565b909790965060209590950135949350505050565b6000806000806060858703121561506357600080fd5b84359350602085013561507581614359565b925060408501356001600160401b0381111561509057600080fd5b61509c878288016147ed565b95989497509550505050565b600080604083850312156150bb57600080fd5b82356150c681614359565b9150602083013561448b81614359565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015614e8657603f198886030184526151198583516143f1565b945092850192908501906001016150fd565b6000806040838503121561513e57600080fd5b82356001600160401b038082111561515557600080fd5b6151618683870161454f565b9350602085013591508082111561517757600080fd5b506145e78582860161454f565b600080600080600060a0868803121561519c57600080fd5b85356151a781614359565b945060208601356151b781614359565b9350604086013592506060860135915060808601356001600160401b038111156151e057600080fd5b6147958882890161454f565b600181811c9082168061520057607f821691505b602082108103613afb57634e487b7160e01b600052602260045260246000fd5b601f821115610f3757600081815260208120601f850160051c810160208610156152475750805b601f850160051c820191505b81811015611b9057828155600101615253565b81516001600160401b0381111561527f5761527f614496565b6152938161528d84546151ec565b84615220565b602080601f8311600181146152c857600084156152b05750858301515b600019600386901b1c1916600185901b178555611b90565b600085815260208120601f198616915b828110156152f7578886015182559484019460019091019084016152d8565b50858210156153155787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610d2157610d21615325565b60008261536f57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0392831681529116602082015260400190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60c0815260006153e060c083018a6143f1565b88602084015282810360408401526153f981888a6153a4565b6001600160a01b03968716606085015260808401959095525050921660a090920191909152949350505050565b600082601f83011261543757600080fd5b815161544281614528565b60405161544f82826144f0565b82815285602084870101111561546457600080fd5b6142598360208301602088016143cd565b80516122c881614359565b600060a0828403121561549257600080fd5b61549a61451c565b8251815260208301519091506001600160401b03808211156154bb57600080fd5b6154c785838601615426565b602084015260408401519150808211156154e057600080fd5b6154ec85838601615426565b60408401526154fd60608501615475565b6060840152608084015191508082111561551657600080fd5b5061552384828501615426565b60808301525092915050565b600082601f83011261554057600080fd5b8151602061554d82614661565b60405161555a82826144f0565b83815260059390931b850182019282810191508684111561557a57600080fd5b8286015b848110156146ea5780516001600160401b0381111561559d5760008081fd5b6155ab8986838b0101615426565b84525091830191830161557e565b6000806000606084860312156155ce57600080fd5b83516001600160401b03808211156155e557600080fd5b9085019060a082880312156155f957600080fd5b604051615605816144ac565b82518281111561561457600080fd5b61562089828601615480565b825250602083015161563181614bd0565b602082015260408301518281111561564857600080fd5b61565489828601615426565b6040830152506060830151606082015261567060808401615475565b6080820152602087015190955091508082111561568c57600080fd5b61569887838801615480565b935060408601519150808211156156ae57600080fd5b506156bb8682870161552f565b9150509250925092565b85815260a0602082015260006156de60a08301876143f1565b82810360408401526156f081876143f1565b6001600160a01b03861660608501528381036080850152905061571381856143f1565b98975050505050505050565b6001600160e01b031991909116815260200190565b60006020828403121561574657600080fd5b815161328a81614db4565b634e487b7160e01b600052602160045260246000fd5b81546001600160a01b03808216835260a091821c602084015260018401548082166040850152821c6060840152600290930154928316608083015291821c9181019190915260c00190565b600082516157c48184602087016143cd565b9190910192915050565b6000808335601e198436030181126157e557600080fd5b8301803591506001600160401b038211156157ff57600080fd5b6020019150368190038213156147e657600080fd5b60006001820161582657615826615325565b5060010190565b6000808585111561583d57600080fd5b8386111561584a57600080fd5b5050820193919092039150565b80356020831015610d2157600019602084900360031b1b1692915050565b8183823760009101908152919050565b918252602082015260400190565b6000602082840312156158a557600080fd5b81516001600160401b038111156158bb57600080fd5b61102c84828501615426565b600060208083850312156158da57600080fd5b82516001600160401b03808211156158f157600080fd5b818501915085601f83011261590557600080fd5b815161591081614661565b60405161591d82826144f0565b82815260059290921b840185019185810191508883111561593d57600080fd5b8585015b83811015615975578051858111156159595760008081fd5b6159678b89838a0101615426565b845250918601918601615941565b5098975050505050505050565b60408152600061599560408301856143f1565b828103602084015261425981856143f1565b6001600160a01b039390931683526020830191909152604082015260600190565b80820180821115610d2157610d21615325565b6040815260006159ee6040830185614985565b82810360208401526142598185614985565b60018060a01b038716815285602082015284604082015283606082015260a06080820152600061571360a0830184866153a4565b60006020808385031215615a4757600080fd5b82516001600160401b0380821115615a5e57600080fd5b9084019060408287031215615a7257600080fd5b604051615a7e816144d1565b825182811115615a8d57600080fd5b8301601f81018813615a9e57600080fd5b8051615aa981614661565b604051615ab682826144f0565b82815260059290921b830187019187810191508a831115615ad657600080fd5b8784015b83811015615b5957805187811115615af157600080fd5b85016040818e03601f19011215615b0757600080fd5b604051615b13816144d1565b8a82015160038110615b2457600080fd5b8152604082015189811115615b3857600080fd5b615b468f8d83860101615426565b828d015250845250918801918801615ada565b5084525050509183015192820192909252949350505050565b600060208284031215615b8457600080fd5b5051919050565b604081526000615b9e60408301856143f1565b90508260208301529392505050565b6001600160a01b038881168252878116602083015286811660408301528516606082015260e060808201819052600090615be990830186614985565b82810360a0840152615bfb8186614985565b905082810360c0840152615c0f81856143f1565b9a9950505050505050505050565b6001600160a01b0386811682528516602082015260a060408201819052600090615c4990830186614985565b8281036060840152615c5b8186614985565b9050828103608084015261571381856143f1565b600060208284031215615c8157600080fd5b815161328a8161439a565b600060033d111561146f5760046000803e5060005160e01c90565b600060443d1015615cb55790565b6040516003193d81016004833e81513d6001600160401b038083116024840183101715615ce457505050505090565b8285019150815181811115615cfc5750505050505090565b843d8701016020828501011115615d165750505050505090565b612ce1602082860101876144f0565b60008060408385031215615d3857600080fd5b8251615d4381614359565b6020939093015192949293505050565b600080600060608486031215615d6857600080fd5b8351615d7381614359565b602085015160409095015190969495509392505050565b6001600160a01b03888116825287811660208301528681166040830152851660608201526080810184905260a0810183905260e060c08201819052600090615dd4908301846143f1565b9998505050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090615e1b908301846143f1565b979650505050505050565b6001600160a01b039a8b168152602081019990995296891660408901526060880195909552928716608087015260a0860191909152851660c085015260e0840152909216610100820152610120810191909152610140019056fe4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fbc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f623be6d3a1d957610f7e900c66889b874cdc9f0c22901aa8be6ec3d2d04c14ca0f35fb03d0d293ef5b362761900725ce891f8f766b5a662cdd445372355448e7ca6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220aebe57e57ceeb4b7b7f08b2153bdced781455886d4266c845264e1f272cb5c7b64736f6c63430008110033',
  linkReferences: {
    'contracts/zora/delegation/ZoraCreator1155Attribution.sol': {
      DelegatedTokenCreation: [
        {
          length: 20,
          start: 6670,
        },
        {
          length: 20,
          start: 9753,
        },
      ],
    },
  },
  deployedLinkReferences: {
    'contracts/zora/delegation/ZoraCreator1155Attribution.sol': {
      DelegatedTokenCreation: [
        {
          length: 20,
          start: 6025,
        },
        {
          length: 20,
          start: 9108,
        },
      ],
    },
  },
};
