
import base64url from 'base64url';
import qs from 'qs';
import { Address, beginCell,contractAddress, storeStateInit, toNano } from 'ton';
import { JobContract } from './output/DUCKAJOB_JobContract';
 
(async () => {
// Forming an init package
    let seller = Address.parse('kQAguT6dSS1u3cciZlCsG5Cn1aVnTT9tVWx-iH2uMnsRy-AP');
    let buyer = Address.parse('kQCxPXjtEBNbDeV1EbruV9FIRJsh6FUQ3Z-sE-GqDrzL6kcf');
    let dispute_resolver = Address.parse('kQAguT6dSS1u3cciZlCsG5Cn1aVnTT9tVWx-iH2uMnsRy-AP');

    let contract = Address.parse("");
   
    let init = await JobContract.init(seller, buyer, dispute_resolver, 250n);
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

})();