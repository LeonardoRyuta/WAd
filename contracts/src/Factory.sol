// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Collection.sol";

contract Factory {
    Collection[] public collections;

    event CollectionCreated(address collectionAddress);

    function createNFTAd(
        string memory _baseURI,
        address[] memory targets,
        string memory name,
        string memory symbol
    ) public {
        Collection newCollection = new Collection(
            msg.sender,
            name,
            symbol,
            msg.sender,
            1000
        );

        collections.push(newCollection);

        for (uint i = 0; i < targets.length; i++) {
            newCollection.mintTo(
                targets[i],
                string(abi.encodePacked(_baseURI, i.toString()))
            );
        }

        emit CollectionCreated(address(newCollection));
    }
}
