import { EmbedPay } from "@/components";

export default function Advertiser() {
  return (
    <section className="w-full p-4">
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create your Web3 Ad
          </h2>
          <form className="space-y-4 text-gray-700">
            {/* Ad Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ad Type
              </label>
              <select className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none">
                <option>NFT</option>
                <option>Feed</option>
                <option>Farcaster</option>
              </select>
            </div>

            {/* Ad Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ad Title
              </label>
              <input
                type="text"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your ad title"
              />
            </div>

            {/* Ad Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your ad description"
              ></textarea>
            </div>

            {/* Number of Users */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Number of Users to Reach
              </label>
              <input
                type="number"
                className="block w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter number of users"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
              >
                Create Ad
              </button>
              <EmbedPay />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}