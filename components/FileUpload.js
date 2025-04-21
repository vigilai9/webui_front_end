import React, { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({
  toggleAnalysisBar,
  analysisResponse,
  toggleLoading
}) {
  const [videoPlayBackUrl, setVideoPlayBackUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState("Select Video");
  const [analysisData, setAnalysisData] = useState({});
  const [disableRemoveButton, setDisableRemoveButton] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      console.log("KK",acceptedFiles);
      setSelectedFile(acceptedFiles[0]);
      setVideoPlayBackUrl(URL.createObjectURL(acceptedFiles[0]));
      setButtonText("Upload");
    },
  });

  const handleUpload = async () => {
    const updateState = (text, disable) => {
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
        analysisResponse(data[0]?.data?.scene_analysis);
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
        console.log("response after uploading video to sc bucket",res);
        if (res.ok) {
          updateState("Analyze", false);
        } else {
          updateState("Re upload", false);
          throw new Error("Internal server error");
        }
      } catch (error) {
        updateState("Re upload", false);
        throw new Error("upload failed", error);
      }
    }
  };

  const onDeleteSelection = () => {
    setVideoPlayBackUrl(null);
    setSelectedFile(null);
    setButtonText("Select Video");
  };

  const onReselect = () => {
    setVideoPlayBackUrl(null);
  };

  return (
    <>
      {!selectedFile && (
        <div className="border-1 p-6 rounded-lg text-center">
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center cursor-pointer p-4 bg-gray-100"
          >
            <UploadCloud size={50} className="text-blue-600" />
            <input {...getInputProps()} />
            <p>Drag and drop or click to select</p>
            <button
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md mt-4 text-xl"
              onClick={handleUpload}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
      {selectedFile && (
        <div className="h-[200px] mx-auto flex flex-col justify-center items-center mt-8">
          <video
            src={videoPlayBackUrl}
            controls
            className="rounded-lg w-[50%] h-full object-cover"
          />
          <div className="flex mt-4 gap-4 border border-green-600">
            <button
              className="bg-blue-500 rounded-lg text-white px-4 py-2 text-xl"
              onClick={handleUpload}
            >
              {buttonText}
            </button>
            <button
              className="border-1 border-blue-500 px-4 py-2 rounded-lg text-xl"
              onClick={onDeleteSelection}
              disabled={disableRemoveButton}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
}