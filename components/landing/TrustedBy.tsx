import React from "react";

const TrustedBy = () => {
    const brands = [
    "./bsf.png",
    "./cook.png",
    "./7-eleven-thumb.png",
    "./Indian_Oil_Logo.svg.png",
    "./Hero_MotoCorp-Logo.png",
    "./palm.png",    
    "./illusiontech.png"
  ];
  return (
     <div className="w-full max-w-7xl lg:px-0 md:px-2 sm:px-2 px-2">
      <div className="container mx-auto text-center rounded py-12">
        <div className="flex mx-auto items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm border">
          <span className="text-blue-800">•</span>
          <span className="text-blue-800 font-semibold">We Are Working With</span>
        </div>
        
        <div className="relative mt-8 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex animate-scroll space-x-16">
            {brands.map((brandLogo, index) => (
              <div key={`first-${index}`} className="flex justify-center items-center h-20 w-32 flex-shrink-0">
                <img 
                  height={80} 
                  width={120} 
                  src={brandLogo} 
                  alt={`Brand logo ${index + 1}`}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))}
            {brands.map((brandLogo, index) => (
              <div key={`second-${index}`} className="flex justify-center items-center h-20 w-32 flex-shrink-0">
                <img 
                  height={80} 
                  width={120} 
                  src={brandLogo} 
                  alt={`Brand logo ${index + 1} duplicate`}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TrustedBy;