# Web3 Advertisments (WAd)

This project is a Web3-based advertising platform that allows advertisers to create and distribute ads on the blockchain. The platform enables the creation of both NFT-based ads and feed-based ads, utilizing IPFS for decentralized storage of media files. Users can claim rewards from ad pools, which are distributed based on parameters set by the advertisers.

## Table of Contents

- [Features](#features)
- [Smart Contracts](#smart-contracts)
- [Frontend Application](#frontend-application)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **NFT Ads**: Advertisers can create NFT-based ads that are distributed to specific addresses.
- **Feed Ads**: Advertisers can post feed ads with associated reward pools for user engagement.
- **IPFS Integration**: Ads are stored on IPFS, ensuring decentralized and immutable storage.
- **Reward Distribution**: Advertisers can set up ETH pools that are distributed as rewards to users who engage with the ads.
- **Blockchain Integration**: The platform is built on the OP Stack using smart contracts.

## Smart Contracts

The smart contracts manage ad creation, reward distribution, and user interactions.

### Factory Contract

The `Factory` contract handles:

- **Ad Creation**: Creating and managing NFT and feed ads.
- **Reward Pools**: Managing reward distribution based on ad interactions.
- **User Interests**: Storing and retrieving user interests.
- **IPFS Hash Management**: Storing and retrieving IPFS hashes for ads.

#### Key Functions

- `createNFTAd(string _baseURI, address[] memory targets, string memory name, string memory symbol)`: Creates an NFT-based ad and distributes it to target addresses.
- `postAd(string memory _ipfsHash, uint256 _splitCount)`: Posts a feed ad with an associated ETH pool.
- `claimReward(uint256 adId)`: Allows users to claim rewards from an ad's pool.
- `getAdDetails(uint256 adId)`: Returns details of a specific ad.
- `getAllAds()`: Returns details of all ads, including title, IPFS hash, and reward pool info.

## Frontend Application

The frontend is built with **React** and **TailwindCSS**, providing a user-friendly interface for advertisers and users. It includes:

- **Ad Creation Form**: Allows advertisers to create ads, with an advanced section for additional options.
- **Feed Page**: Displays a series of ad thumbnails that users can click to watch and earn rewards.
- **Ad Viewing Page**: Shows the selected ad video, which users must watch to completion to claim rewards.
- **Chain Selector**: Allows users to select their preferred blockchain to claim rewards.

## Installation

To install and run this project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LeonardoRyuta/WAd.git
   cd WAd
   ```
   
2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **Start the developmnet server**:
   ```bash
   npm run dev
   ```

