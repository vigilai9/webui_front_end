"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import FileUpload from "@/src/components/FileUpload";
import Navbar from "@/src/components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { currentUser, loading, signOut } = useAuth(); // Get signOut function from useAuth
  const [showAnalysisBar, setShowAnalysisBar] = useState(true);

  // Redirect logic
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Add a proper loading spinner
  }

  return (
    <>
      {/* Logout Button */}
      {currentUser && (
        <button
          onClick={signOut}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      )}

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
            } p-8 rounded-lg relative`}
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
