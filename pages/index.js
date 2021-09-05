import {
  nftaddress, nftmarketaddress
} from '../config';
import NFT from '../artifacts/contracts/NFT.sol/PNFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/PuppyNFTMarket.json';
import { ethers } from 'ethers';
import { useState, useEffect } from "react"; // React state management
// import styles from "../styles/pages/Home.module.scss"; // Component styles
import { providers } from "ethers"; // Ethers
import { createContainer } from "unstated-next"; // Unstated-next containerization
import web3 from 'web3'
import axios from 'axios';
import Web3Modal from "web3modal";




export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loaded, setLoaded] = useState('not-loaded');
  useEffect(() => {
    loadNFTs()
  }, [])
async function loadNFTs() {
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed2.binance.org', 56)
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
        name: meta.data.name,
        desp: meta.data.description,
        ipfsUrl: meta.data.image,
        metaData: tokenUri,
      }
      return item
    }))
    console.log('items: ', items)
    setNfts(items)
    setLoaded('loaded')
  }
  async function buyNft(nft) {

  const web3Modal = new Web3Modal({
  rpc: "https://bsc-dataseed2.binance.org",
  network: "binance",
  cacheProvider: true,
    });
const connection = await web3Modal.connect()
const provider = new ethers.providers.Web3Provider(connection)
const signer = provider.getSigner()
const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
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
        <div className="grid grid-cols-4 gap-4 pt-8">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border p-4 shadow">
                <p className="text-2xl my-4 font-bold"> {nft.name} </p> <hr /><br />
                <img src={nft.image} className="rounded" width="200" height="220"/>
                <p className="text-2xl my-4 font-bold">Price: {nft.price} BNB </p>
                <p> NFT ID: <b> {nft.tokenId} </b> </p>
                <p> Description: <b> {nft.desp} </b> </p>
                <p> IPFS Proof: <a href = {nft.ipfsUrl} target="_blank"><b>IPFS Link</b></a></p>
                <p> Metadata: <a href = {nft.metaData} target="_blank"><b>Metadata Link</b></a></p><br />
                <button className="bg-blue-600 text-white py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>

              </div>
            ))
          }
        </div>
        <br /><br />
      </div>
    </div>
  )
}

