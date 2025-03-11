import { useState } from "react";

export default function FileUpload({
  toggleAnalysisBar,
  analysisResponse,
  toggleLoading,
}) {
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [buttonText, setButtonText] = useState("Upload");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    setFiles([...e.target.files]);
    const videoArray = [];
    for (let i = 0; i < files.length; i++) {
      const videoUrl = URL.createObjectURL(files[i]);
      videoArray.push({ file: files[i], url: videoUrl });
    }
    setVideos(videoArray);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length > 0 && buttonText == "Analyze") {
      // toggleAnalysisBar();
      toggleLoading(true);
      try {
        const responseAnalyze = await fetch("/api/hello", {
          method: "GET",
        });
        if (!responseAnalyze.ok) {
          setButtonText("Upload");
          throw new Error("Failed to fetch the data");
        }
        const result = await responseAnalyze.json();
        toggleLoading(false);
        analysisResponse(result);
        setButtonText("Analyzed");
      } catch (error) {
        setError(error);
      }
    }

    if (files.length > 0 && buttonText == "Upload") {
      setButtonText("Uploading..");
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await fetch("/api/hello", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setButtonText("Analyze");
          alert("Files uploaded successfully!");
        } else {
          setButtonText("Upload");
          alert("Failed to upload files.");
        }
      } catch (error) {
        setButtonText("Upload");
        console.log("Upload error", error);
        setMessage("Upload failed.");
      }
    }
  };
  return (
    <>
      <div className="flex justify-between rounded-md">
        {videos.length > 0 && (
          <div className=" gap-4">
            {videos.map((video, index) => (
              <div key={index} className="relative">
                <video
                  src={video.url}
                  controls
                  className="w-full h-30 object-fill rounded-lg shadow-lg"
                />
                <img src="/delete.png" className="absolute inset-0 w-5 h-5" />
                <p className="mt-2 text-sm text-gray-600 truncate">
                  {video.file.name}
                </p>
              </div>
            ))}
          </div>
        )}
        <div>
          <input
            className="opacity-0 absolute h-0 w-0"
            id="file-input"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            multiple
          />
          <div className="flex justify-end items-center">
            <img src="/upload_2.png" className="w-16 h-16" />
            <div className="flex items-center justify-center gap-8">
              <label htmlFor="file-input" className="font-serif text-3xl">
                Upload your video files
              </label>
              <button
                className="bg-black text-white px-8 py-2 rounded-lg"
                onClick={handleUpload}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
