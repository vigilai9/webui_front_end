import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Video, Film } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";

export interface VideoFile extends File {
  preview?: string;
  estimatedTime?: string;
}

export const FileUpload = ({
  analysisResponse,
  toggleLoading,
  toggleAnalysisBar,
  files,
  setFiles
}: {
  analysisResponse: any;
  toggleLoading: any;
  toggleAnalysisBar: any;
  files: any,
  setFiles: any
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonText, setButtonText] = useState("Upload");
  const [disableRemoveButton, setDisableRemoveButton] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newVideos = files.map((file) => {
      const videoFile = file as VideoFile;
      videoFile.preview = URL.createObjectURL(file);
      videoFile.estimatedTime = calculateEstimatedTime(file.size);
      return videoFile;
    });

    setFiles((prev: VideoFile[]) => [...prev, ...newVideos]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setDragActive(false);
    const newVideos = acceptedFiles.map((file) => {
      const videoFile = file as VideoFile;
      videoFile.preview = URL.createObjectURL(file);
      videoFile.estimatedTime = calculateEstimatedTime(file.size);
      return videoFile;
    });

    setFiles((prev: VideoFile[]) => [...prev, ...newVideos]);
  };

  const removeVideo = (index: number) => {
    setFiles((prev: VideoFile[]) => {
      let newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview!);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const calculateEstimatedTime = (fileSize: number): string => {
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

  const { getRootProps } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropRejected: (error) => {
      console.log(error);
      setDragActive(false);
    },
  });

  const handleUploadVideo = async () => {
    if(!files.length) return;
    const updateState = (text: string, disable: boolean) => {
      setButtonText(text), setDisableRemoveButton(disable);
    };
    const videoId = "1cc06063-f";
    if (["Show Analysis"].includes(buttonText)) {
      toggleAnalysisBar(true);
      setButtonText("Hide Analysis");
    }
    if (["Hide Analysis"].includes(buttonText)) {
      toggleAnalysisBar(false);
      setButtonText("Show Analysis");
    }

    if (["Analyze", "Retry..."].includes(buttonText)) {
      try {
        updateState("Analyzing...", true);
        toggleLoading(true);
        toggleAnalysisBar(true);
        const res = await fetch(
          `https://wu40yoqun0.execute-api.us-east-2.amazonaws.com/Production/videos/video/timeline?videoId=${videoId}`
        );
        const data = await res.json();
        analysisResponse(data.analysisData[0]?.data?.scene_analysis);
        console.log("Analysis", data.analysisData[0]?.data?.scene_analysis);
        updateState("Hide Analysis", false);
        toggleLoading(false);
      } catch (error) {
        updateState("Retry", false);
        throw new Error("Server");
      }
    }

    if (["Upload"].includes(buttonText)) {
      try {
        updateState("Uploading", true);
        const res = await fetch(
          "https://wu40yoqun0.execute-api.us-east-2.amazonaws.com/Production/videos",
          {
            method: "POST",
            body: JSON.stringify({
              fileName: "example.mp4",
              fileType: "video/mp4",
              fileSize: 12345678,
              userId: "user123",
            }),
          }
        );
        console.log("response after uploading video to sc bucket", res);
        if (res.ok) {
          updateState("Analyze", false);
        } else {
          updateState("Re upload", false);
          throw new Error("Internal server error");
        }
      } catch (error: any) {
        updateState("Re upload", false);
        throw new Error("upload failed", error);
      }
    }
  };

  return (
    <div className="mt-6 md:mt-8 lg:mt-12 p-2 bg-gray-50 max-w-5xl mx-auto pt-12">
      <main className=" bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
          <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">Upload Videos</h2>
          <p className="text-xs text-gray-400">Upload video files for analysis and monitoring</p>
          
{/* <div className="flex gap-2 w-full overflow-x-auto pt-4 pb-2 cardsSlider">
  {files.map((video: VideoFile, index: number) => (
    <div
      key={`${video.name}-${index}`}
      className="border rounded-md p-3 flex items-center gap-3 group relative transition-all duration-500 transform hover:translate-y-0.5 min-w-[250px]"
    >
      <div className="bg-gray-100 p-2 rounded-md">
        <Film className="w-6 h-6 text-gray-400" />
      </div>
      <div className="overflow-hidden flex-1 pr-6">
        <p className="text-sm font-medium text-gray-700 truncate">
          {video.name.length > 25 ? `${video.name.slice(0, 24)}...` : video.name}
        </p>
        <p className="text-xs text-gray-500">
          {(video.size / (1024 * 1024)).toFixed(2)} MB • {video.estimatedTime} to upload
        </p>
      </div>
      <button
        onClick={() => removeVideo(index)}
        className="absolute top-3 right-3 p-1 rounded-full text-transparent group-hover:text-gray-400 hover:text-red-500 hover:bg-red-100 cursor-pointer transition-all duration-300"
        disabled={disableRemoveButton}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}
</div> */}

<div className="flex gap-2 w-full overflow-x-auto pt-4 pb-2 cardsSlider">
  {files.map((video: VideoFile, index: number) => (
    <div
      key={`${video.name}-${index}`}
      className="border rounded-md p-3 flex items-center gap-3 group relative transition-all duration-500 transform hover:translate-y-0.5 min-w-[250px]"
    >
      <div className="bg-gray-100 p-2 rounded-md">
        <Film className="w-6 h-6 text-gray-400" />
      </div>
      <div className="overflow-hidden flex-1 pr-6">
        <p className="text-sm font-medium text-gray-700 truncate">
          {video.name.length > 25 ? `${video.name.slice(0, 24)}...` : video.name}
        </p>
        <p className="text-xs text-gray-500">
          {(video.size / (1024 * 1024)).toFixed(2)} MB • {video.estimatedTime} to upload
        </p>
        
        {/* Uploading indicator */}
        {["Uploading"].includes(buttonText) && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <svg 
              className="w-3 h-3 text-indigo-400 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      <button
        onClick={() => removeVideo(index)}
        className="absolute top-3 right-3 p-1 rounded-full text-transparent group-hover:text-gray-400 hover:text-red-500 hover:bg-red-100 cursor-pointer transition-all duration-300"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>
        
          </div>
          <div className="border-b border-gray-200 p-4">
            <div
              className="border-2 border-dashed border-gray-200 hover:border-indigo-300 bg-gray-100 hover:bg-gray-200 cursor-pointer tranisitio-all duration-500 rounded-lg p-6"
              {...getRootProps()}
            >
              <div
                className={`flex flex-col items-center justify-center py-4 ${dragActive ? "bg-gray-100" : ""
                  }`}
              >
                <div onClick={handleClick} className="h-16 w-16 flex bg-white items-center justify-center rounded-full">
                  <Upload className="w-8 h-8 text-indigo-500 mb-4" />
                </div>
                <p className="text-center text-gray-700 mb-2">
                  Drag and drop your video files here
                </p>
                <p className="text-center text-gray-500 text-sm">or</p>
                <button
                  className="text-indigo-500 text-sm mt-2 hover:underline focus:outline-none"
                  onClick={handleClick}
                >
                  click to browse your files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 p-4">
              <Button onClick={() => setFiles([])} size={'sm'} variant={'outline'}>
                Canel
              </Button>
              <Button onClick={handleUploadVideo} size={'sm'} variant={'primary'}>
                {buttonText}
              </Button>
          </div>
      </main>
    </div>
  );
};