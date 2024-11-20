import moment from "moment";
import { ethers } from "ethers";

const rpcUrl = 'http://10.23.26.190:8545'

const getTxReceipt = async (hash) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getTransactionReceipt",
        "params": [hash],
        "id": 706970,
        "jsonrpc": "2.0"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(
        rpcUrl,
        requestOptions,
    )
    const resJson = await res.json();
    console.log(`Result: ${resJson.result}`);
    
    return resJson.result;
}

const getBlock = async (hash) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getBlockByHash",
        "params": [hash, false],
        "id": 706970,
        "jsonrpc": "2.0"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(
        rpcUrl,
        requestOptions,
    )
    const resJson = await res.json();
    console.log(`Result: ${resJson.result}`);
    
    return resJson.result;
}

const getTx = async (hash) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getTransactionByHash",
        "params": [hash],
        "id": 706970,
        "jsonrpc": "2.0"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(
        rpcUrl,
        requestOptions,
    )
    const resJson = await res.json();
    console.log(`Result: ${resJson.result}`);
    
    return resJson.result;
}

export default async function Transaction({ params }) {

    const receipt = await getTxReceipt(params.hash)
    const block = await getBlock(receipt.blockHash)
    const tx = await getTx(params.hash)

    return (
        <main className="flex flex-col items-center">
          <h1 className="text-black text-base p-1 font-bold">FEFU Block Explorer</h1>
          <div className="bg-indigo-500 w-screen text-center text-white text-2xl p-3">
            Blockchain explorer for FEFU Mainnet
          </div>
    
          <div className="m-5">
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Transaction hash:</div>
                    <div>{params.hash}</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Status:</div>
                    <div>{receipt.status == '0x1' ? 
                          <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><i className="bi bi-check-circle-fill mr-1"></i>Success</span> : 
                          <span className="bg-red-200 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"><i class="bi bi-x-circle-fill mr-1"></i>Failure</span>}</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Block:</div>
                    <div>{Number(receipt.blockNumber)}</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Timestamp:</div>
                    <div><i className="bi bi-clock mr-1"></i>{moment.unix(block.timestamp).fromNow()}</div>
                </div>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">From:</div>
                    <div>{receipt.from}</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">To:</div>
                    <div>{receipt.to}</div>
                </div>
                <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Value:</div>
                    <div>{ethers.formatEther(tx.value)} FEFU</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Transaction fee:</div>
                    <div>{(parseInt(receipt.effectiveGasPrice) * parseInt(receipt.gasUsed)) / 10**18} FEFU</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Gas price:</div>
                    <div>{parseInt(receipt.effectiveGasPrice) / 10**9} FEFU * 10e-9</div>
                </div>
            </div>
          </div>
        </main>
      );
}