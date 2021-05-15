import * as StellarSdk from "stellar-sdk";
import StellarBase from "stellar-base";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
const passphrase = StellarBase.Networks.TESTNET;
// const MasterKey = StellarSdk.Keypair.master(passphrase);
const MasterKey = StellarSdk.Keypair.fromSecret(
  "SB5NPWWD3E2CQOQWGZWA5SG7MGLTXASCF5XB7I252KZDJYN7BFMTG4N7"
);

const pair1 = StellarSdk.Keypair.fromSecret(
  "SAXJNBGTBYROKEXV4UYGASRX6UTD7YZEX7PCTU7ZZXXWTVRXTPKSG4Z6"
);

// const pair1 = StellarSdk.Keypair.random();

// print all keys in console
const MasterSecret = MasterKey.secret();
const MasterPublicKey = MasterKey.publicKey();
console.log("Master Account", MasterSecret, MasterPublicKey);
var SecretKey1 = pair1.secret();
var PublicKey1 = pair1.publicKey();
console.log("Account1", SecretKey1, PublicKey1);

(async function main() {
  const account = await server.loadAccount(MasterPublicKey);

  console.log("Balances for account: " + MasterPublicKey);
  account.balances.forEach(function (balance) {
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  });

  const fee = await server.fetchBaseFee();
  console.log(fee);

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee,
    networkPassphrase: passphrase,
  })
    .addOperation(
      StellarSdk.Operation.createAccount({
        destination: PublicKey1,
        startingBalance: "1000",
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(MasterKey);
  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("transactionResult", transactionResult);
    const account1 = await server.loadAccount(PublicKey1);
    console.log(account1);
    console.log("Balances for account: " + PublicKey1);
    account1.balances.forEach(function (balance) {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
  } catch (err) {
    console.error(err.response);
    console.log("error happened");
  }
})();
