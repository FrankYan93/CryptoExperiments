import Web3 from 'web3';

const mainnetBSCURL = 'https://bsc-dataseed1.binance.org:443';
// const testnetBSCURL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const web3 = new Web3(mainnetBSCURL);

const createAccount = () => {
    const account = web3.eth.accounts.create();
    // or recover an account 
    // const account = web3.eth.accounts.privateKeyToAccount("$private-key")
    console.log(account);
}

const readSmartContract = () => {
    const abi = [{"inputs":[{"internalType":"address","name":"_rewards","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"}],"name":"approveStrategy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"approvedStrategies","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"converters","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"earn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"parts","type":"uint256"}],"name":"getExpectedReturn","outputs":[{"internalType":"uint256","name":"expected","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseStrategyTokenGetStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"inCaseTokensGetStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onesplit","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"}],"name":"revokeStrategy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_input","type":"address"},{"internalType":"address","name":"_output","type":"address"},{"internalType":"address","name":"_converter","type":"address"}],"name":"setConverter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_onesplit","type":"address"}],"name":"setOneSplit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewards","type":"address"}],"name":"setRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_split","type":"uint256"}],"name":"setSplit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"}],"name":"setStrategy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_vault","type":"address"}],"name":"setVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"split","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"strategies","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vaults","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"parts","type":"uint256"}],"name":"yearn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const address = '0xeb8f15086274586f95c551890A29077a5b6e5e55'

    const contract = new web3.eth.Contract(abi, address)

    // console.log(contract.methods)
    contract.methods.balanceOf('0xdB8E45c57d70E6c4D4e476b0422997d7E5583361').call((err, result) => { console.log(result) })

    // Get Contract Event Stream
    // contract.getPastEvents(
    //     'AllEvents',
    //     {
    //     fromBlock: 3068079,
    //     toBlock: 'latest'
    //     },
    //     (err, events) => { console.log(events) }
    // )
}

// readSmartContract()


// get latest block number
// web3.eth.getBlockNumber().then(console.log)

// // get latest block
// web3.eth.getBlock('latest').then(console.log)

// get latest 10 blocks
// web3.eth.getBlockNumber().then((latest) => {
//   for (let i = 0; i < 10; i++) {
//     web3.eth.getBlock(latest - i).then(console.log)
//   }
// })

// get transaction from specific block
// const hash = '0xd996bcc5fd8f1953ef36f44094bf13fc35863e66353df1a3e7fdd6c1214ad436'
// web3.eth.getTransactionFromBlock(hash, 2).then(console.log)



// Get average gas price in wei from last few blocks median gas price
// web3.eth.getGasPrice().then((result) => {
//     console.log(web3.utils.fromWei(result, 'ether'))
//   }
// )
  
// Use sha256 Hashing function
// console.log(web3.utils.sha3('something funky'))

// Use keccak256 Hashing function (alias)
// console.log(web3.utils.keccak256('something funky'))

// Get a Random Hex
// console.log(web3.utils.randomHex(32))

// Get access to the underscore JS library
// const _ = web3.utils._
// _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
//     console.log(key)
// })