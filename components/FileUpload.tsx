import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Video, Film, Search, Bell, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

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

  // const [videoId, setVideoId] = useState("1cc06063-f");

  const [tFile, setTFile] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files;
    console.log("event.target", file?.[0]);
    setTFile(file?.[0]);

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
    if (!files.length) return;
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
        console.log("Analuysssssssssssssss", data);
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

        const ressss = await res.json();
        console.log("uplodaeddddddddddddd", ressss);
        console.log("Tfileee", tFile);
        console.log("all files", files);
        console.log("first file", files[0]);
        // setVideoId(ressss.videoId);

        try {
          const response = await fetch(ressss.uploadURL+"ds", {
            method: 'PUT',
            body: files[0],
            headers: {
              'Content-Type': files[0].type,
            },
          });

          console.log("REspoo 333333", response);
          if (response.ok) {
            console.log('File uploaded successfully');
            updateState("Analyze", false);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('Upload failed');
        }

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

  const [showActivity, setShowActivity] = useState(false);

  const securityAlerts = [
    { title: 'Security Camera Alert', time: 'Today, 11:45 AM', message: 'Detected motion in Zone 3', status: 'alert' },
    { title: 'Entrance Monitoring', time: 'Today, 9:20 AM', message: 'No unusual activity detected', status: 'normal' },
    { title: 'Parking Lot Surveillance', time: 'Yesterday', message: 'Vehicle identified: Red SUV', status: 'normal' },
    { title: 'Retail Store Analytics', time: 'Apr 25, 2025', message: 'Customer count: 257', status: 'normal' },
    { title: 'Warehouse Security', time: 'Apr 23, 2025', message: 'All systems normal', status: 'normal' },
    { title: 'Office Building Monitoring', time: 'Apr 21, 2025', message: 'After-hours access detected', status: 'normal' },
    { title: 'Traffic Analysis', time: 'Apr 19, 2025', message: 'Peak hours: 8-10 AM, 5-7 PM', status: 'normal' },
    { title: 'Construction Site Monitoring', time: 'Apr 17, 2025', message: 'Equipment status: normal', status: 'normal' },
  ];



  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  // Close menu when clicking outside

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const toggleButton = document.querySelector(".user-profile-toggle");
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      event.target !== toggleButton && // Ignore clicks on the toggle button
      !toggleButton?.contains(event.target as Node) // Also check for children of the toggle
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
 

  const router = useRouter();

  const { signOut } = useAuth();
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      router.push("/home");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* App Title */}
        <div className="p-4 flex items-center">
          <h1 className="text-purple-600 text-xl font-bold">VigilAI</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="bg-gray-100 rounded-md flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-transparent border-none w-full pl-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-auto cardsSlider">
          {securityAlerts.map((alert, index) => (
            <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">{alert.title}</span>
              </div>
              <p className="text-xs text-gray-600">{alert.message}</p>
              {alert.status === 'alert' && (
                <div className="mt-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Storage */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">Storage</span>
            <span className="text-sm text-gray-600">12.4 GB / 50 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-purple-600 h-1 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-8 py-2">
          <h2 className="text-lg font-medium">Upload Videos</h2>
          <div className=" flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <Bell size={20} />
            </button>
            
            <div onClick={toggleMenu} className="user-profile-toggle relative w-6 h-6 bg-gray-200 rounded-full cursor-pointer">
              <img
                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              {isOpen && (
                <div ref={menuRef} className="absolute top-10 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10 ">
                  <div className="px-6 py-1 bg-gray-100 text-white">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden mr-4">
                        <img
                          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-gray-600">
                        <h3 className="font-semibold text-md">Hi, username!</h3>
                        <p className="text-xs">userEmail@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded cursor-pointer">
                      <User size={18} className="text-gray-500" />
                      <span>Manage account</span>
                    </button>

                    <button className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded cursor-pointer">
                      <Settings size={18} className="text-gray-500" />
                      <span>Settings</span>
                    </button>

                    <button onClick={handleSignOut} className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded text-red-500 cursor-pointer">
                      <LogOut size={18} />
                      <span>Sign out</span>
                    </button>
                  </div>

                  <div className="p-3 pt-0 text-center">
                    {/* <p className="text-xs text-gray-400">Secured by <span className="font-medium">Clerk</span></p> */}
                  </div>
                </div>
              )}
            </div>




          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 justify-center items-center h-full p-4 overflow-auto bg-white">



          {/* Upload Area */}
          <div className="bg-white rounded-lg  px-4 py-2 border border-gray-200">
            <div className="my">
              <h2 className="text-lg font-medium">Upload Videos</h2>
              <p className="text-gray-500 text-sm">Upload video files for analysis and monitoring</p>
            </div>

            {/* <div className="flex gap-4 w-full max-w-4xl overflow-x-auto mt-4 cardsSlider pb-1">
              {files.map((video: VideoFile, index: number) => (
                <div
                  key={`${video.name}-${index}`}
                  className="border rounded-md p-3 flex items-center gap-3 group relative transition-all duration-500 transform hover:translate-y-0.5 min-w-[270px] flex-shrink-0"
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
            </div> */}



            <div className="border-b border-gray-100 py-4">
              <div
                className="border-2 border-dashed border-gray-200 hover:border-indigo-300 bg-gray-50 hover:bg-gray-100 cursor-pointer tranisitio-all duration-500 rounded-lg p-2"
                {...getRootProps()}
              >
                <div
                  className={`flex flex-col items-center justify-center py-4 ${dragActive ? "bg-gray-100" : ""
                    }`}
                >
                  <div onClick={handleClick} className="bg-indigo-100 hover:bg-white transition-all duration-500 p-4 rounded-full mb-4">
                    <Upload className="text-gray-500" size={24} />
                  </div>
                  <p className="text-center text-gray-700 mb-2">
                    Drag and drop your video files here
                  </p>
                  <p className="text-center text-gray-500 text-sm">or</p>

                  <Button onClick={handleClick} size={'sm'} variant={'outline'} className="my-2 text-indigo-500 font-normal text-sm bg-white hover:bg-gray-50 hover:text-indigo-500">
                    Browse Your Files
                  </Button>

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



            {/* Actions */}
            <div className="mt-4 flex justify-between">
              <div>
                <button
                  onClick={() => setShowActivity(!showActivity)}
                  className="text-blue-500 text-sm flex items-center"
                >
                  Show Recent Activity
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button onClick={() => setFiles([])} size={'sm'} variant={'outline'} className="my-2 text-indigo-500 font-normal text-sm bg-white hover:bg-gray-50 hover:text-indigo-500">
                  Canel
                </Button>
                <Button onClick={handleUploadVideo} size={'sm'} variant={'primary'}>
                  {buttonText}
                </Button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
