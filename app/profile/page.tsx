"use client";
import { useUser, useAddPasskey } from '@account-kit/react';
import { Toast } from '@/components';
import { useEffect, useState } from 'react';
import { getNFTs, getAccount } from '@/utils';

export default function Profile() {
  const user = useUser();
  const [toast, setToast] = useState<any>(null);
  const [NFTs, setNFTs] = useState<any>([])
  const [accountInfo, setAccountInfo] = useState<any>(null);

  const { addPasskey, isAddingPasskey, error } = useAddPasskey({
    onSuccess: (authenticatorIds) => {
      // [optional] Do something with the authenticatorIds
      console.log("success", authenticatorIds);
      setToast(<Toast message="Passkey created successfully" type='success' />);
    },
    onError: (error) => {
      // [optional] Do something with the error
      console.log("error", error);
      setToast(<Toast message="Failed to create passkey" type='error' />);
    },
    // [optional] ...additional mutationArgs
  });

  useEffect(() => {
    console.log("isAddingPasskey", isAddingPasskey);
    console.log("error", error);
  }, [addPasskey, isAddingPasskey, error]);

  useEffect(() => {
    if (user) {
      (async () => {
        const nfts = await getNFTs(user.address);
        console.log(nfts);
        setNFTs(nfts.items);

        const account = await getAccount(user.address);
        console.log("account info", account);
        setAccountInfo(account);
      })();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Profile Information Card */}
      {
        toast && toast
      }
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          {/* Create Passkey Button */}
          <button
            onClick={() => addPasskey}
            className=" bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 shadow-md"
          >
            Create Passkey
          </button>
        </div>
        <p className="text-gray-600 mb-2">
          <strong>Address:</strong> {user?.address}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Balance:</strong> {(parseInt(accountInfo?.coin_balance) / 10 ** 18).toFixed(4)} ETH
        </p>
      </div>

      <div className="mt-4 w-full">
        {/*NFT Display*/}
        <div className="bg-white shadow-md rounded-lg p-8 w-96 w-full">
          <h1 className="text-2xl font-bold text-gray-800">NFTs</h1>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {
              NFTs.map((nft: any) => nft.image_url && (
                <div key={nft.token.address} className="bg-gray-200 rounded-lg p-4">
                  <h1 className="text-xl font-bold text-gray-800">{nft.token.name}</h1>
                  <img
                    src={nft.image_url || "https://via.placeholder.com/150"}
                    alt={nft.token.name}
                    className="w-full mt-4"
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}