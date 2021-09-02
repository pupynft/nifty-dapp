// SPDX-License-Identifier: MIT

/**
 * :=========;_                                                                                      +====.     .====     +===========: .================
 * :+=+=+=+=====.                                                                                    +=+=+;     .=+=+     +=+=+=+=+=+=: .+=+=+=+=+=+=+=+=
 * :=+==+==+=+===.                                                                                   ++===+.    .==+=     ++===+=+=+=+. .=+==+==+=+=+=+=+
 * :+==+----==+=+;                                                                                  .==+=+==    .=+==.   .==+=;-------   ------+===:-----
 * :+=+=     ==+==   ._._.     _.__    ..__.  _===_      ..__.  _===_     _.__       _.__            +=+====.   .=+=+     +=+=:               .+=+=.     
 * :====     :+==+.  .=+==    .====    .====.=======.    .====.=======.   :+==:     .====            +=+==+==   .====     +=+=:               .=+=+.     
 * :+=+=     :==+=   :====     =+=+    .+=+====+=+===    .+=+====+=+===   .====     :+=+:            |===:=+=:  .=+=+     |===:               .====.     
 * :+===     ==+==   :=+==    .====    .+====-  -+=+=:   .+====-  -+=+=:   ==+=.    ==+=             +==+.====  .=+==.    +==+========        .=+=+.     
 * :=+==____==+===   .+===     +=+=    .+=+=:    =====   .+=+=:    =====   -==+;   .+==;             +=+=  +==: .==+=.    +=+==+=++=+=        .==+=.     
 * :+==+=====+==+    :==+=    .===+    .+==+     .=+==   .+==+     .=+==    =+==   :+=+.            .+==+. :=+= .+==+    .+===+=+===+=        .=+==.     
 * :+=+=====+===`    :==+;     =+==    .+===     .==+=.  .+===     .==+=.   :==+:  =+==              +=+=.  +=+;.=+==     +=+=;-------        .==+=.     
 * :===+=+=+=:-      .+==;     +=+=    .+=+=     .=+==.  .+=+=     .=+==.    +=== .+==;              +===.  :===.+=+=.    +==+:               .=+==.     
 * :+=+=             :=+==    .+==+    .+===     .===+   .+===     .===+     :+=+.===+               ++=+.   =+=++==+     ++==:               .==+=.     
 * :+===             :====    :=+==    .+==+.    :=+==   .+==+.    :=+==     .========              .==+=.   :==+==+=    .==+=:               .=+==.     
 * :=+==             .==+=:  .+=+=+    .+=+=;    ===+;   .+=+=;    ===+;      ==+===+`               +===.    ====+==.    +=+=:               .==+=.     
 * :+===              +==+==+++====    .+===+;__=+=+=`   .+===+;__=+=+=`      .===+==                ++=+.    -=+=+=+     +=+=:               .=+==.     
 * :+=+=              :=+==+==-+=+=    .+===:=====+=:    .+===:=====+=:        =+=+=;                +=+=.     ==+===     |===:               .==+=.     
 * :====               :+=+==`.===+    .+=+= -+=+==-     .+=+= -+=+==-         :====`               .+===.     .===+=.    +==+:               .=+==.     
 *                       ---           .+===   ---       .+===   ---            +=+=                                                                     
 *                                     .+===             .+===                 :===`                                                                     
 *                                     .+=+=             .+=+=              _.;==+=                                                                      
 *                                     .+===             .+===              ==+===`                                                                      
 *                                     .+===             .+===              =+==+- 
 */                                                                      

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract PNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Puppy NFT", "PNFT") {
        contractAddress = marketplaceAddress;
    }
    bytes32 private constant DOMAIN_SALT = 0x4e621494881f38baf5be3f5cea59349b7fb9ba568d85e7ac80d99bc02f033980; // Puppy static  salt
    bytes32 private constant DOMAIN_NAME_HASH = keccak256("Puppy Token");
    
    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
        
     function uniqueIdentifier(string memory DOMAIN_SALT) public view returns (string memory){
     return DOMAIN_SALT;
     }

}
