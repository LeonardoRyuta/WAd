// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Collection.sol";
import "contracts/lib/Strings.sol";
import "./TokenTransferor.sol";

contract Factory is TokenTransferor {
    using Strings for uint256;

    address[] private collections;

    struct Ad {
        string ipfsHash;
        string title;
        uint256 pool;
        uint256 splitCount;
        uint256 claimedCount;
    }

    mapping(address => string[]) public interests;
    mapping(uint256 => Ad) public ads;
    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    uint256 public adCount;

    event CollectionCreated(address collectionAddress);
    event AdPosted(
        uint256 adId,
        string ipfsHash,
        string title,
        uint256 pool,
        uint256 splitCount
    );
    event RewardClaimed(address user, uint256 amount);

    constructor(
        address _router,
        address _link
    ) TokenTransferor(_router, _link) {}

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
            newCollection.mintTo(targets[i], _baseURI);
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

    function postAd(
        string memory _ipfsHash,
        string memory _title,
        uint256 _splitCount
    ) public payable {
        require(msg.value > 0, "Must send ETH to fund the pool");
        require(_splitCount > 0, "Split count must be greater than 0");

        Ad storage newAd = ads[adCount];
        newAd.ipfsHash = _ipfsHash;
        newAd.title = _title;
        newAd.pool = msg.value;
        newAd.splitCount = _splitCount;
        newAd.claimedCount = 0;

        emit AdPosted(adCount, _ipfsHash, _title, msg.value, _splitCount);

        adCount++;
    }

    function claimReward(uint256 adId) public {
        Ad storage ad = ads[adId];
        require(ad.claimedCount < ad.splitCount, "All rewards claimed");
        require(!hasClaimed[adId][msg.sender], "Reward already claimed");

        uint256 reward = ad.pool / ad.splitCount;

        hasClaimed[adId][msg.sender] = true;
        ad.claimedCount++;

        (bool success, ) = msg.sender.call{value: reward}("");
        require(success, "Failed to send reward");

        emit RewardClaimed(msg.sender, reward);
    }

    function getAdDetails(
        uint256 adId
    )
        public
        view
        returns (
            string memory ipfsHash,
            string memory title,
            uint256 pool,
            uint256 splitCount,
            uint256 claimedCount
        )
    {
        Ad storage ad = ads[adId];
        return (ad.ipfsHash, ad.title, ad.pool, ad.splitCount, ad.claimedCount);
    }

    function getAdIdByIPFSHash(
        string memory _ipfsHash
    ) public view returns (uint256) {
        for (uint256 i = 0; i < adCount; i++) {
            if (
                keccak256(abi.encodePacked(ads[i].ipfsHash)) ==
                keccak256(abi.encodePacked(_ipfsHash))
            ) {
                return i;
            }
        }
        revert("Ad not found for the given IPFS hash");
    }

    function getAllAds()
        public
        view
        returns (
            string[] memory ipfsHashes,
            string[] memory titles,
            uint256[] memory pools,
            uint256[] memory splitCounts,
            uint256[] memory claimedCounts
        )
    {
        ipfsHashes = new string[](adCount);
        titles = new string[](adCount);
        pools = new uint256[](adCount);
        splitCounts = new uint256[](adCount);
        claimedCounts = new uint256[](adCount);

        for (uint256 i = 0; i < adCount; i++) {
            Ad storage ad = ads[i];
            ipfsHashes[i] = ad.ipfsHash;
            titles[i] = ad.title;
            pools[i] = ad.pool;
            splitCounts[i] = ad.splitCount;
            claimedCounts[i] = ad.claimedCount;
        }

        return (ipfsHashes, titles, pools, splitCounts, claimedCounts);
    }
}
