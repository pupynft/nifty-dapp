### Getting started

The first thing we need to do is write the smart contracts.

The marketplace will consist of two main smart contracts:

- NFT Contract for minting NFTs
- Markeplace contract for facilitating the sale of NFTs

For writing an NFT, we can use the [ERC721](https://eips.ethereum.org/EIPS/eip-721) standard that is available via [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721).

# Digital marketplace on BSC

This is the completed version of the NFT marketplace [workshop](https://github.com/pupynft/nifty-dapp).

## Getting Started

### First, clone the repo and install the dependencies:

```sh
git clone https://github.com/pupynft/nifty-dapp.git

cd nifty-dapp

yarn

# or

npm install
```

### Next, run a local Ethereum node:

```sh
npx hardhat node
```

### Deploy the smart contract to the local node:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

### Running the above command should print out the addresses where the contract was deployed. Edit `config.js` with those values:

```javascript
export const nftaddress = "nft-contract-address"
export const nftmarketaddress = "marketplace-address"
```

### Next, run the development server:

```bash
npm run dev
# or
yarn dev
```
