import React from "react";

const TrustedBy = () => {

  const brands = [
    "./bsf.png",
    "./cook.png",
    "./7-eleven-thumb.png",
    "./Indian_Oil_Logo.svg.png",
    "./Hero_MotoCorp-Logo.png",
    "./palm.png",    
  ];

  return (
    <div className="w-full max-w-6xl rounded">
        <div className="container mx-auto text-center rounded py-12">

           <div className="flex mx-auto items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm border">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">We Are Working With</span>
            </div>


          <div className="scroll-container group ">
            <div className="scroll-gradient-left  "></div>
            <div className="scroll-gradient-right "></div>
            <div className="scroll-content animate-loop-scroll ">
              {brands.map((brandLogo, index) => (
                <div key={index} className="flex justify-center items-center h-[80px] w-[80px]">
                  <img height={80} width={80} src={brandLogo} alt="logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default TrustedBy;
