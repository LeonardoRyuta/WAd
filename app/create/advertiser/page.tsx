"use client";
import { EmbedPay, Toast, VideoUpload } from "@/components";
import React, { useEffect, useState } from "react";
import { useSigner } from "@account-kit/react";
import { createWalletClient, http, parseEther, custom, createPublicClient, type Hash } from 'viem';
import { baseSepolia } from "viem/chains";
import FactoryABI from "../../abi/Factory.json";
import { factoryContractAddress, publicClient, walletClient } from "@/utils";
import { createThirdwebClient } from "thirdweb";
import { upload } from "thirdweb/storage";


export default function Advertiser() {
  const signer = useSigner();
  const [localAccount, setLocalAccount] = useState<any>(null);
  const [selectedChain, setSelectedChain] = useState('');
  const [txHash, setTxHash] = useState<Hash>();
  const [toast, setToast] = useState<any>();
  const [videoFile, setVideoFile] = useState<File>();

  const chains = ['Optimism', 'Base', 'Metal', 'Celo', 'Mode'];
  const [showAdvanced, setShowAdvanced] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    adType: 'NFT',
    chain: '',
    adTitle: '',
    baseURI: '',
    numberOfUsers: '',
    addresses: '',
    symbol: '',
    poolAmount: 0
  });

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  // Function to handle input changes and update formData
  const handleInputChange = (e: any) => {
    console.log("Input Change", e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      if (txHash) {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash
        });
        console.log("Receipt", receipt);
        if (receipt.status == "success") {
          setToast(
            <Toast
              message="Your transaction was successful"
              type="success"
            />
          );

          setTimeout(() => {
            setToast(null);
          }, 5000);
        }
      }
    })();
  }, [txHash]);

  const createNFTAd = async () => {
    console.log("Creating NFT Ad", formData);

    const [address] = await walletClient.getAddresses();
    console.log("Address", address);

    const newHash = await walletClient.writeContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: "createNFTAd",
      account: address,
      args: [
        formData.baseURI,
        formData.addresses.split(',').map(addr => addr.trim()), // Split addresses by commas
        formData.adTitle,
        formData.symbol
      ],
    });

    setTxHash(newHash);

    clearForm();

    console.log("NFT Ad Created");
  }

  const postFeedAd = async () => {
    console.log("Posting Feed Ad");

    const hash = await handleUpload();

    console.log("Video Uploaded", hash);

    const [address] = await walletClient.getAddresses();

    const newHash = await walletClient.writeContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: "postAd",
      account: address,
      args: [hash, formData.adTitle, parseInt(formData.numberOfUsers)],
      value: parseEther(formData.poolAmount.toString()),
    });

    setTxHash(newHash);

    clearForm();

    console.log("Feed Ad Created");
  }

  const clearForm = () => {
    setFormData({
      adType: 'NFT',
      chain: '',
      adTitle: '',
      baseURI: '',
      numberOfUsers: '',
      addresses: '',
      symbol: '',
      poolAmount: 0
    });
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    const newFile = new File([file], "video");

    console.log("file", file);
    console.log("newFile", newFile);
    if (newFile) {
      setVideoFile(newFile);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file to upload.");
      return;
    }

    try {
      const client = createThirdwebClient({ clientId: "216bffc7d046caa6984b935d625a89ba" });

      const uri = await upload({
        client,
        files: [videoFile],
      });

      console.log("Video uri", uri);

      const hash = uri.split("/")[2].split(".")[0]
      return hash;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <section className="w-full p-4">
      {toast}
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create your Web3 Ad
          </h2>
          <form className="space-y-4 text-gray-700">
            {/* Ad Type */}
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-semibold mb-2">
                Ad Type
              </label>
              <select
                name="adType"
                value={formData.adType}
                onChange={handleInputChange}
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
              >
                <option>NFT</option>
                <option>Feed</option>
              </select>

              {/* Chain Selector */}
              <div className="relative inline-block w-full text-gray-700">
                <select
                  name="chain"
                  value={formData.chain}
                  onChange={handleInputChange}
                  className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="" disabled>Select a chain</option>
                  {chains.map((chain) => (
                    <option key={chain} value={chain}>
                      {chain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {
              formData.adType == "Feed" && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Choose Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Eth to put in pool */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Pool Amount
                    </label>
                    <input
                      type="number"
                      name="poolAmount"
                      value={formData.poolAmount}
                      onChange={handleInputChange}
                      className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                      placeholder="Enter amount in ETH"
                    />
                  </div>
                </>
              )
            }

            {/* Ad Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ad Title
              </label>
              <input
                type="text"
                name="adTitle"
                value={formData.adTitle}
                onChange={handleInputChange}
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your ad title"
              />
            </div>

            {/* Number of Users */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Number of Users to Reach
              </label>
              <input
                type="number"
                name="numberOfUsers"
                value={formData.numberOfUsers}
                onChange={handleInputChange}
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter number of users"
              />
            </div>

            {
              formData.adType === 'NFT' && (
                <>
                  {/* Base URI */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Base URI</label>
                    <input
                      type="text"
                      name="baseURI"
                      value={formData.baseURI}
                      onChange={handleInputChange}
                      className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                      placeholder="Enter base URI"
                    />
                  </div>

                  {/* Divider with "Advanced" Label */}
                  <div className="border-t border-gray-300 my-6 relative">
                    <button
                      type="button"
                      className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-2 text-gray-700 font-bold flex items-center"
                      onClick={toggleAdvanced}
                    >
                      Advanced
                      <svg
                        className={`w-4 h-4 ml-2 transform transition-transform ${showAdvanced ? 'rotate-90' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Advanced Options (Initially Hidden) */}
                  {showAdvanced && (
                    <div className="transition-all ease-in-out duration-300">
                      {/* Addresses */}
                      <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">Addresses</label>
                        <textarea
                          name="addresses"
                          value={formData.addresses}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Enter addresses, separated by commas"
                        />
                      </div>

                      {/* Symbol */}
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Symbol</label>
                        <input
                          type="text"
                          name="symbol"
                          value={formData.symbol}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Enter symbol"
                        />
                      </div>
                    </div>
                  )}
                </>
              )
            }


            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
                onClick={(e) => {
                  e.preventDefault();
                  if (formData.adType === 'NFT') {
                    createNFTAd();
                  } else {
                    postFeedAd();
                  }
                }}
              >
                Create Ad
              </button>
              <EmbedPay
                baseURI={formData.baseURI}
                targets={formData.addresses.split(',').map(addr => addr.trim())}
                name={formData.adTitle}
                symbol={formData.symbol}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
