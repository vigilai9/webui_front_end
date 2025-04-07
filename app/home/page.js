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
          detection. Launching soon for complete peace of mind!
        </p>
        <button
          className="bg-black text-white px-10 py-4 rounded-lg text-xl block mx-auto"
          onClick={() => handleTryVigil()}
        >
           Try VigilAI!
        </button>
        <div className="flex justify-center mt-36">
          <p className="text-4xl">Your Personalized AI Research Assistant</p>
        </div>

        {/*gemeni code  below*/}

        {/* How It Works Section */}
<div className="mt-16 md:mt-20 space-y-16 md:space-y-24"> 
  {/* Section wrapper with standardized margins and spacing */}

  {/* Step 1: Connect Hardware */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-16">
    {/* Text Content */}
    <div className="md:w-1/2 order-2 md:order-1">
      <img src="/dvr.png" width={50} className="mb-4" alt="DVR Hardware Icon" />
      <p className="font-medium text-2xl mb-3">Connect our free hardware</p>
      <p className="text-xl text-gray-500 leading-relaxed">
        We'll ship free hardware. Connect it to the same private network
        as your NVR and login to Vigil AI's web portal.
      </p>
    </div>
    {/* Image Content */}
    <div className="md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
      <img
        className="rounded-xl shadow-md w-full"
        src="/connect.png"
        alt="Connecting Vigil AI Hardware"
      />
    </div>
  </div>

  {/* Step 2: Setup */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-16">
    {/* Image Content */}
    <div className="md:w-1/2 order-1 md:order-1 mb-8 md:mb-0">
      <img
        className="rounded-xl shadow-md w-full"
        src="/setup.png"
        alt="Vigil AI Setup Screen"
      />
    </div>
    {/* Text Content */}
    <div className="md:w-1/2 order-2 md:order-2">
      <img src="/setup_icon.png" width={40} className="mb-4" alt="Setup Icon" />
      <p className="font-medium text-2xl mb-3">Setup in 10 min</p>
      <p className="text-xl text-gray-500 leading-relaxed">
        Setup the different cameras and camera location detail along
        with deployment presets or customized settings.
      </p>
    </div>
  </div>

  {/* Step 3: Experience Live Witness */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-16">
    {/* Text Content */}
    <div className="md:w-1/2 order-2 md:order-1">
      <img src="/fast.png" width={50} className="mb-4" alt="Speed Icon" />
      <p className="font-medium text-2xl mb-3">Experience Live Witness</p>
      <p className="text-xl text-gray-500 leading-relaxed">
        Vigil AI's gen AI powered surveillance system will give under 30
        sec analysis on simple and complex anomalies such as theft,
        organised crime, violent crimes and more.
      </p>
    </div>
    {/* Image Content */}
    <div className="md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
      <img
        className="rounded-xl shadow-md w-full"
        src="/experience.png"
        alt="Vigil AI Live Analysis Example"
      />
    </div>
  </div>

  {/* Step 4: See Source */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-16">
    {/* Image Content */}
    <div className="md:w-1/2 order-1 md:order-1 mb-8 md:mb-0">
      <img
        className="rounded-xl shadow-md w-full"
        src="/see.png"
        alt="Source Verification Example"
      />
    </div>
    {/* Text Content */}
    <div className="md:w-1/2 order-2 md:order-2">
      <img src="/source.png" width={40} className="mb-4" alt="Source Document Icon" />
      <p className="font-medium text-2xl mb-3">See the source, not just analysis</p>
      <p className="text-xl text-gray-500 leading-relaxed">
        Our timestamp and source cited analysis gives easy access and
        navigation to the original material for maximum credibility.
      </p>
    </div>
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
        <div className="grid grid-cols-3 w-[70%] mx-auto mt-30 gap-16">
          <div>
            <img src="/storage_icon.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Store month of events in under 2GB storage</p>
            <p className="text-xl text-gray-500">
            Efficiently store a month's worth of event data without exceeding 2GB. Our smart compression and indexing ensure seamless access to historical records without compromising quality.

            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Save space without losing critical insights.
            </p>
          </div>
          <div>
            <img src="/track.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Track severe events</p>
            <p className="text-xl text-gray-500">
            Get real-time alerts and insights on severe events. Our AI-powered detection system ensures you stay informed about critical situations as they unfold.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Never miss an important moment.
            </p>
          </div>
          <div>
            <img src="/camera.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Deploy on any IP camera</p>
            <p className="text-xl text-gray-500">
            Seamlessly integrate with any IP camera setup. No additional hardware required—just plug into your existing infrastructure and start monitoring immediately.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Compatible with your current setup.
            </p>
          </div>

          <div>
            <img src="/padlock.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Safe & Secure</p>
            <p className="text-xl text-gray-500">
            Your data is protected with enterprise-grade encryption, ensuring privacy and security from capture to storage.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Security you can trust.
            </p>
          </div>

          <div>
            <img src="/chat_icon.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Chat with your video feeds</p>
            <p className="text-xl text-gray-500">
            Interact with your video footage using AI-powered chat. Search, analyze, and extract insights with simple queries.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Turn video into actionable intelligence.
            </p>
          </div>

          <div>
            <img src="/custom_icon.png" width={40} className="py-5" />
            <p className="text-2xl mb-5">Set custom instructions</p>
            <p className="text-xl text-gray-500">
            Define specific rules and alerts tailored to your needs. Automate responses, notifications, and data filtering based on your unique requirements.
            </p>
            <p className="mt-10 italic text-xl text-gray-500">
            Control your system the way you want.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-30 text-center mt-30">
         
            <h2 className="font-bold text-4xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">Let Us Know About Yourself</h2>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
                Interested in learning more or discussing your specific needs? Fill out the form below, and one of our specialists will get in touch.
            </p>
        <form className="w-full max-w-2xl mx-auto text-left bg-white p-8 md:p-10 rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    
                   
                    className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                    required
                />
                </div>
                <div>
                <label htmlFor="designation" className="block text-gray-700 text-lg font-medium mb-2">
                    Designation / Role
                </label>
                <input
                    type="text"
                    id="designation"
                    name="designation"
                    
                   
                    className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    
                    
                    className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                    required
                />
                </div>
                <div>
                <label htmlFor="phone" className="block text-gray-700 text-lg font-medium mb-2">
                    Phone No.
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    
                    
                     className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                />
                </div>
            </div>

            <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">
                Tell us what's on your mind <span className="text-red-500">*</span>
                </label>
                <textarea
                id="message"
                name="message"
                rows="5"
                
                
                className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                required
                ></textarea>
            </div>

            <div className="text-center">
                <button
                type="submit"
                className="bg-black hover:bg-gray-800 transition-colors duration-200 text-white font-bold py-3 px-8 rounded-lg text-xl focus:outline-none focus:shadow-outline shadow-md"
                >
                Submit Inquiry
                </button>
            </div>
            </form>
            </div>
            
            <footer className="bg-gray-800 text-gray-400 py-10 text-center mt-20">
          <p>&copy; {new Date().getFullYear()} Vigil AI. All Rights Reserved.</p>
          {/* Add other footer links if needed */}
      </footer>
    </div>

    
  );
}
