// import { beginCell, contractAddress, toNano } from "ton";
// import { testAddress } from "ton-emulator";
// import { SampleJobContract } from "./output/sample_JobContract";
// import { deploy } from "./utils/deploy";
// import { printAddress, printDeploy, printHeader } from "./utils/print";

// (async () => {

//     // Parameters
//     let owner = testAddress('some-owner'); // Replace owner with your address
//     let packed = beginCell().store(storeAdd({ $$type: 'fund_Project', amount: 10n })).endCell(); // Replace if you want another message used
//     let init = await SampleJobContract.init(owner);
//     let address = contractAddress(0, init);
//     let deployAmount = toNano(10);
//     let testnet = true;

//     // Print basics
//     printHeader('SampleTactContract');
//     printAddress(address);
//     // printDeploy(init, deployAmount, packed, testnet);
    
//     // Do deploy
//     await deploy(init, deployAmount, packed, testnet)
// })();

import base64url from 'base64url';
import qs from 'qs';
import { Address, beginCell,contractAddress, storeStateInit, toNano } from 'ton';
import { JobContract } from './output/sample_JobContract';
 
// Forming an init package
let seller = Address.parse('kQAguT6dSS1u3cciZlCsG5Cn1aVnTT9tVWx-iH2uMnsRy-AP');
let buyer = Address.parse('kQCxPXjtEBNbDeV1EbruV9FIRJsh6FUQ3Z-sE-GqDrzL6kcf');
let dispute_resolver = Address.parse('some-address');

let init = await JobContract.init(seller, buyer, dispute_resolver);
let testnet = true;
 
// Contract address
let address = contractAddress(0, init);
 
// Amount of TONs to attach to a deploy message
let deployAmount = toNano('0.5');
 
// Create string representation of an init package
let initStr = base64url(beginCell()
        .store(storeStateInit(init))
        .endCell()
        .toBoc({ idx: false }));
 
// Create a deploy link
console.log(`ton://transfer/` + address.toString({ testOnly: testnet }) + "?" + qs.stringify({
    text: 'Deploy',
    amount: deployAmount.toString(10),
    init: initStr
}));