"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Homepage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const handleTryVigil = () => {
    if (!authLoading && !currentUser) {
      router.push("/login");
      return;
    }
    router.push("/");
    return;
  };
  return (
    <div>
      <Navbar />
      <div className="w-[70%] mx-auto">
        <div className="flex flex-col justify-center items-center mt-30">
          <h1 className="text-7xl font-semibold">
            Under <span className="text-amber-400">30-Sec,</span>{" "}
          </h1>
          <h1 className="text-7xl font-semibold">Human Level Reporting</h1>
        </div>

        <p className="my-20 text-gray-400 text-3xl block px-30 mx-auto text-center">
          Protect and stay ahead of risks, with the ultimate tool for anomaly
          detection. Upgrade today for peace of mind
        </p>
        <button
          className="bg-black text-white px-10 py-4 rounded-lg text-xl block mx-auto"
          onClick={() => handleTryVigil()}
        >
          Try VigilAI Lab
        </button>
        <div className="flex justify-center mt-36">
          <p className="text-4xl">Your Personalized AI Research Assistant</p>
        </div>

        <div className="mt-30">
          {/* think of making it as a sep comp */}
          <div className="flex justify-between mt-20 gap-16">
            <div className="py-10">
              <img src="/fast.png" width={50} />
              <p className="font-medium text-2xl">Connect our free hardware</p>
              <p className="text-xl text-gray-500 mt-5">
                We'll ship free hardware. Connect it to the same private network
                as your NVR and login to Vigil AI's web portal.
              </p>
            </div>
            <video
              className="rounded-xl"
              src="/upload_your_sources.mp4"
              width={700}
              height={600}
              autoPlay
              loop
              muted
              onEnded={(e) => e.target.play()}
              playsInline
            />
          </div>

          <div className="flex justify-between mt-20 gap-16">
            <div>
              <img src="/fast.png" width={50} />
              <p className="font-medium text-2xl">Setup in 10 min</p>
              <p className="text-xl text-gray-500 mt-5">
                Setup the different cameras and camera location detail along
                with deployment presets or customized settings.
              </p>
            </div>
            <video
              className="rounded-xl"
              src="/upload_your_sources.mp4"
              width={700}
              height={600}
              autoPlay
              loop
              muted
              onEnded={(e) => e.target.play()}
              playsInline
            />
          </div>
          <div className="flex justify-between mt-20 gap-16">
            <div>
              <img src="/fast.png" width={50} />
              <p className="font-medium text-2xl">Experience Live Witness</p>
              <p className="text-xl text-gray-500 mt-5">
                Vigil AI's gen AI powered surveillance system will give under 30
                sec analysis on simple and complex anomalies such as theft,
                organised crime, violent crimes and more.
              </p>
            </div>
            <video
              className="rounded-xl"
              src="/upload_your_sources.mp4"
              width={700}
              height={600}
              autoPlay
              loop
              muted
              onEnded={(e) => e.target.play()}
              playsInline
            />
          </div>

          <div className="flex justify-between mt-20 gap-16">
            <div>
              <img src="/fast.png" width={50} />
              <p className="font-medium text-2xl">
                See the source, not just analysis
              </p>
              <p className="text-xl text-gray-500 mt-5">
                Our timestamp and source cited analysis gives easy access and
                navigation to the original material for maximum credibility.
              </p>
            </div>
            <video
              className="rounded-xl"
              src="/upload_your_sources.mp4"
              width={700}
              height={600}
              autoPlay
              loop
              muted
              onEnded={(e) => e.target.play()}
              playsInline
            />
          </div>
        </div>

        {/* privacy */}
      </div>
      <div className="bg-gray-100 py-30 text-center mt-30">
        <p className="text-4xl px-80">
        We value your privacy and do not use your personal data to train Vigil AI.

        </p>
        <p className="mt-10 text-xl px-80 text-gray-600">
        Not only that, the facial data of individuals in the video is jumbled at the start and is not part of the decision making process.
        </p>
        <div className="relative">
          <img
            src="/privacy-tornado.png"
            width={500}
            className="block mx-auto mt-10"
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/5">
            <img src="/lock.png" width={80} />
          </div>
        </div>
      </div>


      {/* how people use vgilai */}
      <div className="my-30">
        <p className="text-5xl text-center">Why to add Vigil AI to your security needs.
        </p>
        <div className="flex w-[70%] mx-auto mt-30 gap-8">
          <div>
            <img src="/lock.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Power study</p>
            <p className="text-xl text-gray-500">
              Upload lecture recordings, textbook chapters, and research papers.
              Ask VigilAI to explain complex concepts in simple terms, provide
              real-world examples, and reinforce your understanding.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
              Learn faster and deeper.
            </p>
          </div>
          <div>
            <img src="/lock.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Power study</p>
            <p className="text-xl text-gray-500">
              Upload lecture recordings, textbook chapters, and research papers.
              Ask VigilAI to explain complex concepts in simple terms, provide
              real-world examples, and reinforce your understanding.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
              Learn faster and deeper.
            </p>
          </div>
          <div>
            <img src="/lock.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Power study</p>
            <p className="text-xl text-gray-500">
              Upload lecture recordings, textbook chapters, and research papers.
              Ask VigilAI to explain complex concepts in simple terms, provide
              real-world examples, and reinforce your understanding.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
              Learn faster and deeper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
