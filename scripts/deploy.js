const  fs = require('fs-extra');
const JsonRpcProvider = require('@ethersproject/providers');
const Wallet = require('@ethersproject/wallet');


const hre = require("hardhat");


async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("PuppyNFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log("nftMarket deployed to:", nftMarket.address);

  const NFT = await hre.ethers.getContractFactory("PNFT");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
console.log("nft deployed to:", nft.address);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
