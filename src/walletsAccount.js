import store from './store'
import web3Instance from './utils/createWeb3Instance'
import { getUserBalance, convertWeiToEther } from './utils/web3'

const desiredNetwork = '1' // '1' is the Ethereum main network ID.

// Detect whether the current browser is ethereum-compatible,
// and handle the case where it isn't:

if (typeof window.ethereum === 'undefined' && window.web3) {
  // alert('Looks like you need a Dapp browser to get started.')
  // alert('Consider installing MetaMask!')
  window.web3.eth.getAccounts(
    (err, accounts) => {
      if (!err) {
        const account = accounts[0]
        store.commit('SET_ACCOUNT', web3Instance.utils.toChecksumAddress(account))
        getUserBalance(web3Instance.utils.toChecksumAddress(account)).then(res => {
          store.commit('SET_BALANCE', convertWeiToEther(res))
        })
      }
    }
  )
} else if (typeof window.ethereum === 'undefined' && typeof window.web3 === 'undefined') {
  // alert('Looks like you need a Dapp browser to get started.')
  // alert('Consider installing MetaMask!')
} else {
  const ethereum = window.ethereum
  // In the case the user has MetaMask installed, you can easily
  // ask them to sign in and reveal their accounts:
  ethereum.enable()

  // Remember to handle the case they reject the request:
    .catch(function(reason) {
      if (reason === 'User rejected provider access') {
      // The user didn't want to sign in!
      } else {
      // This shouldn't happen, so you might want to log this...
        alert('There was an issue signing you in.')
      }
    })

  // In the case they approve the log-in request, you'll receive their accounts:
    .then(function(accounts) {
    // You also should verify the user is on the correct network:
      if (ethereum.networkVersion !== desiredNetwork) {
        // alert('This application requires the main network, please switch it in your MetaMask UI.')

      // We plan to provide an API to make this request in the near future.
      // https://github.com/MetaMask/metamask-extension/issues/3663
      }

      // Once you have a reference to user accounts,
      // you can suggest transactions and signatures:
      const account = accounts[0]
      // this.$store.commit('SET_ACCOUNT', account)
      store.commit('SET_ACCOUNT', web3Instance.utils.toChecksumAddress(account))
      getUserBalance(web3Instance.utils.toChecksumAddress(account)).then(res => {
        store.commit('SET_BALANCE', convertWeiToEther(res))
      })
      // alert(account)
      // sendEtherFrom(account, function(err, transaction) {
      //   if (err) {
      //     return alert(`Sorry you weren't able to contribute!`)
      //   }

      //   alert('Thanks for your successful contribution!')
      // })
    })
}

