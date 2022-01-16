const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "gameId",
				"type": "string"
			}
		],
		"name": "checkWinner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "gameId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string[][]",
				"name": "guess",
				"type": "string[][]"
			}
		],
		"name": "createBet",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "createdBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					},
					{
						"internalType": "string[][]",
						"name": "guess",
						"type": "string[][]"
					}
				],
				"internalType": "struct NFTBet.Bet",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dimensions",
				"type": "uint256"
			},
			{
				"internalType": "string[][]",
				"name": "colors",
				"type": "string[][]"
			},
			{
				"internalType": "string[]",
				"name": "availableColors",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "endsAt",
				"type": "uint256"
			}
		],
		"name": "createGame",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dimensions",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "availableColors",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endsAt",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTBet.GameView",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getGameById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dimensions",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "availableColors",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endsAt",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTBet.GameView",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "gameId",
				"type": "string"
			}
		],
		"name": "getMyBetForGame",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "createdBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					},
					{
						"internalType": "string[][]",
						"name": "guess",
						"type": "string[][]"
					}
				],
				"internalType": "struct NFTBet.Bet",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default abi;