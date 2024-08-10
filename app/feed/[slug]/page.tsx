"use client";
import { useEffect, useState } from 'react';

export default function Ad({ params }: { params: { slug: string } }) {
  const [finished, setFinished] = useState(true); // Set to false to show the video
  const [selectedChain, setSelectedChain] = useState('');

  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Replace with your video URL

  const chains = ['Optimism', 'Base', 'Metal', 'Celo', 'Mode'];

  const handleClaimReward = () => {
    if (selectedChain) {
      console.log(`Claiming reward on ${selectedChain}`);
      // Implement the reward claim logic here
    } else {
      console.log('Please select a chain first');
    }
  };

  // Function to handle the video end event
  const handleVideoEnded = () => {
    console.log("ended");
    setFinished(true);
    // Here you could also trigger a reward mechanism or redirect the user.
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      {
        finished ? (
          <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-gray-800">Claim your reward</h1>
            <p className="text-center text-gray-500 mt-4">Thank you for watching this ad, you can now claim your reward!</p>
            <div className="mt-6">
              <label htmlFor="chain-selector" className="block text-gray-700 font-bold mb-2">
                Select a chain and claim your reward:
              </label>
              <div className="relative inline-block w-full text-gray-700">
                <select
                  id="chain-selector"
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>Select a chain</option>
                  {chains.map((chain) => (
                    <option key={chain} value={chain}>
                      {chain}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z" /></svg>
                </div>
              </div>

              <button
                onClick={handleClaimReward}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 shadow-md"
              >
                Claim Reward
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <video
              id="adVideo"
              className="w-full rounded-lg"
              controls={false} // Disable video controls
              autoPlay
              onEnded={handleVideoEnded}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-center text-gray-500 mt-4">You will be rewarded after watching the full ad.</p>
          </div>
        )
      }
    </div>
  );
}