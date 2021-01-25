import Web3 from 'web3'

const address = 'https://mainnet.infura.io/v3/9541735b70a6497e9a8f1a210603b46c'

// REPLACE HttpProvider
const provider = window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider(address)

const createWeb3Instance = () => new Web3(provider)

const web3Instance = createWeb3Instance()

export default web3Instance
