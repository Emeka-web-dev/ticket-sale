import React from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-y-6 ">
      <div className="p-3 grid   mx-auto gap-y-5 ">
        <p className="text-orange-600 font-medium ">
          Best Destinations around the world
        </p>
        <div className=" ">
          <h1 className="text-blue-950 w-full  leading-tight font-bold text-[44px] ">
            Travel, enjoy <br className="hidden md:block" /> and live a new{" "}
            <br /> and full life
          </h1>
        </div>
        <p className="font-medium text-blue-950  ">
          Built Wicket longer admire do barton vanity itself do in it. Preferred
          to sportsmen it engrossed listening. Park gate sell they west hard for
          the.
        </p>
        <div className="flex items-center gap-4">
          <Button className="bg-yellow-600 shadow shadow-yellow-600 text-white w-[170px] !py-6 text-base   ">
            Find out more
          </Button>
          <Button className="bg-transparent hover:bg-transparent shadow-none ">
            <div className="flex gap-2 items-center">
              <div className="!bg-orange-600  shadow-lg shadow-orange-600 w-7 h-7 p-2 rounded-full flex items-center justify-center">
                <Play className="text-white" />
              </div>
              <span className="text-blue-950 capitalize text-base">
                play demo
              </span>
            </div>
          </Button>
        </div>
      </div>
      <div className=" relative min-h-[80vh] ">
        <div className="absolute w-[100px]  h-[100px] top-[20%] z-10 -left-8 ">
          <Image src={"/plane.png"} alt="" className="object-contain" fill />
        </div>
        <div className="relative w-full bg-[url('/Decore.png')] h-[80vh]  bg-no-repeat bg-cover"></div>
        <Image src={"/travel.png"} alt="" className="object-contain" fill />
      </div>
    </div>
  );
};

export default Hero;
