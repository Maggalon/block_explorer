import { ethers } from "ethers";
import tokenJson from '../../token.json'

const rpcUrl = 'http://10.23.26.190:8545'

const getBalance = async (address) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getBalance",
        "params": [address, "latest"],
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

const getTokenBalance = async (tokenAddress, wallet) => {
    const provider = new ethers.JsonRpcProvider(rpcUrl)
    const contract = new ethers.Contract(tokenAddress, tokenJson.abi, provider)
    const res = await contract.balanceOf(wallet)
    return res;
}

export default async function Address({ params }) {

    const balance = await getBalance(params.address)
    const tokenBalance = await getTokenBalance(tokenJson.tokenAddress, params.address)
    console.log(tokenBalance);
    

    return (
        <main className="flex flex-col items-center">
          <h1 className="text-black text-base p-1 font-bold">FEFU Block Explorer</h1>
          <div className="bg-indigo-500 w-screen text-center text-white text-2xl p-3">
            Blockchain explorer for FEFU Mainnet
          </div>
    
          <div className="m-5">
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">Address:</div>
                    <div>{params.address}</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">FEFU Balance:</div>
                    <div>{ethers.formatEther(balance)} FEFU</div>
                </div>
                <div className="flex p-2">
                    <div className="text-indigo-500 mr-2 w-48">MentorsToken Balance:</div>
                    <div>{ethers.formatUnits(tokenBalance, 18)} MNTR</div>
                </div>
            </div>
          </div>
        </main>
      );
}