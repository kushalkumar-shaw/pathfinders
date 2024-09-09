import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Mentor Connect Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login" className="text-black">
              Log In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
