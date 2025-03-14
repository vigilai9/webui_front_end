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
  const [showAnalysisBar, setShowAnalysisBar] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
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

  const changeAnalysisBarState = (value) => {
    setShowAnalysisBar(value);
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
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="relative bg-white w-4/5 h-4/5 rounded-lg shadow-lg">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✖
              </button>

              {/* Embedded PDF */}
              <iframe src="/dr.pdf" className="w-full h-full rounded-b-lg" />
            </div>
          </div>
        )}
        <Navbar />
        <div className={`bg-[#d4d6cb] flex p-10 gap-8 `}>
          <div
            className={`h-full bg-gray-100 ${
              showAnalysisBar ? "w-[60%]" : "w-[60%]"
            } p-8 rounded-lg mx-auto`}
          >
            <FileUpload
              toggleAnalysisBar={changeAnalysisBarState}
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
                className="absolute top-18 right-12"
                onClick={() => changeAnalysisBarState(false)}
              >
                X
              </button>

              <Analyze loading={loading} data={data} />

              <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Preview Report
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Download Report
                </button>
              </div>
            </div>
          )}

          <button
            className="fixed right-4 top-1/2"
            onClick={() => changeAnalysisBarState(!showAnalysisBar)}
          >
            <img className="w-10 h-10" src="/right.png" />
          </button>
        </div>
      </div>
    </>
  );
}
