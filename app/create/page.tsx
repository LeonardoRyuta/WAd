"use client";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <section className="py-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-700">
          What are you here for?
        </h2>
        <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700" onClick={() => router.push("create/advertiser")}>
          I&apos;m an Advertiser
        </button>
        <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 ml-4" onClick={() => router.push("create/user")}>
          I&apos;m a User
        </button>
      </div>
    </section>
  );
}