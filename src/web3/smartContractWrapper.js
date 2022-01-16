import Moralis from 'moralis';
import abi from './smartContract';

let contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;

let createGame = async (id, dimensions, colors, availableColors, endsAt, address) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.createGame(id, dimensions, colors, availableColors, endsAt).send({from: address});
}

let getGameById = async (gameId) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.getGameById(gameId).call();
}

let getMyBets = async (gameId, address) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.getMyBetForGame(gameId).call({from: address});
}

const createBet = async (gameId, id, guess, address) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.createBet(gameId, id, guess).send({from: address});
}

const checkWinner = async (gameId, address) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.checkWinner(gameId).call({from: address});
}

const getGameGrid = async (gameId, address) => {
	let web3 = await Moralis.enableWeb3();
	const contract = new web3.eth.Contract(abi, contractAddress);
	return contract.methods.getGameAnswer(gameId).call({from: address});
}

export {
	createGame,
	getGameById,
	getMyBets,
	createBet,
	checkWinner,
	getGameGrid
};