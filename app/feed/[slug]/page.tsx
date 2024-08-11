"use client";
import { use, useEffect, useState } from 'react';
import { walletClient, publicClient, factoryContractAddress } from '@/utils';
import FactoryABI from "../../abi/Factory.json";
import { Toast, WorldCoin } from '@/components';
import { useUser } from '@account-kit/react';

export default function Ad({ params }: { params: { slug: string } }) {
  const user = useUser();
  const adId = params.slug;
  const [finished, setFinished] = useState(true); // Set to false to show the video
  const [adDetails, setAdDetails] = useState();
  const [hash, setHash] = useState<`0x${string}`>();
  const [toast, setToast] = useState<JSX.Element | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);

  const chains = ['Optimism', 'Base', 'Metal', 'Celo', 'Mode'];

  const hasClaimed = async () => {
    const [address] = await walletClient.getAddresses();

    const data: any = await publicClient.readContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: 'hasClaimed',
      args: [adId, address],
    });

    setClaimed(data);
  }

  const getAdDetails = async () => {
    const data: any = await publicClient.readContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: 'ads',
      args: [adId],
    });

    console.log("data", data)
    setAdDetails(data);
  }

  useEffect(() => {
    getAdDetails();
  }, []);

  useEffect(() => {
    if (user) {
      hasClaimed();
    }
  }, [user]);

  const handleClaimReward = async () => {
    const [address] = await walletClient.getAddresses();

    const newHash = await walletClient.writeContract({
      address: factoryContractAddress,
      abi: FactoryABI,
      functionName: "claimReward",
      account: address,
      args: [adId],
    });

    setHash(newHash);
  };

  // Function to handle the video end event
  const handleVideoEnded = () => {
    console.log("ended");
    setFinished(true);
    // Here you could also trigger a reward mechanism or redirect the user.
  };

  useEffect(() => {
    (async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash
        });
        console.log("Receipt", receipt);
        if (receipt.status == "success") {
          setToast(
            <Toast
              message="Your transaction was successful"
              type="success"
            />
          );

          hasClaimed();

          setTimeout(() => {
            setToast(null);
          }, 5000);
        }
      }
    })();
  }, [hash]);

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      {
        toast && toast
      }
      {
        finished ? (
          <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800">Claim your reward</h1>
            <p className="text-center text-gray-500 mt-4">Thank you for watching this ad, you can now claim your reward!</p>
            <div className="mt-6">
              <WorldCoin />
              {
                claimed ? (
                  <p className="text-center text-gray-500">You have already claimed your reward for this ad.</p>
                ) : (
                  <button
                    onClick={handleClaimReward}
                    className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 shadow-md"
                  >
                    Claim Reward
                  </button>
                )
              }
            </div>
          </div>
        ) : adDetails ? (
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <video
              id="adVideo"
              className="w-full rounded-lg"
              controls={false} // Disable video controls
              autoPlay
              onEnded={handleVideoEnded}
            >
              <source src={`https://gateway.pinata.cloud/ipfs/${adDetails[0]}/video`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-center text-gray-500 mt-4">You will be rewarded after watching the full ad.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
          </div>
        )
      }
    </div>
  );
}