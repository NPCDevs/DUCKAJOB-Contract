import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV4, TonClient, fromNano, Address } from "ton";

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "unfold sugar water ..."; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  let me = Address.parse('kQAguT6dSS1u3cciZlCsG5Cn1aVnTT9tVWx-iH2uMnsRy-AP');
  // query balance from chain
  const balance = await client.getBalance(me);
  console.log("balance:", fromNano(balance));

  // query seqno from chain
//   const walletContract = client.open(wallet);
//   const seqno = await walletContract.getSeqno();
//   console.log("seqno:", seqno);
}

//main();
