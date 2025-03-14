import React, { useState, useRef } from "react";

export default function FileUpload({
  toggleAnalysisBar,
  analysisResponse,
  toggleLoading,
}) {
  const [videoPlayBackUrl, setVideoPlayBackUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState("Upload");
  const [analysisData, setAnalysisData] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  const videoRef = useRef();

  const handleFileChange = (e) => {
    console.log("Called");
    const file = e.target.files[0];
    setSelectedFile(file);
    setVideoPlayBackUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const updateState = (text, disable) => {
      setButtonText(text), setDisableButton(disable);
    };
    const videoId = "1cc06063-f";
    if (["Analyze", "Retry..."].includes(buttonText)) {
      try {
        updateState("Analyzing...", true);
        const res = await fetch(
          `https://wu40yoqun0.execute-api.us-east-2.amazonaws.com/Production/videos/video/timeline?videoId=${videoId}`
        );
        const data = await res.json();
        // console.log(data[0]?.data?.scene_analysis);
        analysisResponse(data[0]?.data?.scene_analysis);
        updateState("Analyzed", false);
        toggleAnalysisBar(true);
      } catch (error) {
        updateState("Retry", false);
        throw new Error("Server");
      }
    }
    if (["Upload", "Re upload"].includes(buttonText)) {
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
    document.getElementById("file-input").value = "";
  };

  const onReselect = () => {
    setVideoPlayBackUrl(null);
  };

  return (
    <div className="flex justify-center items-center rounded-md p-8 mx-10 my-2 border border-black">
      <div>
        <input
          className="opacity-0 absolute h-0 w-0"
          id="file-input"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <div className="rounded-md">
          {selectedFile != null && (
            <video
              // ref={videoRef}
              src={videoPlayBackUrl}
              controls
              className="rounded-md w-full h-60 object-fill"
            />
          )}

          {/* <img src="/upload_2.png" className="w-16 h-16" /> */}
          <div className="flex flex-col justify-center items-center">
            {selectedFile == null && (
              <img src="/upload_2.png" width={80} height={80} />
            )}

            {selectedFile == null && (
              <label
                htmlFor="file-input"
                className="font-serif text-3xl font-bold my-2"
              >
                Select your video
              </label>
            )}

            {selectedFile != null && (
              <div className="flex gap-8 mt-4">
                <button
                  className="border border-black text-black px-8 py-2 rounded-lg w-[200px]"
                  onClick={onDeleteSelection}
                >
                  Delete Selection
                </button>
                <button
                  className="bg-black text-white px-8 py-2 rounded-lg w-[200px]"
                  disabled={disableButton}
                  onClick={handleUpload}
                >
                  {buttonText}
                </button>
                {/* <button
                htmlFor="file-input"
                className="border border-black text-black px-8 py-2 rounded-lg w-[200px]"
                disabled={videoPlayBackUrl ? false : true}
                // onClick={onReselect}
              >
                Reselect
              </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
