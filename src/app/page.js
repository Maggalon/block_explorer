"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

export default function Home() {

  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    if (ethers.isAddress(inputValue)) {
      router.push(`address/${inputValue}`)
    } else {
      router.push(`transaction/${inputValue}`)
    }
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-black text-base p-1 font-bold">FEFU Block Explorer</h1>
      <div className="bg-indigo-500 w-screen text-center text-white text-2xl p-3">
        Blockchain explorer for FEFU Mainnet
      </div>

      <div className="m-5">
        
        <form className="flex items-center w-96 mx-auto">   
            <label for="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <input type="text" 
                       id="simple-search" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       placeholder="Search transaction hash / address" required
                       onChange={val => setInputValue(val.target.value)}
                       value={inputValue} />
            </div>
            <button type="submit" 
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-indigo-500 rounded-lg border border-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    onClick={handleSubmit} >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>

      </div>
    </main>
  );
}
