"use client";

import Analyze from "@/components/Analyze";
import ChatBot from "@/components/Chatbot";
import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnalysisBar, setShowAnalysisBar] = useState(true);
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, router, authLoading]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const toggleAnalysisBar = () => {
    setShowAnalysisBar(!showAnalysisBar);
  };

  const changeLoadingState = (loading) => {
    setLoading(loading);
  };

  const setAnalysisData = (data) => {
    setData(data);
  };
  return (
    <>
      <div>
        <Navbar />
        <div className={`bg-[#d4d6cb] flex p-10 gap-8 `}>
          <div
            className={`h-full bg-gray-100 ${
              showAnalysisBar ? "w-[60%]" : "w-[60%]"
            } p-8 rounded-lg mx-auto`}
          >
            <FileUpload
              toggleAnalysisBar={toggleAnalysisBar}
              analysisResponse={setAnalysisData}
              toggleLoading={changeLoadingState}
            />
            <div className="mt-6 p-10">
              <ChatBot />
            </div>
          </div>
          {showAnalysisBar && (
            <div className="bg-gray-100 w-[40%] p-8 rounded-lg min-h-screen flex flex-col">
              <button
                className="absolute top-12 right-16"
                onClick={toggleAnalysisBar}
              >
                x
              </button>

              <Analyze loading={loading} data={data} />

              <div className="mt-auto pt-4 border-t border-gray-200">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2">
                  Preview Report
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Download Report
                </button>
              </div>
            </div>
          )}
          {!showAnalysisBar && (
            <button
              className="fixed right-4 top-1/2"
              onClick={toggleAnalysisBar}
            >
              <img className="w-10 h-10" src="/right.png" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
