import { Camera, ChevronLeft, ChevronRight, Clock4, EllipsisVertical, FileText, Film, Search, Timer, X } from 'lucide-react'
import React, { useRef, useState } from 'react'


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
    "Data flows strong",
    "She refactors code",
    "I test edge cases",
    "He builds UI",
    "The server restarts",
    "Our app talks JSON",
    "New features drop soon",
    "Logs tell the truth",
    "Data flows strong",
    "Our app talks JSON",
    "New features drop soon",
    "Logs tell the truth",
    "Data flows strong",
    "She refactors code",
    "I test edge cases",
    "He builds UI",
    "The server restarts",
    "Our app talks JSON",
    "New features drop soon",
    "Logs tell the truth",
    "Data flows strong"
]

const FileAnalysis = ({ data, files }: { data: any, files: any }) => {

    const [currentChat, setCurrentChat] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    const stopRef = useRef(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const xx = "Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else! Just say the word if you want me to actually write that 1000-line story—or help with anything else!Just say the word if you want me to actually write that 1000-line story—or help with anything else!"

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


    return (
        <main className='w-full h-screen min-h-screen'>
            <nav className='flex justify-between py-2 px-4 border-b'>
                <div className='flex items-center gap-6'>
                    <h2 className='text-xl font-semibold'>Video Forensic</h2>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 px-3 py-2 text-gray-600 font-light bg-gray-100 rounded-full'>
                            <Camera className='h-4 w-4 font-light' />
                            <span>
                                Live Monitoring
                            </span>
                        </div>
                        <div className='flex items-center gap-2 px-3 py-2 text-gray-600 font-light bg-gray-100 rounded-full'>
                            <FileText className='h-4 w-4 font-light' />
                            <span>
                                Reports/Clips
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-6'>
                    <EllipsisVertical className='h-5 w-5' />
                    <div className=' bg-gray-200 p-2 rounded-full'>
                        <div className='flex items-center justify-center h-4 w-4 font-semibold'>V</div>
                    </div>
                </div>
            </nav>
            <div className='grid grid-cols-[18%_62%_20%] text-gray-600'>
                <div className=''>
                    <div className='flex justify-between items-center px-3 py-3 border-b'>
                        <span className='text-lg font-medium'>Chat History</span>
                        <ChevronLeft className='h-5 w-5 text-gray-600' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center mx-3 px-3 my-3 border-gray-200 bg-gray-100 border border-gray-200l rounded-full'>
                            <Search className='h-4 w-4 text-gray-600' />
                            <input type="text" placeholder='Search...' className='w-full rounded-full px-2 py-1 placeholder:text-xs' />
                        </div>
                        <span className='px-3 text-xs font-light'>PREVIOUS</span>
                        <nav className="h-[72vh] cardsSlider overflow-y-auto">
                            <div className='flex flex-col '>
                                {
                                    history.map((history, index) => {
                                        return (
                                            <div
                                                onClick={() => setCurrentChat(index)}
                                                key={index}
                                                className={`relative px-3 flex justify-between items-center text-black font-normal py-2 cursor-pointer hover:bg-gray-100 border-b transition-all duration-500 ${currentChat == index ? 'bg-gray-100' : ''}`}
                                            >
                                                <div>
                                                    <h2 className='font-medium text-[16px]'>Parking Garage inc...</h2>
                                                    <p className='text-xs'>Lorem ipsum dolor sit amet hds dsbd sdhjsdsndsd n.</p>
                                                </div>
                                                <span className='text-xs text-gray-400'>12/07/2025</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </nav>
                    </div>
                </div>
                <div className='border-x h-full'>
                    <div className='flex justify-center items-center py-3 border-b'>
                        <span className='text-lg font-medium'>Video Forensic Analysis</span>
                    </div>
                    <div
                        ref={messagesContainerRef}
                        className={`h-full flex justify-center items-center`}
                    // style={{ maxHeight: 'calc(100vh - 100px)' }}
                    // w-full h-full border border-red-500 max-w-3xl flex justify-center
                    >
                        <div className="flex items-center justify-center w-full h-full mx-auto max-w-2xl">
                            {messages.length === 0 ? (
                                <div className="text-center flex flex-col w-full  py-8 ">
                                    <h1 className="text-2xl font-semibold text-gray-700 mb-6">Welcome to VigilAI!</h1>
                                    <form onSubmit={handleSendMessage} className="w-full">
                                        <div className="relative">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                // disabled={!connected}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Message VigilAI.."
                                                className="w-full px-6 py-6 pr-16 rounded-xl bg-gray-200 text-gray-600 focus:outline-none border focus:border-gray-300"
                                            />
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 pb-32">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg py-2 ${message.isUser
                                                    ? 'text-black  my-2 shadow-sm'
                                                    : ' text-black my-2'
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
                    {
                        messages.length > 0 ? <div className='border border-pink-600'>
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleSendMessage(e);
                                    }
                                }}
                                placeholder="Type your message..."
                                className="border border-green-600 w-full py-2 px-4 bg-gray-100 text-gray-600 focus:outline-none resize-none overflow-hidden cardsSlider placeholder:text-sm"
                                rows={1}
                            />
                        </div> : ""
                    }
                </div>
                <div className='border-r'>
                    <div className='flex justify-between items-center px-3 py-3 border-b'>
                        <span className='text-lg font-medium'>Chat History</span>
                        <ChevronRight className='h-5 w-5 text-gray-600' />
                    </div>

                    <div
                        className={`h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out`}
                    >
                        <nav className="border-t h-[calc(100vh-50px)] cardsSlider overflow-y-auto">
                            <ul className='pt-2'>
                                {/* Collapsible Video Section */}

                                <div className="space-y-2 border-b">
                                    <div className={`flex flex-col gap-1 ${files.length > 3 ? 'max-h-42 pr-1 overflow-y-auto cardsSlider px-2 ' : ''}`}> {/* Added scroll container */}
                                        {files.map((video: any, index: number) => (
                                            <div
                                                key={`${video.name}-${index}`}
                                                className="rounded p-1 border border-gray-100 shadow hover:shadow-md hover:bg-gray-50 flex items-center gap-3 group relative transition-all duration-500 transform  mb-2"
                                            >
                                                <div className="bg-gray-100 p-2 rounded">
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
                                </div>

                                {/* Collapsible Cards Section */}
                                <div className="px-2">
                                    <div className="space-y-2 mt-2">
                                        {data.map((event: any, index: number) => (
                                            <div key={index} className="bg-white rounded overflow-hidden border border-gray-200">
                                                <div className="p-2">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-md font-medium text-gray-800">{event.video_embedding.actions.slice(0, 15)}...</h3>
                                                        <span className='text-gray-300 text-xs'>2 minutes ago</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-2">{event.video_embedding.actions.length > 80 ? `${event.video_embedding.actions.slice(0, 80)}.....` : event.video_embedding.actions}</p>
                                                </div>
                                                <div className="flex items-center justify-between gap-2 py-1 px-2">
                                                    <div className='flex items-center gap-1'>
                                                        <Clock4 className='text-gray-300 h-3 w-3' />
                                                        <span className="text-xs text-gray-400">{event.scene_timestamp} - {event.scene_timestamp}</span>
                                                    </div>
                                                    <span className={`px-3 py-2 rounded text-xs font-normal ${event.video_embedding.severity_rating >= 7 ? "bg-red-100 text-red-800" :
                                                        event.video_embedding.severity_rating >= 5 ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-green-100 text-green-800"
                                                        }`}>
                                                        {event.video_embedding.severity_rating >= 7 ? "HIGH" : event.video_embedding.severity_rating >= 5 ? "MEDIUM" : "LOW"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ul>
                        </nav>
                    </div>


                </div>
            </div>
        </main>
    )
}

export default FileAnalysis