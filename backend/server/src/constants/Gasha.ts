export const Gasha = {
  _format: 'hh-sol-artifact-1',
  contractName: 'Gasha',
  sourceName: 'contracts/Gasha.sol',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ActivateSeriesItem',
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
      ],
      name: 'DeactivateSeriesItem',
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
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
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
          internalType: 'uint256',
          name: 'seed',
          type: 'uint256',
        },
      ],
      name: 'ResetSeed',
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
          indexed: false,
          internalType: 'uint256',
          name: 'weight',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'enum IGasha.Rareness',
          name: 'rareness',
          type: 'uint8',
        },
      ],
      name: 'SetNewSeriesItem',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'minter',
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
          name: 'quantities',
          type: 'uint256[]',
        },
      ],
      name: 'Spin',
      type: 'event',
    },
    {
      inputs: [],
      name: 'MerkleMinter',
      outputs: [
        {
          internalType: 'contract IMinter1155',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ZoraCreator1155',
      outputs: [
        {
          internalType: 'contract IZoraCreator1155',
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
      name: 'activateSeriesItem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'activeSeriesItems',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'enum IGasha.Rareness',
              name: 'rareness',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: 'weight',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isActive',
              type: 'bool',
            },
          ],
          internalType: 'struct IGasha.SeriesItem[]',
          name: '',
          type: 'tuple[]',
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
      name: 'deactivateSeriesItem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_initialOwner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_zoraCreator1155',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_merkleMinter',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_mintReferral',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_initialSeed',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_unitPrice',
          type: 'uint256',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'mintReferral',
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
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC1155BatchReceived',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC1155Received',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
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
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'newSeed',
          type: 'uint256',
        },
      ],
      name: 'resetSeed',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'seed',
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
      name: 'series',
      outputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'enum IGasha.Rareness',
          name: 'rareness',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'weight',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'isActive',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'seriesItems',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'enum IGasha.Rareness',
              name: 'rareness',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: 'weight',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'isActive',
              type: 'bool',
            },
          ],
          internalType: 'struct IGasha.SeriesItem[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes',
          name: '_minterArguments',
          type: 'bytes',
        },
      ],
      name: 'setMinterArguments',
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
          internalType: 'enum IGasha.Rareness',
          name: 'rareness',
          type: 'uint8',
        },
        {
          internalType: 'uint256',
          name: 'weight',
          type: 'uint256',
        },
      ],
      name: 'setNewSeriesItem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
      ],
      name: 'spin',
      outputs: [],
      stateMutability: 'payable',
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
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'unitPrice',
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
  ],
  bytecode:
    '0x608060405234801561001057600080fd5b50611a0f806100206000396000f3fe6080604052600436106100ef5760003560e01c80631c42ce4e146100f4578063276ca3701461011f5780632ff6cee214610141578063304dbd7a1461016157806344ef2d271461018157806364fedff7146101965780636578fcb0146101b65780636958769b146101ee578063715018a61461020e5780637d94792a146102235780638da5cb5b146102475780639d1f54fa1461025c578063a5b6ea8f1461027c578063abc6011d1461028f578063bc197c81146102af578063d7c41c79146102f4578063dc22cb6a14610314578063e73faa2d14610344578063f23a6e611461035a578063f2fde38b14610386575b600080fd5b34801561010057600080fd5b506101096103a6565b6040516101169190611209565b60405180910390f35b34801561012b57600080fd5b5061013f61013a366004611278565b61056a565b005b34801561014d57600080fd5b5061013f61015c3660046112b4565b6106b2565b34801561016d57600080fd5b5061013f61017c3660046112b4565b6106bf565b34801561018d57600080fd5b50610109610750565b3480156101a257600080fd5b5061013f6101b13660046112b4565b610810565b3480156101c257600080fd5b506066546101d6906001600160a01b031681565b6040516001600160a01b039091168152602001610116565b3480156101fa57600080fd5b5061013f610209366004611382565b610877565b34801561021a57600080fd5b5061013f61088b565b34801561022f57600080fd5b50610239606a5481565b604051908152602001610116565b34801561025357600080fd5b506101d661089f565b34801561026857600080fd5b506067546101d6906001600160a01b031681565b61013f61028a3660046112b4565b6108ae565b34801561029b57600080fd5b506065546101d6906001600160a01b031681565b3480156102bb57600080fd5b506102db6102ca366004611459565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610116565b34801561030057600080fd5b5061013f61030f366004611502565b610cff565b34801561032057600080fd5b5061033461032f3660046112b4565b610e66565b6040516101169493929190611568565b34801561035057600080fd5b50610239606b5481565b34801561036657600080fd5b506102db610375366004611593565b63f23a6e6160e01b95945050505050565b34801561039257600080fd5b5061013f6103a13660046115f7565b610ea6565b60606000805b60695481101561040557606981815481106103c9576103c9611619565b600091825260209091206003600490920201015460ff16156103f357816103ef81611645565b9250505b806103fd81611645565b9150506103ac565b506000816001600160401b03811115610420576104206112cd565b60405190808252806020026020018201604052801561045957816020015b6104466111a8565b81526020019060019003908161043e5790505b5090506000805b606954811015610561576069818154811061047d5761047d611619565b600091825260209091206003600490920201015460ff161561054f57606981815481106104ac576104ac611619565b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900460ff1660028111156104f3576104f36111d1565b6002811115610504576105046111d1565b81526002820154602082015260039091015460ff161515604090910152835184908490811061053557610535611619565b6020026020010181905250818061054b90611645565b9250505b8061055981611645565b915050610460565b50909392505050565b610572610f1f565b60005b60695481101561060957836069828154811061059357610593611619565b906000526020600020906004020160000154036105f75760405162461bcd60e51b815260206004820152601f60248201527f47617368613a20746f6b656e496420697320616c72656164792065786973740060448201526064015b60405180910390fd5b8061060181611645565b915050610575565b506069604051806080016040528085815260200184600281111561062f5761062f6111d1565b815260208082018590526001604090920182905283548083018555600094855293819020835160049095020193845582015183820180549394939192909160ff191690836002811115610684576106846111d1565b0217905550604082015160028201556060909101516003909101805460ff1916911515919091179055505050565b6106ba610f1f565b606a55565b6106c7610f1f565b60005b60695481101561074c5781606982815481106106e8576106e8611619565b9060005260206000209060040201600001540361073a5760016069828154811061071457610714611619565b60009182526020909120600490910201600301805460ff19169115159190911790555050565b8061074481611645565b9150506106ca565b5050565b60606069805480602002602001604051908101604052809291908181526020016000905b828210156108075783829060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900460ff1660028111156107c5576107c56111d1565b60028111156107d6576107d66111d1565b8152600282015460208083019190915260039092015460ff1615156040909101529082526001929092019101610774565b50505050905090565b610818610f1f565b60005b60695481101561074c57816069828154811061083957610839611619565b906000526020600020906004020160000154036108655760006069828154811061071457610714611619565b8061086f81611645565b91505061081b565b61087f610f1f565b606861074c82826116e7565b610893610f1f565b61089d6000610f7e565b565b6033546001600160a01b031690565b6000811180156108bf57506103e881105b6109085760405162461bcd60e51b815260206004820152601a60248201527911d85cda184e881c5d585b9d1a5d1e481a5cc81a5b9d985b1a5960321b60448201526064016105ee565b80606b5461091691906117a6565b3410156109615760405162461bcd60e51b815260206004820152601960248201527847617368613a20696e73756666696369656e742066756e647360381b60448201526064016105ee565b6069546000906001600160401b0381111561097e5761097e6112cd565b6040519080825280602002602001820160405280156109a7578160200160208202803683370190505b506069549091506000906001600160401b038111156109c8576109c86112cd565b6040519080825280602002602001820160405280156109f1578160200160208202803683370190505b50905060005b606954811015610a755760698181548110610a1457610a14611619565b906000526020600020906004020160000154838281518110610a3857610a38611619565b6020026020010181815250506000828281518110610a5857610a58611619565b602090810291909101015280610a6d81611645565b9150506109f7565b5060005b83811015610b1e576000610a8c82610fd0565b905060005b606954811015610b095781516069805483908110610ab157610ab1611619565b90600052602060002090600402016000015403610af757838181518110610ada57610ada611619565b602002602001018051809190610aef90611645565b905250610b09565b80610b0181611645565b915050610a91565b50508080610b1690611645565b915050610a79565b5060005b606954811015610c4e576000828281518110610b4057610b40611619565b60200260200101511115610c3c5760655482516001600160a01b0390911690639dbb844d90849084908110610b7757610b77611619565b6020026020010151606b54610b8c91906117a6565b60665486516001600160a01b0390911690879086908110610baf57610baf611619565b6020026020010151868681518110610bc957610bc9611619565b60200260200101516068606760009054906101000a90046001600160a01b03166040518763ffffffff1660e01b8152600401610c099594939291906117c3565b6000604051808303818588803b158015610c2257600080fd5b505af1158015610c36573d6000803e3d6000fd5b50505050505b80610c4681611645565b915050610b22565b50606554604051631759616b60e11b81526001600160a01b0390911690632eb2c2d690610c859030903390879087906004016118bd565b600060405180830381600087803b158015610c9f57600080fd5b505af1158015610cb3573d6000803e3d6000fd5b50505050336001600160a01b03167f54861d6781f670f742928bb4e162f901feafcb62f843c17716ee3d5be674afca8383604051610cf2929190611918565b60405180910390a2505050565b600054610100900460ff1615808015610d1f5750600054600160ff909116105b80610d395750303b158015610d39575060005460ff166001145b610d9c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105ee565b6000805460ff191660011790558015610dbf576000805461ff0019166101001790555b610dc761114e565b610dd087610ea6565b606580546001600160a01b038089166001600160a01b031992831617909255606680548884169083161790556067805492871692909116919091179055606a839055606b8290558015610e5d576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b60698181548110610e7657600080fd5b6000918252602090912060049091020180546001820154600283015460039093015491935060ff90811692911684565b610eae610f1f565b6001600160a01b038116610f135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105ee565b610f1c81610f7e565b50565b33610f2861089f565b6001600160a01b03161461089d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105ee565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610fd86111a8565b600080610fe36103a6565b905060005b815181101561102e5781818151811061100357611003611619565b6020026020010151604001518361101a9190611946565b92508061102681611645565b915050610fe8565b50600082424487606a546110429190611959565b60408051602081019490945283019190915260608201526080016040516020818303038152906040528051906020012060001c61107f919061196c565b90506000805b83518110156110f9578381815181106110a0576110a0611619565b602002602001015160400151826110b79190611946565b9150818310156110e7578381815181106110d3576110d3611619565b602002602001015195505050505050919050565b806110f181611645565b915050611085565b5060405162461bcd60e51b815260206004820152602360248201527f47617368613a206661696c656420746f207069636b20612072616e646f6d2062604482015262185b1b60ea1b60648201526084016105ee565b600054610100900460ff166111755760405162461bcd60e51b81526004016105ee9061198e565b61089d600054610100900460ff1661119f5760405162461bcd60e51b81526004016105ee9061198e565b61089d33610f7e565b604080516080810190915260008082526020820190815260006020820181905260409091015290565b634e487b7160e01b600052602160045260246000fd5b6003811061120557634e487b7160e01b600052602160045260246000fd5b9052565b602080825282518282018190526000919060409081850190868401855b8281101561126b5781518051855286810151611244888701826111e7565b50808601518587015260609081015115159085015260809093019290850190600101611226565b5091979650505050505050565b60008060006060848603121561128d57600080fd5b833592506020840135600381106112a357600080fd5b929592945050506040919091013590565b6000602082840312156112c657600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561130b5761130b6112cd565b604052919050565b600082601f83011261132457600080fd5b81356001600160401b0381111561133d5761133d6112cd565b611350601f8201601f19166020016112e3565b81815284602083860101111561136557600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561139457600080fd5b81356001600160401b038111156113aa57600080fd5b6113b684828501611313565b949350505050565b80356001600160a01b03811681146113d557600080fd5b919050565b600082601f8301126113eb57600080fd5b813560206001600160401b03821115611406576114066112cd565b8160051b6114158282016112e3565b928352848101820192828101908785111561142f57600080fd5b83870192505b8483101561144e57823582529183019190830190611435565b979650505050505050565b600080600080600060a0868803121561147157600080fd5b61147a866113be565b9450611488602087016113be565b935060408601356001600160401b03808211156114a457600080fd5b6114b089838a016113da565b945060608801359150808211156114c657600080fd5b6114d289838a016113da565b935060808801359150808211156114e857600080fd5b506114f588828901611313565b9150509295509295909350565b60008060008060008060c0878903121561151b57600080fd5b611524876113be565b9550611532602088016113be565b9450611540604088016113be565b935061154e606088016113be565b92506080870135915060a087013590509295509295509295565b8481526080810161157c60208301866111e7565b836040830152821515606083015295945050505050565b600080600080600060a086880312156115ab57600080fd5b6115b4866113be565b94506115c2602087016113be565b9350604086013592506060860135915060808601356001600160401b038111156115eb57600080fd5b6114f588828901611313565b60006020828403121561160957600080fd5b611612826113be565b9392505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016116575761165761162f565b5060010190565b600181811c9082168061167257607f821691505b60208210810361169257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156116e257600081815260208120601f850160051c810160208610156116bf5750805b601f850160051c820191505b818110156116de578281556001016116cb565b5050505b505050565b81516001600160401b03811115611700576117006112cd565b6117148161170e845461165e565b84611698565b602080601f83116001811461174957600084156117315750858301515b600019600386901b1c1916600185901b1785556116de565b600085815260208120601f198616915b8281101561177857888601518255948401946001909101908401611759565b50858210156117965787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80820281158282048414176117bd576117bd61162f565b92915050565b60018060a01b038616815260006020868184015285604084015260a06060840152600085546117f18161165e565b8060a087015260c0600180841660008114611813576001811461182d5761185b565b60ff1985168984015283151560051b89018301955061185b565b8a6000528660002060005b858110156118535781548b8201860152908301908801611838565b8a0184019650505b505050506001600160a01b03861660808601525091506118789050565b9695505050505050565b600081518084526020808501945080840160005b838110156118b257815187529582019590820190600101611896565b509495945050505050565b6001600160a01b0385811682528416602082015260a0604082018190526000906118e990830185611882565b82810360608401526118fb8185611882565b838103608090940193909352505060008152602001949350505050565b60408152600061192b6040830185611882565b828103602084015261193d8185611882565b95945050505050565b808201808211156117bd576117bd61162f565b818103818111156117bd576117bd61162f565b60008261198957634e487b7160e01b600052601260045260246000fd5b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220ff9eccc903a6416ecd43566de48eed34eca8e12a1f219c3971eb971b80bab2ec64736f6c63430008110033',
  deployedBytecode:
    '0x6080604052600436106100ef5760003560e01c80631c42ce4e146100f4578063276ca3701461011f5780632ff6cee214610141578063304dbd7a1461016157806344ef2d271461018157806364fedff7146101965780636578fcb0146101b65780636958769b146101ee578063715018a61461020e5780637d94792a146102235780638da5cb5b146102475780639d1f54fa1461025c578063a5b6ea8f1461027c578063abc6011d1461028f578063bc197c81146102af578063d7c41c79146102f4578063dc22cb6a14610314578063e73faa2d14610344578063f23a6e611461035a578063f2fde38b14610386575b600080fd5b34801561010057600080fd5b506101096103a6565b6040516101169190611209565b60405180910390f35b34801561012b57600080fd5b5061013f61013a366004611278565b61056a565b005b34801561014d57600080fd5b5061013f61015c3660046112b4565b6106b2565b34801561016d57600080fd5b5061013f61017c3660046112b4565b6106bf565b34801561018d57600080fd5b50610109610750565b3480156101a257600080fd5b5061013f6101b13660046112b4565b610810565b3480156101c257600080fd5b506066546101d6906001600160a01b031681565b6040516001600160a01b039091168152602001610116565b3480156101fa57600080fd5b5061013f610209366004611382565b610877565b34801561021a57600080fd5b5061013f61088b565b34801561022f57600080fd5b50610239606a5481565b604051908152602001610116565b34801561025357600080fd5b506101d661089f565b34801561026857600080fd5b506067546101d6906001600160a01b031681565b61013f61028a3660046112b4565b6108ae565b34801561029b57600080fd5b506065546101d6906001600160a01b031681565b3480156102bb57600080fd5b506102db6102ca366004611459565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610116565b34801561030057600080fd5b5061013f61030f366004611502565b610cff565b34801561032057600080fd5b5061033461032f3660046112b4565b610e66565b6040516101169493929190611568565b34801561035057600080fd5b50610239606b5481565b34801561036657600080fd5b506102db610375366004611593565b63f23a6e6160e01b95945050505050565b34801561039257600080fd5b5061013f6103a13660046115f7565b610ea6565b60606000805b60695481101561040557606981815481106103c9576103c9611619565b600091825260209091206003600490920201015460ff16156103f357816103ef81611645565b9250505b806103fd81611645565b9150506103ac565b506000816001600160401b03811115610420576104206112cd565b60405190808252806020026020018201604052801561045957816020015b6104466111a8565b81526020019060019003908161043e5790505b5090506000805b606954811015610561576069818154811061047d5761047d611619565b600091825260209091206003600490920201015460ff161561054f57606981815481106104ac576104ac611619565b9060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900460ff1660028111156104f3576104f36111d1565b6002811115610504576105046111d1565b81526002820154602082015260039091015460ff161515604090910152835184908490811061053557610535611619565b6020026020010181905250818061054b90611645565b9250505b8061055981611645565b915050610460565b50909392505050565b610572610f1f565b60005b60695481101561060957836069828154811061059357610593611619565b906000526020600020906004020160000154036105f75760405162461bcd60e51b815260206004820152601f60248201527f47617368613a20746f6b656e496420697320616c72656164792065786973740060448201526064015b60405180910390fd5b8061060181611645565b915050610575565b506069604051806080016040528085815260200184600281111561062f5761062f6111d1565b815260208082018590526001604090920182905283548083018555600094855293819020835160049095020193845582015183820180549394939192909160ff191690836002811115610684576106846111d1565b0217905550604082015160028201556060909101516003909101805460ff1916911515919091179055505050565b6106ba610f1f565b606a55565b6106c7610f1f565b60005b60695481101561074c5781606982815481106106e8576106e8611619565b9060005260206000209060040201600001540361073a5760016069828154811061071457610714611619565b60009182526020909120600490910201600301805460ff19169115159190911790555050565b8061074481611645565b9150506106ca565b5050565b60606069805480602002602001604051908101604052809291908181526020016000905b828210156108075783829060005260206000209060040201604051806080016040529081600082015481526020016001820160009054906101000a900460ff1660028111156107c5576107c56111d1565b60028111156107d6576107d66111d1565b8152600282015460208083019190915260039092015460ff1615156040909101529082526001929092019101610774565b50505050905090565b610818610f1f565b60005b60695481101561074c57816069828154811061083957610839611619565b906000526020600020906004020160000154036108655760006069828154811061071457610714611619565b8061086f81611645565b91505061081b565b61087f610f1f565b606861074c82826116e7565b610893610f1f565b61089d6000610f7e565b565b6033546001600160a01b031690565b6000811180156108bf57506103e881105b6109085760405162461bcd60e51b815260206004820152601a60248201527911d85cda184e881c5d585b9d1a5d1e481a5cc81a5b9d985b1a5960321b60448201526064016105ee565b80606b5461091691906117a6565b3410156109615760405162461bcd60e51b815260206004820152601960248201527847617368613a20696e73756666696369656e742066756e647360381b60448201526064016105ee565b6069546000906001600160401b0381111561097e5761097e6112cd565b6040519080825280602002602001820160405280156109a7578160200160208202803683370190505b506069549091506000906001600160401b038111156109c8576109c86112cd565b6040519080825280602002602001820160405280156109f1578160200160208202803683370190505b50905060005b606954811015610a755760698181548110610a1457610a14611619565b906000526020600020906004020160000154838281518110610a3857610a38611619565b6020026020010181815250506000828281518110610a5857610a58611619565b602090810291909101015280610a6d81611645565b9150506109f7565b5060005b83811015610b1e576000610a8c82610fd0565b905060005b606954811015610b095781516069805483908110610ab157610ab1611619565b90600052602060002090600402016000015403610af757838181518110610ada57610ada611619565b602002602001018051809190610aef90611645565b905250610b09565b80610b0181611645565b915050610a91565b50508080610b1690611645565b915050610a79565b5060005b606954811015610c4e576000828281518110610b4057610b40611619565b60200260200101511115610c3c5760655482516001600160a01b0390911690639dbb844d90849084908110610b7757610b77611619565b6020026020010151606b54610b8c91906117a6565b60665486516001600160a01b0390911690879086908110610baf57610baf611619565b6020026020010151868681518110610bc957610bc9611619565b60200260200101516068606760009054906101000a90046001600160a01b03166040518763ffffffff1660e01b8152600401610c099594939291906117c3565b6000604051808303818588803b158015610c2257600080fd5b505af1158015610c36573d6000803e3d6000fd5b50505050505b80610c4681611645565b915050610b22565b50606554604051631759616b60e11b81526001600160a01b0390911690632eb2c2d690610c859030903390879087906004016118bd565b600060405180830381600087803b158015610c9f57600080fd5b505af1158015610cb3573d6000803e3d6000fd5b50505050336001600160a01b03167f54861d6781f670f742928bb4e162f901feafcb62f843c17716ee3d5be674afca8383604051610cf2929190611918565b60405180910390a2505050565b600054610100900460ff1615808015610d1f5750600054600160ff909116105b80610d395750303b158015610d39575060005460ff166001145b610d9c5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016105ee565b6000805460ff191660011790558015610dbf576000805461ff0019166101001790555b610dc761114e565b610dd087610ea6565b606580546001600160a01b038089166001600160a01b031992831617909255606680548884169083161790556067805492871692909116919091179055606a839055606b8290558015610e5d576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b60698181548110610e7657600080fd5b6000918252602090912060049091020180546001820154600283015460039093015491935060ff90811692911684565b610eae610f1f565b6001600160a01b038116610f135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105ee565b610f1c81610f7e565b50565b33610f2861089f565b6001600160a01b03161461089d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105ee565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610fd86111a8565b600080610fe36103a6565b905060005b815181101561102e5781818151811061100357611003611619565b6020026020010151604001518361101a9190611946565b92508061102681611645565b915050610fe8565b50600082424487606a546110429190611959565b60408051602081019490945283019190915260608201526080016040516020818303038152906040528051906020012060001c61107f919061196c565b90506000805b83518110156110f9578381815181106110a0576110a0611619565b602002602001015160400151826110b79190611946565b9150818310156110e7578381815181106110d3576110d3611619565b602002602001015195505050505050919050565b806110f181611645565b915050611085565b5060405162461bcd60e51b815260206004820152602360248201527f47617368613a206661696c656420746f207069636b20612072616e646f6d2062604482015262185b1b60ea1b60648201526084016105ee565b600054610100900460ff166111755760405162461bcd60e51b81526004016105ee9061198e565b61089d600054610100900460ff1661119f5760405162461bcd60e51b81526004016105ee9061198e565b61089d33610f7e565b604080516080810190915260008082526020820190815260006020820181905260409091015290565b634e487b7160e01b600052602160045260246000fd5b6003811061120557634e487b7160e01b600052602160045260246000fd5b9052565b602080825282518282018190526000919060409081850190868401855b8281101561126b5781518051855286810151611244888701826111e7565b50808601518587015260609081015115159085015260809093019290850190600101611226565b5091979650505050505050565b60008060006060848603121561128d57600080fd5b833592506020840135600381106112a357600080fd5b929592945050506040919091013590565b6000602082840312156112c657600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561130b5761130b6112cd565b604052919050565b600082601f83011261132457600080fd5b81356001600160401b0381111561133d5761133d6112cd565b611350601f8201601f19166020016112e3565b81815284602083860101111561136557600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561139457600080fd5b81356001600160401b038111156113aa57600080fd5b6113b684828501611313565b949350505050565b80356001600160a01b03811681146113d557600080fd5b919050565b600082601f8301126113eb57600080fd5b813560206001600160401b03821115611406576114066112cd565b8160051b6114158282016112e3565b928352848101820192828101908785111561142f57600080fd5b83870192505b8483101561144e57823582529183019190830190611435565b979650505050505050565b600080600080600060a0868803121561147157600080fd5b61147a866113be565b9450611488602087016113be565b935060408601356001600160401b03808211156114a457600080fd5b6114b089838a016113da565b945060608801359150808211156114c657600080fd5b6114d289838a016113da565b935060808801359150808211156114e857600080fd5b506114f588828901611313565b9150509295509295909350565b60008060008060008060c0878903121561151b57600080fd5b611524876113be565b9550611532602088016113be565b9450611540604088016113be565b935061154e606088016113be565b92506080870135915060a087013590509295509295509295565b8481526080810161157c60208301866111e7565b836040830152821515606083015295945050505050565b600080600080600060a086880312156115ab57600080fd5b6115b4866113be565b94506115c2602087016113be565b9350604086013592506060860135915060808601356001600160401b038111156115eb57600080fd5b6114f588828901611313565b60006020828403121561160957600080fd5b611612826113be565b9392505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016116575761165761162f565b5060010190565b600181811c9082168061167257607f821691505b60208210810361169257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156116e257600081815260208120601f850160051c810160208610156116bf5750805b601f850160051c820191505b818110156116de578281556001016116cb565b5050505b505050565b81516001600160401b03811115611700576117006112cd565b6117148161170e845461165e565b84611698565b602080601f83116001811461174957600084156117315750858301515b600019600386901b1c1916600185901b1785556116de565b600085815260208120601f198616915b8281101561177857888601518255948401946001909101908401611759565b50858210156117965787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80820281158282048414176117bd576117bd61162f565b92915050565b60018060a01b038616815260006020868184015285604084015260a06060840152600085546117f18161165e565b8060a087015260c0600180841660008114611813576001811461182d5761185b565b60ff1985168984015283151560051b89018301955061185b565b8a6000528660002060005b858110156118535781548b8201860152908301908801611838565b8a0184019650505b505050506001600160a01b03861660808601525091506118789050565b9695505050505050565b600081518084526020808501945080840160005b838110156118b257815187529582019590820190600101611896565b509495945050505050565b6001600160a01b0385811682528416602082015260a0604082018190526000906118e990830185611882565b82810360608401526118fb8185611882565b838103608090940193909352505060008152602001949350505050565b60408152600061192b6040830185611882565b828103602084015261193d8185611882565b95945050505050565b808201808211156117bd576117bd61162f565b818103818111156117bd576117bd61162f565b60008261198957634e487b7160e01b600052601260045260246000fd5b500690565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea2646970667358221220ff9eccc903a6416ecd43566de48eed34eca8e12a1f219c3971eb971b80bab2ec64736f6c63430008110033',
  linkReferences: {},
  deployedLinkReferences: {},
};
