"use client";

import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [showAnalysisBar, setShowAnalysisBar] = useState(true);

  return (
    <>
      {/* <Navbar /> */}
      <div
        className={`flex p-4 ${!showAnalysisBar ? "justify-center gap-4" : ""}`}
      >
        <div
          className={`m-4 bg-gray-100 ${
            showAnalysisBar ? "w-[70%]" : "w-[80%]"
          } p-8 rounded-lg`}
        >
          <FileUpload />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {showAnalysisBar ? (
          <div
            className={`m-4 bg-gray-100 ${
              showAnalysisBar ? "w-[30%]" : "w-[0%]"
            } p-8 rounded-lg`}
          >
            <button
              onClick={() => setShowAnalysisBar(false)}
              className="absolute top-8 right-8 p-2 hover:bg-gray-300"
            >
              ✕
            </button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setShowAnalysisBar(true)}
            className="fixed right-4 top-1/2  p-3 bg-gray-200 hover:bg-gray-300 shadow-lg"
          >
            ➤
          </button>
        )}
      </div>
    </>
  );
}
