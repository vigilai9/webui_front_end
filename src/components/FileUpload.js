import { useState } from "react";

export default function FileUpload() {
  const [previewUrl, serPreviewUrl] = useState(null);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    serPreviewUrl(url);
  };
  return (
    <>
      <div className="rounded-md bg-gray-300">
        <div className="flex items-center justify-center">
          <img src="/upload.png" alt="My Image" className="w-32 h-32" />
        </div>
        <input type="file" accept="video/*" onChange={handleUpload} />
        <button className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
          Upload
        </button>
      </div>
      {previewUrl && (
        <video controls src={previewUrl} width={500} height={500} />
      )}
    </>
  );
}
