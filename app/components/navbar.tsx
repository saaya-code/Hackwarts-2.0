import React from "react";
import Image from "next/image";
import Link from "next/link";

import { LogIn, Users } from "lucide-react";

import baroqueBorder from "@/public/baroqueborder.png";
import hackwartsLogo from "@/public/logo.png";

import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <div className="fixed z-40 top-0 left-4 right-4 box-border mt-4">
      <nav className="backdrop-blur-md flex items-center justify-between relative w-full h-full py-1 px-6 box-border border-t-2 border-b-2 border-yellow-500 ">
        {/* Baroque border design */}
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute -top-4 -left-2 h-12 w-auto"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
        />

        <div className="relative z-10">
          <Image
            src={hackwartsLogo}
            width={150}
            height={150}
            alt="Hackwarts logo"
          />
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <Button variant="hackwarts" className="bg-amber-600 text-amber-950">
            <LogIn className="w-4 h-4" /> Login
          </Button>
          <Link href="/register">
            <Button variant="hackwarts">
              <Users className="w'4 h-4" />
              Register Team
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
