import { useNavigate } from "react-router-dom";

export function Create() {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-700">
          What are you here for?
        </h2>
        <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700" onClick={() => navigate("/create/advertiser")}>
          I'm an Advertiser
        </button>
        <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 ml-4" onClick={() => navigate("/create/user")}>
          I'm a User
        </button>
      </div>
    </section>
  );
}