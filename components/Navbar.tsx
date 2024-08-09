"use client";

import { useRouter } from 'next/navigation'
import { AALogin } from './AALogin';

export function Navbar() {
  const router = useRouter();

  return (
    <header className="w-full bg-indigo-600 text-white h-16">
      <nav className="container mx-auto flex justify-between items-center px-6 h-full">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => router.push('/')}>WAd</h1>
        <AALogin />
      </nav>
    </header>
  );
}