"use client";

import { useRouter } from 'next/navigation'
import { AALogin } from './AALogin';

export function Navbar() {
  const router = useRouter();

  return (
    <header className="w-full bg-indigo-600 text-white h-16">
      <nav className="container mx-auto flex justify-between items-center px-6 h-full">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => router.push("/")}>WAd</h1>
        <div className="flex">
          <AALogin />
          <button onClick={() => router.push("/profile")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header >
  );
}