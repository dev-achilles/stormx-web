import web3Instance from './createWeb3Instance.js'
import abiJson from '../eth/gameAbi.json'

/**
 * 将 wei 值转换为 ether 值
 *
 * @param {string|number|BN} value
 */
const convertWeiToEther = (value) => {
  if (Number.isNaN(Number(value))) {
    return 0
  }
  if (Number(value) === 0) {
    return 0
  }

  let result
  try {
    let integerValue = value
    if (typeof value === 'string') {
      if (value.includes('.')) {
        integerValue = value.substr(0, value.indexOf('.'))
      }
    }
    result = web3Instance.utils.fromWei(integerValue, 'ether')
  } catch (error) {
    result = 0
  }

  return result
}

/**
 * 将 ether 值转换为 wei 值
 *
 * @param {string|number|BN} value
 */
const convertEthToWei = (value) => {
  return web3Instance.utils.toWei(value, 'ether')
}

/**
 * 返回给定 HEX 值的数字表示形式
 *
 * @param {string|HEX} value
 */
const convertHexToNumber = (value) => {
  return web3Instance.utils.hexToNumber(value)
}

/**
 * 返回给定 number 的 hex 表示形式
 *
 * @param {string|number} value
 */
const convertNumberToHex = (value) => {
  return web3Instance.utils.toHex(value)
}

/**
 * 对要传给合约的参数进行编码
 *
 * @param {array} types
 * @param {array} values
 */
const encodeContractFunctionParameters = (types, values) => {
  return web3Instance.eth.abi.encodeParameters(types, values)
}

/**
 * 获取合约函数的 ABI byte string
 *
 * @param {string} functionName
 * @param {string} paramsABIString
 */
const getABIStringOfContract = (functionName, paramsABIString) => {
  return web3Instance.eth.abi.encodeFunctionSignature(functionName) + paramsABIString.substr(2)
}

/**
 * 获取 gas price 单位 wei
 *
 * @returns {Promise} Number string of the current gas price in wei.
 */
const getGasPrice = () => {
  return new Promise(async(resolve) => {
    let result
    try {
      result = await web3Instance.eth.getGasPrice()
      resolve(result)
    } catch (error) {
      resolve('50')
    }
  })
}

/**
 * 获取当前交易预计将会消耗的 gas
 *
 * @param {string} from 用户账户地址
 * @param {string} to 合约地址
 * @param {string} data abi byte string of contract function
 * @param {hex} value
 *
 * @returns {Promise} number 预计交易将会消耗的 gas
 */
const getGasLimit = (from, to, data, value = 0) => {
  return new Promise(async(resolve) => {
    const defaultEstimateGas = 5000000
    let estimateGas

    try {
      setTimeout(() => {
        if (!estimateGas) {
          resolve(defaultEstimateGas)
        }
      }, 10000)
      estimateGas = await web3Instance.eth.estimateGas({ from, to, data, value })
      resolve(estimateGas)
    } catch (error) {
      console.dir(error)
      resolve(defaultEstimateGas)
    }
  })
}

/**
 * 获取指定地址的发送的交易数量 在交易发送时指定 nonce
 *
 * @param {string} publicAddress 用户账户地址
 * @returns {Promise} number 数量
 */
const getTransactionCount = (publicAddress) => {
  return web3Instance.eth.getTransactionCount(publicAddress)
}

/**
 * 获取指定地址的账户余额
 *
 * @param {string} publicAddress 用户账户地址
 * @returns {Promise} number 账户余额
 */
const getUserBalance = (publicAddress) => {
  return web3Instance.eth.getBalance(publicAddress)
}

/**
 * 发送交易
 *
 * @param {object} transactionInfo 交易信息
 * {
 *  from: string,
 *  to?: string,
 *  value?: 0,
 *  gas?: number,
 *  gasPrice?: number,
 *  data?: string,
 *  nonce?: number
 * }
 * @returns {Promise} 交易收据
 */
const sendTransaction = (transactionInfo) => {
  return web3Instance.eth.sendTransaction(transactionInfo)
}

/**
 * 获取块高度
 *
 * @returns {Promise} 最新块的编号
 */
const getBlockHeight = () => {
  return web3Instance.eth.getBlockNumber()
}

/**
 * 获取指定块的信息 默认最新的块
 *
 * @param {string|number} blockHashOrBlockNumber
 */
const getBlock = (blockHashOrBlockNumber = 'latest') => {
  return web3Instance.eth.getBlock(blockHashOrBlockNumber)
}

/**
 * 检查给出的地址是否是一个可用的以太坊地址
 *
 * @param {string} address
 */
const isAddress = (address) => {
  return web3Instance.utils.isAddress(address)
}

const initContract = (address) => {
  return new web3Instance.eth.Contract(abiJson, address)
}

export {
  convertWeiToEther,
  convertEthToWei,
  getABIStringOfContract,
  encodeContractFunctionParameters,
  getGasPrice,
  getTransactionCount,
  convertHexToNumber,
  getGasLimit,
  sendTransaction,
  getUserBalance,
  getBlockHeight,
  getBlock,
  isAddress,
  convertNumberToHex,
  initContract
}
