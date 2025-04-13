import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 6,
    y: -6,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface VideoFile extends File {
  preview?: string;
  estimatedTime?: string;
}

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
   const [files, setFiles] = useState<VideoFile[]>([]);
   const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = Array.from(event.target.files || []);
    const newVideos = files.map((file) => {
      const videoFile = file as VideoFile;
      videoFile.preview = URL.createObjectURL(file);
      videoFile.estimatedTime = calculateEstimatedTime(file.size);
      return videoFile;
    });

    setFiles((prev) => [...prev, ...newVideos]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeVideo=(index:number)=>{
   setFiles((prev)=>{
       let newFiles = [...prev];
       URL.revokeObjectURL(newFiles[index].preview!);
       newFiles.splice(index, 1);
       return newFiles;
   })
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const calculateEstimatedTime = (fileSize: number): string => {
    // Assuming average upload speed of 1MB/s
    const uploadSpeedMbps = 1;
    const fileSizeMB = fileSize / (1024 * 1024);
    const estimatedSeconds = fileSizeMB / uploadSpeedMbps;

    if (estimatedSeconds < 60) {
      return `${Math.ceil(estimatedSeconds)} seconds`;
    } else if (estimatedSeconds < 3600) {
      return `${Math.ceil(estimatedSeconds / 60)} minutes`;
    } else {
      return `${Math.ceil(estimatedSeconds / 3600)} hours`;
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    // onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {files.length > 0 && (
        <>
        <div className="uploadslider flex overflow-x-auto gap-6 max-w-5xl mx-auto">
          {files.map((video, index) => (
            <div
              key={`${video.name}-${index}`}
              className="flex min-w-[30%] items-center justify-between p-2 bg-white border border-gray-200 rounded-lg shadow-2xl mb-2"
            >
              <div className="flex items-center space-x-4">
                <video className="w-24 h-16 object-cover rounded">
                  <source src={video.preview} type={video.type} />
                </video>
                <div>
                  <div className="flex gap-8 justify-between items-center">
                     <p className="font-medium truncate max-w-xs">{video.name.length>14 ? `${video.name.slice(0,14)}...` : video.name }</p>
                     <button
                        onClick={() => removeVideo(index)}
                        className=" hover:bg-gray-100 rounded-full cursor-pointer"
                      >
                         <X className="w-5 h-5 text-gray-500" />
                     </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Size: {(video.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <p className="text-sm text-gray-500">
                     Upload time: {video.estimatedTime}
                  </p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        </>
      )} 
              
    <div className="flex mx-auto mt-8 max-w-5xl flex-col items-center justify-center w-full bg-gray-100 rounded" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-6 group/file block rounded cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload videos
          </p>
          <p className="relative z-20 font-sans font-normal text-gray-500 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full max-w-xl mx-auto">
             
            <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-24 mt-4 w-full max-w-[6rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
            </motion.div>
          
            <motion.div
              variants={secondaryVariant}
              className="absolute opacity-0 border border-dashed border-sky-500 inset-0 z-30 bg-transparent flex items-center justify-center h-24 mt-4 w-full max-w-[6rem] mx-auto rounded-md"
            ></motion.div>
          
          </div>
        </div>
      </motion.div>
    </div>

    <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="flex items-center justify-center gap-4 mt-4 max-w-5xl mx-auto"
        >
          <Button size={'lg'} variant={'default'} className="rounded">
              Upload
          </Button>
          <Button size={'lg'} variant={'destructive'} className="rounded">
              Canel
          </Button>
     </motion.div>

    <div className="flex mx-auto mt-8 max-w-5xl flex-col items-center justify-center w-full border-2 border-gray-300 rounded">
        <Input placeholder="Write your query here....."  className="rounded "/>
    </div>
     
  </>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-200 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}






 {/* {files.length > 0 &&
              files.map((file, idx) => (
                <div>

                  <video
                   src={URL.createObjectURL(file)}
                   controls
                   className="rounded-lg w-[150px] h-full object-cover"
                 />
                </div>
              ))} */}



// import React, { useState, useRef } from 'react';
// import { X, Upload } from 'lucide-react';

// interface VideoFile extends File {
//   preview?: string;
//   estimatedTime?: string;
// }

// export const VideoUpload: React.FC = () => {
//   const [selectedVideos, setSelectedVideos] = useState<VideoFile[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const calculateEstimatedTime = (fileSize: number): string => {
//     // Assuming average upload speed of 1MB/s
//     const uploadSpeedMbps = 1;
//     const fileSizeMB = fileSize / (1024 * 1024);
//     const estimatedSeconds = fileSizeMB / uploadSpeedMbps;

//     if (estimatedSeconds < 60) {
//       return `${Math.ceil(estimatedSeconds)} seconds`;
//     } else if (estimatedSeconds < 3600) {
//       return `${Math.ceil(estimatedSeconds / 60)} minutes`;
//     } else {
//       return `${Math.ceil(estimatedSeconds / 3600)} hours`;
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     const newVideos = files.map((file) => {
//       const videoFile = file as VideoFile;
//       videoFile.preview = URL.createObjectURL(file);
//       videoFile.estimatedTime = calculateEstimatedTime(file.size);
//       return videoFile;
//     });

//     setSelectedVideos((prev) => [...prev, ...newVideos]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const removeVideo = (index: number) => {
//     setSelectedVideos((prev) => {
//       const newVideos = [...prev];
//       URL.revokeObjectURL(newVideos[index].preview!);
//       newVideos.splice(index, 1);
//       return newVideos;
//     });
//   };

//   const handleUpload = async () => {
//     // TODO: Implement actual S3 upload logic here
//     console.log('Uploading videos:', selectedVideos);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6">
//       <div className="mb-6">
//         <label
//           htmlFor="video-upload"
//           className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
//         >
//           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//             <Upload className="w-10 h-10 mb-3 text-gray-400" />
//             <p className="mb-2 text-sm text-gray-500">
//               <span className="font-semibold">Click to upload</span> or drag and drop
//             </p>
//             <p className="text-xs text-gray-500">MP4, WebM, or OGG (MAX. 800MB)</p>
//           </div>
//           <input
//             ref={fileInputRef}
//             id="video-upload"
//             type="file"
//             className="hidden"
//             accept="video/*"
//             multiple
//             onChange={handleFileSelect}
//           />
//         </label>
//       </div>

//       {selectedVideos.length > 0 && (
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Selected Videos</h3>
//           {selectedVideos.map((video, index) => (
//             <div
//               key={`${video.name}-${index}`}
//               className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
//             >
//               <div className="flex items-center space-x-4">
//                 <video className="w-24 h-16 object-cover rounded">
//                   <source src={video.preview} type={video.type} />
//                 </video>
//                 <div>
//                   <p className="font-medium truncate max-w-xs">{video.name}</p>
//                   <p className="text-sm text-gray-500">
//                     Size: {(video.size / (1024 * 1024)).toFixed(2)} MB
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Estimated upload time: {video.estimatedTime}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeVideo(index)}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={handleUpload}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Upload {selectedVideos.length} {selectedVideos.length === 1 ? 'Video' : 'Videos'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };