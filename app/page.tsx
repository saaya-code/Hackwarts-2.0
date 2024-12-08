import Image from "next/image";
import logo from "@/public/logo.png";
import magicien from "@/public/fly.png";
import { Button } from "@/components/ui/button";
import { Scroll, Wand } from "lucide-react";
import goldenball from "@/public/goldenball.png";

function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-b from-transparent via-yellow-800 to-yellow-900 overflow-hidden">
      <div className="relative m-5">
        <Image src={logo} alt="Hackwarts logo" />
        <Image
          src={magicien}
          alt="Magicien"
          className="w-40 -top-14 left-1/2  md:w-60 absolute md:-top-20 md:-right-20 invert animate-sinusoidal"
        />
        <div className="w-full flex items-center gap-2 justify-center flex-wrap">
          <Button
            variant="hackwarts"
            className="relative text-md font-semibold"
          >
            <Wand />{" "}
            <Image
              src={goldenball}
              className="w-10 h-10 absolute animate-fly "
              alt="challenge ball flying around the button"
            />
            Start casting magic
          </Button>
          <Button
            variant="hackwarts"
            className="text-md font-bold bg-white text-amber-800"
          >
            <Scroll /> List of challenges
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
