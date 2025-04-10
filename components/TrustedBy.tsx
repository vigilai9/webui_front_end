import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import BSF_LOGO from "../public/BSF_Logo.svg.png"

import { SiSuzuki } from "react-icons/si";
import { SiHyundai } from "react-icons/si";
import { SiRenault } from "react-icons/si";
import { SiHonda } from "react-icons/si";
import { SiTata } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiJeep } from "react-icons/si";
import { SiMg } from "react-icons/si";
import { TbBrandToyota } from "react-icons/tb";
import { SiKia } from "react-icons/si";
import { SiMahindra } from "react-icons/si";
import { SiVolvo } from "react-icons/si";
import { SiLandrover } from "react-icons/si";
import { SiJaguar } from "react-icons/si";
import { SiAudi } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { SiMercedes } from "react-icons/si";


const TrustedBy = () => {

  const brands = [
        <SiSuzuki key={1} size={"4rem"} color="#686D76" />,
        <SiHyundai key={1} size={"4rem"} color="#686D76" />,
        <SiRenault key={1} size={"4rem"} color="#686D76" />,
        <SiHonda key={1} size={"4rem"} color="#686D76" />,
        <SiTata key={1} size={"4rem"} color="#686D76" />,
        <SiTata key={1} size={"4rem"} color="#686D76" />,
        <SiFord key={1} size={"4rem"} color="#686D76" />,
        <SiJeep key={1} size={"4rem"} color="#686D76" />,
        <SiMg key={1} size={"4rem"} color="#686D76" />,
        <TbBrandToyota key={1} size={"4rem"} color="#686D76" />,
        <SiKia key={1} size={"4rem"} color="#686D76" />,
        <SiMahindra key={1} size={"4rem"} color="#686D76" />,
        <SiVolvo key={1} size={"4rem"} color="#686D76" />,
        <SiLandrover key={1} size={"4rem"} color="#686D76" />,
        <SiJaguar key={1} size={"4rem"} color="#686D76" />,
        <SiAudi key={1} size={"4rem"} color="#686D76" />,
        <SiBmw key={1} size={"4rem"} color="#686D76" />,
        <SiMercedes key={1} size={"4rem"} color="#686D76" />,
  ];

  return (
    <div className="w-full max-w-5xl rounded-2xl mt-12 bg-linear-to-t/increasing from-gray-100  to-gray-100">
      <section className="grid-background pt-12 pb-20 px-4 rounded-2xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
               We are working with.
          </h1>
        
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 ">
            Create beautiful images in seconds with advanced AI image generator.
            Perfect for artists, designers, and creators.
          </p>
          

<div className="scroll-container group">
  <div className="scroll-gradient-left"></div>
  <div className="scroll-gradient-right"></div>

  <div className="scroll-content animate-loop-scroll">
    {brands.map((brandLogo, index) => (
      <div key={index} className="flex justify-center items-center">
        {brandLogo}
      </div>
    ))}
  </div>
</div>


        </div>
      </section>
    </div>
  );
};

export default TrustedBy;
