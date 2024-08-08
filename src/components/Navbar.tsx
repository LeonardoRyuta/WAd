import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-indigo-600 text-white h-16">
      <nav className="container mx-auto flex justify-between items-center px-6 h-full">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>WAd</h1>
      </nav>
    </header>
  );
}