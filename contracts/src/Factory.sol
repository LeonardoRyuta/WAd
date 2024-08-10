// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Collection.sol";
import "contracts/lib/Strings.sol";

contract Factory {
    using Strings for uint256;
    address[] private collections;

    mapping(address => string[]) public interests;

    event CollectionCreated(address collectionAddress);

    function createNFTAd(
        string memory _baseURI,
        address[] memory targets,
        string memory name,
        string memory symbol
    ) public {
        Collection newCollection = new Collection(
            address(this),
            name,
            symbol,
            msg.sender,
            1000
        );

        collections.push(address(newCollection));

        for (uint i = 0; i < targets.length; i++) {
            newCollection.mintTo(
                targets[i],
                string(abi.encodePacked(_baseURI, i.toString()))
            );
        }

        emit CollectionCreated(address(newCollection));
    }

    function getCollections() public view returns (address[] memory) {
        return collections;
    }

    function getInterestsByUser(
        address _user
    ) public view returns (string[] memory) {
        return interests[_user];
    }

    function pushInterest(address _user, string[] memory _interests) public {
        interests[_user] = _interests;
    }
}
