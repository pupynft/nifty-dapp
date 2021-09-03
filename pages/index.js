import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import web3 from 'web3'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/PNFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/PuppyNFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loaded, setLoaded] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
   const web3Modal = new Web3Modal({
      network: "binance",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

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
        ipfs: meta.data.fileUrl,
      }
      return item
    }))
    console.log('items: ', items)
    setNfts(items)
    setLoaded('loaded')
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal({
      network: "binance",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
//     const url = `https://ipfs.infura.io/ipfs/${added.path}`
    const price = web3.utils.toWei(nft.price.toString(), 'ether');

    console.log('price: ', price);

    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  if (loaded === 'loaded' && !nfts.length) return (<h1 className="p-20 text-4xl">Sorry you have no NFT assets.</h1>)
  return (
    <div className="flex justify-center">
      <div style={{ width: 1200 }}>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border p-4 shadow">
                <img src={nft.image} className="rounded" />
                <p className="text-2xl my-4 font-bold">Price: {nft.price} BNB</p>
                <button className="bg-blue-600 text-white py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                <p> NFT ID: {nft.tokenId} </p>
                <p> IPFS Proof: {nft.tokenUri}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
