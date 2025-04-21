import React, { useEffect, useRef, useState } from 'react';
import { PanelRight, Film, X, Timer, ArrowUp, Menu} from 'lucide-react';
import webSocketService from "@/services/websocket_service";
import { useAuth } from "@/contexts/AuthContext";
import { VideoFile } from './FileUpload';

const history = [
  "This app creates",
  "React dev writes code",
  "A developer builds",
  "My friend tests project",
  "Your code deploys backend",
  "Just say the word if",
  "They push to prod",
  "We debug live",
  "She refactors code",
  "I test edge cases",
  "He builds UI",
  "The server restarts",
  "Our app talks JSON",
  "New features drop soon",
  "Logs tell the truth",
  "Data flows strong"

]

const Chats: React.FC<any> = ({ data, files }) => {
  console.log("data and files", data, files);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoCollapsed, setIsVideoCollapsed] = useState(false);
  const [isCardsCollapsed, setIsCardsCollapsed] = useState(false);

  const [currentChat, setCurrentChat] = useState<number>(0);


  const [connected, setConnected] = useState(false);
  const stopRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const [searchHistory, setSearchHistory] = useState<string[]>(history);
  const [filterHistory, setFilterHistory] = useState<string[]>(history);
  const [searchText, setSearchText] = useState("");


  const { currentUser } = useAuth();
  console.log("stop", stop);
  // Auto-focus input and scroll to bottom
  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!currentUser) return;

    // Try to connect
    const connectWebSocket = async () => {
      try {
        await webSocketService.connect();
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error);
      }
    };

    connectWebSocket();

    // Set up WebSocket event listeners
    const handleConnect = () => {
      console.log("WebSocket connected");
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    const handleError = (error: any) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };

    // const handleMessage = (data) => {
    //   console.log("Received message KKUUMER:", data);
    //   if (data.type === "response") {
    //     setMessages((prev) => [
    //       ...prev,
    //       {
    //         sender: "bot",
    //         text: data.data.response || data.data.message || "No response",
    //       },
    //     ]);
    //     setLoading(false);
    //   } else if (data.type === "error") {
    //     setMessages((prev) => [
    //       ...prev,
    //       { sender: "bot", text: `Error: ${data.message}` },
    //     ]);
    //     setLoading(false);
    //   }
    // };

    // Register event handlers
    webSocketService
      .on("connect", handleConnect)
      .on("disconnect", handleDisconnect)
      .on("error", handleError)
    // .on("message", handleMessage);

    // Clean up event handlers when component unmounts
    return () => {
      webSocketService
        .off("connect", handleConnect)
        .off("disconnect", handleDisconnect)
        .off("error", handleError)
      // .off("message", handleMessage);
    };
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const xx = "Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else!Just say the word if you want me to actually write that 1000-line story—or help with anything else!"
  // const xx = "Just say the word if you want me to";

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    if (isLoading) return;

    setIsLoading(true);
    stopRef.current = false; // Reset stop flag
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    let currentText = '';
    const words = xx.split(' ');

    words.forEach((word, index) => {
      const timeoutId = setTimeout(() => {
        if (stopRef.current) {
          setIsLoading(false);
          return;
        }

        currentText += (index === 0 ? '' : ' ') + word;
        const botMessage = {
          text: currentText,
          isUser: false
        };

        setMessages(prev => {
          const lastUserMessageIndex = [...prev].reverse().findIndex(msg => msg.isUser);
          if (lastUserMessageIndex === -1) {
            return [...prev, botMessage];
          }
          const messagesTillUser = prev.slice(0, prev.length - lastUserMessageIndex);
          return [...messagesTillUser, botMessage];
        });

        if (index === words.length - 1) {
          setIsLoading(false);
        }
      }, index * 60);

      // Save timeout reference
      timeoutsRef.current.push(timeoutId);
    });

    setInputValue('');
  };


  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    setIsRightSidebarOpen(false); // Close right sidebar when opening left
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
    setIsLeftSidebarOpen(false); // Close left sidebar when opening right
  };

  const handleStop = () => {
    stopRef.current = true;
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = []; // Clear timeouts list
    setIsLoading(false);
  };

  useEffect(()=>{
   const response = searchHistory.filter((item)=>{
      return item.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
   })
   setFilterHistory(response)

  }, [searchText]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white relative">
      {/* Left Hamburger Menu Button */}
      <button
        onClick={toggleLeftSidebar}
        className="fixed top-4 left-4 z-50  cursor-pointer rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
      >
        <Menu className='text-sm h-4 w-4' />
      </button>

      {/* Right Hamburger Menu Button */}
      <button
        onClick={toggleRightSidebar}
        className="fixed top-4 cursor-pointer right-4 z-50 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
      >
        <PanelRight className='text-sm h-4 w-4' />
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-58 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4">
        </div>
        <div className='px-4 pt-2'>
          <input type="text" onChange={(e)=>setSearchText(e.target.value)} placeholder='search...' className='border border-gray-200 px-2 py-1 focus:outline-none text-gray-600  rounded' />
        </div>
        <nav className="mt-4 border-t h-[calc(100vh-50px)] cardsSlider overflow-y-auto">
          <div className='flex flex-col gap-1 py px-2'>
            {
              filterHistory.map((history, index) => {
                return (
                  <div
                    onClick={() => setCurrentChat(index)}
                    key={index}
                    className={`relative flex items-center px-2 py-1 cursor-pointer rounded hover:bg-gray-200 ${index == currentChat ? "bg-gray-300" : ""}`}
                  >
                    {history}
                  </div>
                )
              })
            }
          </div>
        </nav>
      </div>

      {/* Right Sidebar */}
      {/* <div 
        className={`fixed top-0 right-0 h-full w-76 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
        </div>
        <nav className="mt-4 border-t h-[calc(100vh-50px)] cardsSlider overflow-y-auto">
          <ul className='pt-4'>
            <EventCards data={data}/>
            <EventCards data={data}/>
          </ul>
        </nav>
      </div> */}


      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-76 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4">
          {/* Add a header or controls here if needed */}
        </div>
        <nav className="mt-4 border-t h-[calc(100vh-50px)] cardsSlider overflow-y-auto">
          <ul className='pt-2'>
            {/* Collapsible Video Section */}

            <div className="space-y-2 px-2">
              {/* <button 
    className="flex justify-between items-center w-full py-2 text-left font-medium"
    onClick={() => setIsVideoCollapsed(!isVideoCollapsed)}
  >
    <span>Videos</span>
    <ChevronDown className={`h-4 w-4 transform transition-transform ${isVideoCollapsed ? 'rotate-180' : ''}`} />
  </button> */}
              {!isVideoCollapsed && (
                <div className={`${files.length > 3 ? 'max-h-42 pr-1 overflow-y-auto cardsSlider' : ''}`}> {/* Added scroll container */}
                  {files.map((video: VideoFile, index: number) => (
                    <div
                      key={`${video.name}-${index}`}
                      className="border border-gray-200 rounded p-1 flex items-center gap-3 group relative transition-all duration-500 transform hover:translate-y-0.5 mb-2"
                    >
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Film className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {video.name.length > 20 ? `${video.name.slice(0, 20)}...` : video.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(video.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        className="absolute top-2 right-2 p-1 rounded-full text-transparent group-hover:text-gray-400 hover:text-red-500 hover:bg-red-100 cursor-pointer transition-all duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Cards Section */}
            <div className="px-2">
              {/* <button 
          className="flex justify-between items-center w-full py-2 text-left font-medium"
          onClick={() => setIsCardsCollapsed(!isCardsCollapsed)}
        >
          <span>Event Cards</span>
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isCardsCollapsed ? 'rotate-180' : ''}`} />
        </button> */}
              {!isCardsCollapsed && (
                <div className="space-y-2 mt-2">
                  {data.map((event: any, index: number) => (
                    <div key={index} className="bg-white rounded overflow-hidden border border-gray-200">
                      <div className="p-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-semibold text-gray-800">{event.video_embedding.actions.slice(0, 35)}...</h3>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{event.video_embedding.actions.length > 160 ? `${event.video_embedding.actions.slice(0, 160)}.....` : event.video_embedding.actions}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2 bg-gray-50 px-4 py-1 border-t border-gray-200">
                        <div className='flex items-center gap-1'>
                          <Timer className='text-gray-500 h-4 w-4' />
                          <span className="text-sm text-gray-500">{event.scene_timestamp}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${event.video_embedding.severity_rating >= 7 ? "bg-red-100 text-red-800" :
                            event.video_embedding.severity_rating >= 5 ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                          }`}>
                          {event.video_embedding.severity_rating >= 7 ? "High" : event.video_embedding.severity_rating >= 5 ? "Medium" : "Low"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>



      {/* Overlay when either sidebar is open */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div
          className="fixed bg-opacity-50 z-30"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}

      {/* Main content */}
      <div
        ref={messagesContainerRef}
        className={`w-full ${messages.length === 0 ? 'flex items-center justify-center' : ''}`}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <div className="w-full max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center px-4 py-8 pt-[35vh]">
              <h1 className="text-2xl font-semibold text-gray-700 mb-6">Welcome to VigilAI!</h1>

              <form onSubmit={handleSendMessage} className="w-full max-w-2xl px-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    disabled={!connected}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-8 py-6 pr-16 rounded-xl bg-gray-200 text-gray-600 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4 pb-32">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded py-2 ${message.isUser
                        ? 'text-black px-4 my-2 shadow-sm'
                        : ' text-black px-4 my-2 shadow-sm'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom input */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 bg-white inset-x-0 pb-4 pt-2">
          <form onSubmit={handleSendMessage} className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-8 py-6 pr-16 rounded-xl bg-gray-200 text-gray-600 focus:outline-none focus:border-gray-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button
                  type="submit"
                  className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 transition-all duration-500 border border-gray-300"
                >
                  {
                    isLoading ?
                      <div onClick={handleStop} className="relative w-5 h-5 flex items-center justify-center cursor-pointer">
                        <div className="absolute rounded bg-gray-700 p-2" />
                      </div>
                      :
                      <ArrowUp className={`${inputValue ? "text-indigo-500" : ""} `} />
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chats
