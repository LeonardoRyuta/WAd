"use client";
import { useState } from 'react';
import { useUser, useSmartAccountClient } from '@account-kit/react';
import { AALogin } from '@/components';
import FactoryABI from "../../abi/Factory.json";
import { encodeFunctionData } from 'viem';

export default function User() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const user = useUser();
  const { isLoadingClient, client } = useSmartAccountClient({
    type: "LightAccount",

  });

  const interests = [
    'Sports',
    'Games',
    'Technology',
    'Music',
    'Movies',
    'Travel',
    'Food',
    'Fashion',
    'Fitness',
    'Art',
  ];

  const handleCheckboxChange = (interest: string) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Selected Interests:', selectedInterests);
    pushInterests();
  };

  const pushInterests = async () => {
    console.log("isLoadingClient", isLoadingClient);
    console.log("client", client);

    const uoCallData = encodeFunctionData({
      abi: FactoryABI,
      functionName: 'pushInterest',
      args: [user?.address, selectedInterests],
    });

    const uo = await client?.sendUserOperation({
      uo: {
        target: "0x90E882F10c77af76956e87066A478A379C20759A",
        data: uoCallData,
      },
    });

    const txHash = await client?.waitForUserOperationTransaction(uo!);
    console.log(txHash);
  };


  return (
    <section className="w-full p-4">
      <div className="flex justify-center items-center">
        {
          user ? (
            <div className="bg-white p-8 rounded-xl shadow-lg w-2/5">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Select Your Interests
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Interest Checkboxes */}
                <div>
                  <p className="block text-gray-700 text-sm font-semibold mb-4">
                    What are your interests?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center text-gray-700"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedInterests.includes(interest as never)}
                          onChange={() => handleCheckboxChange(interest)}
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <AALogin />
          )
        }
      </div>
    </section>
  );
}
