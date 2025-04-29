"use client";

import Analyze from "@/components/Analyze";
import ChatBot from "@/components/ChatBot";
// import FileUpload from "@/components/FileUpload";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Controls from "@/components/Controls";
import { FileUpload } from "@/components/FileUpload";
import { VideoFile } from "@/components/FileUpload";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnalysisBar, setShowAnalysisBar] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<VideoFile[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/home");
    }
  }, [currentUser, router, authLoading]);

  if (!currentUser) {
    return null;
  }

  const changeAnalysisBarState = (value:boolean) => {
    setShowAnalysisBar(value);
  };

  const changeLoadingState = (loading:boolean) => {
    setLoading(loading);
  };

  const setAnalysisData = (data:any) => {
    setData(data);
  };
  return (
    <>
      <div className="">
        
        {/* {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="relative bg-white w-4/5 h-4/5 rounded-lg shadow-lg">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✖
              </button>

              <iframe src="/dr.pdf" className="w-full h-full rounded-b-lg" />
            </div>
          </div>
        )} */}

        <div className={`bg-white flex gap-8`}>
          {/* <div className="w-[25%]">
            <Controls />
          </div> */}
          <div
            className={`w-full mx-auto`}
          >
            {/* <FileUpload
              toggleAnalysisBar={changeAnalysisBarState}
              analysisResponse={setAnalysisData}
              toggleLoading={changeLoadingState}
              analysisState={showAnalysisBar}
            /> */}
            {
              data.length==0 && 
              <>
              <Navbar />
              <FileUpload 
              toggleAnalysisBar={changeAnalysisBarState}
              analysisResponse={setAnalysisData}
              toggleLoading={changeLoadingState}
              files={files}
              setFiles={setFiles}
            />
              </>
           }
            <div>
              { data.length>0 && <ChatBot data={data} files={files} setFiles={setFiles}/> } 
              {/* { data.length === 0 && <ChatBot data={data} files={files} /> } */}
            </div>
          </div>
          {/* {showAnalysisBar && (
            <div className=" w-[25%] p-6 rounded-lg min-h-screen flex flex-col">
              <Analyze
                loading={loading}
                data={data}
                toggleAnalysisBar={changeAnalysisBarState}
              />

              <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2 w-full"
                >
                  Preview Report
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full mt-2">
                  Download Report
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}