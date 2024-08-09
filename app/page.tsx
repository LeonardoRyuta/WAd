"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Revolutionize Digital Advertising with Web3
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Create and distribute targeted web3 ads directly to interested users. Empowering user control, transparency, and engagement in advertising!
          </p>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700" onClick={() => router.push("create/advertiser")}>
            I&apos;m an Advertiser
          </button>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 ml-4" onClick={() => router.push("create/user")}>
            I&apos;m a User
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 text-gray-600">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-2">Features</h3>
          <div className="flex flex-wrap justify-center">
            <div className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-2">NFT Ads</h4>
              <p className="mb-4">
                Create targeted ad NFTs, set your audience, and distribute with ease. Pay gas fees and reach your ideal audience.
              </p>
            </div>
            <div className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-2">Feed Ads</h4>
              <p className="mb-4">
                Post an ad on our feed, receive ads that matter to you, and earn rewards for engaging with ads.
              </p>
            </div>
            <div className="max-w-sm m-4 p-6 bg-white rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-2">Farcaster Ads</h4>
              <p className="mb-4">
                Create and send ads to users directly through Farcaster. Users can receive ads without sharing personal data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto text-center text-white px-6">
          <h3 className="text-3xl font-semibold mb-4">Join WAd Today</h3>
          <p className="text-lg mb-8">
            Sign up now to start creating and distributing ad NFTs, or onboard to receive ads that matter to you.
          </p>
          <button className="bg-white text-indigo-600 py-2 px-6 rounded-full hover:bg-gray-200" onClick={() => router.push("create")}>
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
