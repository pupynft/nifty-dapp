import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import web3 from 'web3'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftmarketaddress, nftaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/PNFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/PuppyNFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [formInput, updateFormInput] = useState({ price: ''})
  const router = useRouter()
  const [loaded, setLoaded] = useState('not-loaded')
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "binance",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = web3.utils.fromWei(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    console.log('items: ', items)
    setNfts(items)
    setLoaded('loaded')
  }
  if (loaded === 'loaded' && !nfts.length) return (<h1 className="p-20 text-4xl">Sorry you have no NFT assets.</h1>)
  if (loaded === 'not-loaded' && !nfts.length) return (<button onClick={loadNFTs} className="rounded bg-blue-600 py-2 px-12 text-white m-16"> My Assets </button>)

  async function createSale(url) {
  const web3Modal = new Web3Modal({
    rpc: "https://bsc-dataseed.binance.org",
    network: "binance",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

//  let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
//  let transaction = await contract.createToken(url)
//  let tx = await transaction.wait()
//  let event = tx.events[0]
//  let value = event.args[2]
//  let tokenId = value.toNumber()
  const price = web3.utils.toWei(formInput.price, 'ether')

  const listingPrice = web3.utils.toWei('0.0005', 'ether')

let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
let  transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })

  await transaction.wait()
  router.push('/')
}
  return (
    <div className="flex justify-center">
      <div style={{ width: 960 }}>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border p-4 shadow">
                <img src={nft.image} className="rounded" />
                <p className="text-2xl my-4 font-bold">Last Price : {nft.price} BNB</p>
                <p className="text-2xl my-4 font-bold">Sell: {nft.price} BNB* <hr /></p><br />
                <input
                  placeholder="1.5 BNB"
                  className="mt-8 border rounded p-4"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <button onClick={createSale} className="mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
                  List Marketplace
                </button>
                <p className="text-2xl my-4"><i>** You can re-sell/sell your NFT assets at any price after<u> 15 th September 2021</u></i></p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
