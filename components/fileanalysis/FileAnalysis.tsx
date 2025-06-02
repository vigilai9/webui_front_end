import { ArrowDown, ArrowUp, Camera, ChevronLeft, ChevronRight, Clock4, Copy, Edit, Ellipsis, EllipsisVertical, FileText, Film, HamIcon, Link, Link2, LinkIcon, LogOut, MoreVertical, PanelRight, Paperclip, Search, Send, Settings, Thermometer, ThumbsDown, ThumbsUp, Timer, Upload, User, X } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';


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

const chatResponse = [
    {
        heading: "I've analyzed the security footage from Camera 2. Here are the key findings:",
        involvement: {
            title: "People Involved",
            peoples: [
                {
                    description: "Person 1 is wearing a a black full sleeve shirt and black pants or white full sleeve shirt and black pants He has dark hair and tall build.",
                    conclusin: "Most likely the main perpetrator of the crime. He might have changed his shirt to white.(Camera 2, 14:32:10)"
                },
                {
                    description: "Person 2 is wearing a a white shirt and grey pants He has dark hair and medium build.",
                    conclusin: "(Camera 2, 14:32:40)"
                },
                {
                    description: "Person 3 is wearing a red shirt and black pants He has dark hair and skinny build.",
                    conclusin: "(Camera 2, 14:32:40)"
                }

            ],
            peopleImage: [
                "imag1",
                "img2",
                "img3"
            ]
        },
        Prominentiems: {
            title: "Prominent Items",
            events: [
                {
                    description: "Yellow Cab (6025 TX), likely SUV (Toyota Crossover)",
                    conclusin: "(Camera 2, 14:32:10)"
                },
                {
                    description: "Black Bag, initially seen in Camera 4, might be an object of contention.",
                    conclusin: "(Camera 2, 14:32:10)"
                },
                {
                    description: "Black Bag, initially seen in Camera 4, might be an object of contention.",
                    conclusin: "(Camera 2, 14:32:10)"
                }
            ],
            objectImage: [
                "imag1",
                "img2",
                "img3"
            ]
        }
    }
]

export interface VideoFile extends File {
    preview?: string;
    estimatedTime?: string;
}

const FileAnalysis = ({ data, files, setFiles }: { data: any, files: any, setFiles: any }) => {



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
            }, index * 0);

            // Save timeout reference
            timeoutsRef.current.push(timeoutId);
        });

        setInputValue('');
    };

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when clicking outside

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const toggleButton = document.querySelector(".user-profile-toggle");
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                event.target !== toggleButton && // Ignore clicks on the toggle button
                !toggleButton?.contains(event.target as Node) // Also check for children of the toggle
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = async (): Promise<void> => {
        console.error("Failed to sign out:");
    };

    const [leftSidebarActive, setLeftSidebarActive] = useState(true);
    const [rightSidebarActive, setRightSidebarActive] = useState(true);
    const [tFile, setTFile] = useState<any>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        console.log("event.target", file?.[0]);
        setTFile(file?.[0]);

        const files = Array.from(event.target.files || []);
        const newVideos = files.map((file) => {
            const videoFile = file as VideoFile;
            videoFile.preview = URL.createObjectURL(file);
            videoFile.estimatedTime = calculateEstimatedTime(file.size);
            return videoFile;
        });

        setFiles((prev: VideoFile[]) => [...prev, ...newVideos]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const calculateEstimatedTime = (fileSize: number): string => {
        const uploadSpeedMbps = 1;
        const fileSizeMB = fileSize / (1024 * 1024);
        const estimatedSeconds = fileSizeMB / uploadSpeedMbps;

        if (estimatedSeconds < 60) {
            return `${Math.ceil(estimatedSeconds)} seconds`;
        } else if (estimatedSeconds < 3600) {
            return `${Math.ceil(estimatedSeconds / 60)} minutes`;
        } else {
            return `${Math.ceil(estimatedSeconds / 3600)} hours`;
        }
    };


    useEffect(() => {
        // Smooth scroll to bottom when new messages arrive
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // This will run every time messages change



    return (
        <main className='w-full h-screen min-h-screen'>
            <nav className='flex justify-between py-2 px-4 border-b'>
                <div className='flex items-center gap-6'>
                    <h2 className='text-xl font-semibold text-[#1b3b5f]'>VigilAI</h2>
                </div>
                <div className='flex items-center gap-4'>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="hidden md:flex items-center gap-4"
                    >
                        <ul className="flex items-center gap-6 lg:gap-8 text-gray-500">
                            <li className="cursor-pointer text-sm option hover-underline">
                                Analytics
                                <div className={`h-[2px] bg-gray-500 hidden`}></div>
                            </li>
                            <li className="cursor-pointer text-sm option hover-underline">
                                Clips/Reports
                                <div className={`h-[2px] bg-gray-500 hidden`}></div>
                            </li>
                            <li className="cursor-pointer text-sm option hover-underline">
                                Live Monitoring
                                <div className={`h-[2px] bg-gray-500 hidden`}></div>
                            </li>
                            <li className="cursor-pointer text-sm option hover-underline">
                                Configure
                                <div className={`h-[2px] bg-gray-500 hidden`}></div>
                            </li>
                        </ul>
                    </motion.div>

                    <div onClick={toggleMenu} className="user-profile-toggle relative w-8 h-8 bg-gray-200 rounded-full cursor-pointer">
                        <img
                            src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        {isOpen && (
                            <div ref={menuRef} className="absolute top-10 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10 ">
                                <div className="px-6 py-1 bg-gray-100 text-white">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden mr-4">
                                            <img
                                                src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-gray-600">
                                            <h3 className="font-semibold text-md">Hi, username!</h3>
                                            <p className="text-xs">userEmail@gmail.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <button className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded cursor-pointer">
                                        <User size={18} className="text-gray-500" />
                                        <span>Manage account</span>
                                    </button>

                                    <button className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded cursor-pointer">
                                        <Settings size={18} className="text-gray-500" />
                                        <span>Settings</span>
                                    </button>

                                    <button onClick={handleSignOut} className="flex items-center space-x-3 w-full px-4 py-1 text-left hover:bg-gray-100 rounded text-red-500 cursor-pointer">
                                        <LogOut size={18} />
                                        <span>Sign out</span>
                                    </button>
                                </div>

                                <div className="p-3 pt-0 text-center">
                                    {/* <p className="text-xs text-gray-400">Secured by <span className="font-medium">Clerk</span></p> */}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
            <div className={`text-gray-600 grid transition-all duration-1000 ease-in-out ${leftSidebarActive && rightSidebarActive ? "grid-cols-[18%_62%_20%]" :
                leftSidebarActive ? "grid-cols-[18%_82%]" :
                    rightSidebarActive ? "grid-cols-[80%_20%]" :
                        "grid-cols-[100%]"
                }`}>
                {
                    leftSidebarActive &&
                    <div className={`transition-all duration-1000 ease-in-out ${leftSidebarActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute w-[18%]'}`}>
                        <div className='flex justify-between items-center px-3 py-2 border-b '>
                            <span className='text-md font-medium'>Chat History</span>
                            <div className='p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-all duration-200'>
                                <ChevronLeft
                                    onClick={() => setLeftSidebarActive(false)}
                                    className='h-5 w-5 text-gray-600 cursor-pointer hover:bg-gray-100 rounded transition-all duration-200'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center mx-3 px-3 mt-2 py-1 border-gray-200 bg-gray-100 border border-gray-200l rounded-full'>
                                <Search className='h-4 w-4 text-gray-600' />
                                <input type="text" placeholder='Search...' className='w-full rounded-full px-2 text-sm placeholder:text-sm outline-none' />
                            </div>
                            <span className='px-3 text-xs font-light'>PREVIOUS</span>
                            <nav className="h-[78vh] cardsSlider overflow-y-auto border-y">
                                <div className='flex flex-col'>
                                    {history.map((history, index) => (
                                        <div
                                            onClick={() => setCurrentChat(index)}
                                            key={index}
                                            className={`relative px-3 justify-between items-center text-black font-normal py-2 cursor-pointer hover:bg-gray-100 transition-all duration-500 ${currentChat == index ? 'bg-gray-100' : ''}`}
                                        >
                                            <div className='flex justify-between'>
                                                <h2 className='font-medium text-[14px]'>Parking Garage inclusive...</h2>
                                                <div className='p- rounded-full p-1 hover:bg-gray-200'>
                                                    <Ellipsis size={16} strokeWidth={0.5} />
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                {
                                                    ["Front Camera", "Lobby Cam2"].map((cam) => {
                                                        return (
                                                            <h2 key={cam} className='text-xs text-gray-400'><span className=''>• </span>{cam}...</h2>
                                                        )
                                                    })
                                                }
                                                <span className='text-xs text-gray-400'>07/2025</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>
                }
                <div className='relative flex flex-col items-center justify-center bg-gray-100 transition-all duration-1000'>
                    <div className='flex flex-col justify-center w-full max-w-3xl'>
                        <div
                            ref={messagesContainerRef}
                            className={`flex justify-center items-center w-full ${messages.length == 0 ? "h-[calc(100vh-70px)]" : "h-[calc(100vh-120px)]"}  overflow-y-auto no-scrollbar px-4`}
                        >

                            {!leftSidebarActive && (
                                <div
                                    onClick={() => setLeftSidebarActive(true)}
                                    className='absolute top-2 left-2 rounded-full cursor-pointer p-1 hover:bg-gray-200 transition-all duration-1000 z-10'
                                >
                                    <PanelRight className='h-5 w-5 text-gray-600' />
                                </div>
                            )}

                            {!rightSidebarActive && (
                                <div
                                    onClick={() => setRightSidebarActive(true)}
                                    className='absolute top-2 right-2 rounded-full cursor-pointer p-1 hover:bg-gray-200 transition-all duration-200 z-10'
                                >
                                    <PanelRight className='h-5 w-5 text-gray-600' />
                                </div>
                            )}

                            <div className="flex items-center justify-center w-full h-full mx-auto">
                                {messages.length === 0 ? (
                                    <div className="text-center flex flex-col w-full py-8 ">
                                        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Welcome to VigilAI!</h1>
                                        {/* <form onSubmit={handleSendMessage} className="w-full flex border  border-red-500">          
                                            <div className='flex flex-col w-full px-4 py-2 bg-gray-200 items-center border border-gray-200 rounded-full'>
                                                <div className='flex justify-between items-center border w-full rounded-full'>
                                                    <textarea
                                                       ref={textareaRef}
                                                       value={inputValue}
                                                       onChange={(e) => setInputValue(e.target.value)}
                                                       onKeyDown={(e) => {
                                                           if (e.key === 'Enter' && !e.shiftKey) {
                                                               handleSendMessage(e);
                                                           }
                                                       }}
                                                       placeholder="Ask your query..."
                                                       className="px-2 py-1 rounded-full text-gray-600 focus:outline-none resize-none overflow-hidden cardsSlider placeholder:text-sm w-full"
                                                       rows={1}
                                                   />
                                                </div>
                                                <div className='flex gap-2 border w-full  rounded-full'>

                                                    <div onClick={handleClick} className='p-1 border border-gray-200 bg-gray-50 cursor-pointer rounded-full'>
                                                       <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        multiple
                                                        accept="video/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                      />
                                                     <Paperclip  className='h-4 w-4'/>
                                                    </div>
                                                  <button className='text-xs px-2 py-1 rounded-full border border-gray-200 bg-gray-50 cursor-pointer'>Deep Search</button>
                                                </div>
                                            </div>
                                        </form> */}
                                        <div className='flex gap-2 px-2 py-1 rounded-full bg-white border border-gray-200 items-center w-full'>
                                            <div className='flex w-full gap-2 items-center'>
                                                <div onClick={handleClick} className='p-1 border border-gray-200 hover:bg-gray-100 cursor-pointer rounded-full'>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        multiple
                                                        accept="video/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                    <Paperclip className='h-4 w-4' />
                                                </div>
                                                <button className='text-xs px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer'>Deep Search</button>
                                                <textarea
                                                    ref={textareaRef}
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            handleSendMessage(e);
                                                        }
                                                    }}
                                                    placeholder="Ask your query..."
                                                    className="py-2 px-2 rounded-full text-gray-600 focus:outline-none resize-none overflow-hidden cardsSlider placeholder:text-sm w-[80%]"
                                                    rows={1}
                                                />
                                            </div>
                                            <div className='p-2 rounded-full bg-[#1b3b5f] text-white cursor-pointer flex justify-end'>
                                                <ArrowUp className='h-4 w-4' />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full flex-col gap-4">
                                        {messages.map((message, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-lg`}
                                                >
                                                    {
                                                        message.isUser ?
                                                            <div>
                                                                <p className="text-center text-sm px-4 py-2 bg-white rounded-md">{message.text}</p>
                                                                <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-400">
                                                                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-800 cursor-pointer">
                                                                        <Edit size={14} />
                                                                    </button>
                                                                    <span>10:15 AM</span>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className=''>
                                                                {
                                                                    chatResponse.map((response, index) => {
                                                                        return (
                                                                            <React.Fragment key={index}>
                                                                                <div className='text-sm p-4 rounded-md'>
                                                                                    <p className='pb-2'>{response.heading}</p>
                                                                                    <h3 className='text-md font-medium pb-2'>{response.involvement.title}</h3>
                                                                                    <div className='pl-2 flex flex-col gap-2 pb-2'>
                                                                                        {
                                                                                            response.involvement.peoples.map((people, index) => {
                                                                                                return (
                                                                                                    <React.Fragment key={index}>
                                                                                                        <div className='flex flex-col text-xs'>
                                                                                                            <div className='flex items-start'>
                                                                                                                <span className='mr-1'>•</span>
                                                                                                                <p className='flex-1'>{people.description}</p>
                                                                                                            </div>
                                                                                                            <span className='text-indigo-500 pl-2'>{people.conclusin}</span>
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                    <div className='flex gap-4'>
                                                                                        {
                                                                                            response.involvement.peopleImage.map((people, index) => {
                                                                                                return (
                                                                                                    <React.Fragment key={index}>
                                                                                                        <div className='border bg-gray-200 rounded'>
                                                                                                            <img className='rounded' src="https://cdn.pixabay.com/photo/2022/03/27/11/23/cat-7094808_1280.jpg" alt={`image${index}`} />
                                                                                                        </div>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex justify-start items-center gap-3 mt-2 text-xs text-gray-400">
                                                                                    <span>10:15 AM</span>
                                                                                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-800 cursor-pointer">
                                                                                        <Copy size={14} />
                                                                                    </button>
                                                                                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-800 cursor-pointer">
                                                                                        <ThumbsUp size={14} />
                                                                                    </button>
                                                                                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-800 cursor-pointer">
                                                                                        <ThumbsDown size={14} />
                                                                                    </button>
                                                                                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-800 cursor-pointer">
                                                                                        <FileText size={14} />
                                                                                    </button>
                                                                                </div>

                                                                            </React.Fragment>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='bg-gray-100 py-2 px-2ß'>
                            {
                                messages.length > 0 ?
                                    <div className='flex gap-2 px-2 py-1 rounded-full bg-white border border-gray-200 items-center w-full'>
                                        <div className='flex w-full gap-2 items-center'>
                                            <div onClick={handleClick} className='p-1 border border-gray-200 hover:bg-gray-100 cursor-pointer rounded-full'>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    multiple
                                                    accept="video/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <Paperclip className='h-4 w-4' />
                                            </div>
                                            <button className='text-xs px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer'>Deep Search</button>
                                            <textarea
                                                ref={textareaRef}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        handleSendMessage(e);
                                                    }
                                                }}
                                                placeholder="Ask your query..."
                                                className="py-2 px-2 rounded-full text-gray-600 focus:outline-none resize-none overflow-hidden cardsSlider placeholder:text-sm w-[80%]"
                                                rows={1}
                                            />
                                        </div>
                                        <div className='p-2 rounded-full bg-[#1b3b5f] text-white cursor-pointer flex justify-end'>
                                            <ArrowUp className='h-4 w-4' />
                                        </div>
                                    </div> : ""
                            }
                        </div>
                    </div>
                </div>
                {
                    rightSidebarActive &&
                    <div className={`border-l transition-all duration-1000 ease-in-out ${rightSidebarActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                        <div className='flex gap-4 items-center justify-between px-3 py-2 border-b'>
                            <div className='flex gap-4 items-center'>
                                <div className='p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-all duration-200'>
                                    <ChevronRight
                                        onClick={() => setRightSidebarActive(false)}
                                        className='h-5 w-5 text-gray-600'
                                    />
                                </div>
                                <span className='text-md font-medium'>Files</span>
                            </div>
                            {/* <div onClick={handleClick} className='p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-all duration-200'>
                             <input
                               ref={fileInputRef}
                               type="file"
                               multiple
                               accept="video/*"
                               onChange={handleFileChange}
                               className="hidden"
                             />
                            <Paperclip  className='h-4 w-4 text-gray-600'/>
                           </div> */}
                        </div>

                        <div
                            className={`bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out`}
                        >
                            <nav className="border-t h-[calc(100vh-95px)] cardsSlider overflow-y-auto">
                                <ul className='pt-1'>
                                    {/* Collapsible Video Section */}
                                    {
                                        files.length > 2 ?
                                            <div className="space-y-2 border-b">
                                                <div className={`flex flex-col gap-1 px-2 ${files.length > 3 ? 'max-h-42 pr-1 overflow-y-auto no-scrollbar px-2 ' : ''}`}> {/* Added scroll container */}
                                                    {files.map((video: any, index: number) => (
                                                        <div
                                                            key={`${video.name}-${index}`}
                                                            className="rounded p-1 border border-gray-200 hover:bg-gray-50 flex items-center gap-3 group relative mb-1 hover:translate-y-0.5 transition-all duration-300 hover:shadow-md"
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
                                            :
                                            <div className='px-2 w-full max-w-md'>
                                              <div className="border-2 py-4 border-dashed border-gray-300 hover:border-indigo-300 rounded flex flex-col items-center justify-center p-2 text-center transition-all duration-300">
                                                <input
                                                   ref={fileInputRef}
                                                   type="file"
                                                   multiple
                                                   accept="video/*"
                                                   onChange={handleFileChange}
                                                   className="hidden"
                                                />

                                                <div className="flex flex-col items-center gap-1">
                                                    <div onClick={handleClick} className="text-gray-500 ">
                                                       <Upload className='h-6 w-6'/>
                                                    </div>

                                                    <div className="flex flex-col items-center text-gray-600">
                                                        <p className='font-semibold text-sm'>Drop files here</p>
                                                        <span className="my-2">or click to browse</span>
                                                        <label
                                                            // htmlFor={id}
                                                            onClick={handleClick} 
                                                            className="bg-[#1b3b5f] text-sm text-white px-4 py-1 rounded cursor-pointer hover:bg-[#23466e] transition-colors"
                                                        >
                                                            Choose Files
                                                        </label>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                    }


                                    {/* Collapsible Cards Section */}
                                    <div className="px-2">
                                        <div className="space-y-2 mt-2">
                                            {data.map((event: any, index: number) => (
                                                <div key={index} className="bg-white rounded overflow-hidden border border-gray-200 hover:translate-y-0.5 transition-all duration-300 hover:shadow-md">
                                                    <div className="p-2">
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="text-md font-medium text-gray-800">{event.video_embedding.actions.slice(0, 20)}...</h3>
                                                            <span className='text-gray-300 text-xs'>2 minutes ago</span>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-1">{event.video_embedding.actions.length > 120 ? `${event.video_embedding.actions.slice(0, 120)}.....` : event.video_embedding.actions}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2 py-1 px-2">
                                                        <div className='flex items-center gap-1'>
                                                            <Clock4 className='text-gray-300 h-3 w-3' />
                                                            <span className="text-xs text-gray-400">{event.scene_timestamp} - {event.scene_timestamp}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-[10px] font-normal ${event.video_embedding.severity_rating >= 7 ? "bg-red-100 text-red-800" :
                                                            event.video_embedding.severity_rating >= 5 ? "bg-yellow-100 text-yellow-800" :
                                                                "bg-green-100 text-green-800"
                                                            }`}>
                                                            {event.video_embedding.severity_rating >= 7 ? "HIGH" : event.video_embedding.severity_rating >= 5 ? "MEDIUM" : "LOW"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {data.map((event: any, index: number) => (
                                                <div key={index} className="bg-white rounded overflow-hidden border border-gray-200 hover:translate-y-0.5 transition-all duration-300 hover:shadow-md">
                                                    <div className="p-2">
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="text-md font-medium text-gray-800">{event.video_embedding.actions.slice(0, 20)}...</h3>
                                                            <span className='text-gray-300 text-xs'>2 minutes ago</span>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-1">{event.video_embedding.actions.length > 120 ? `${event.video_embedding.actions.slice(0, 120)}.....` : event.video_embedding.actions}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2 py-1 px-2">
                                                        <div className='flex items-center gap-1'>
                                                            <Clock4 className='text-gray-300 h-3 w-3' />
                                                            <span className="text-xs text-gray-400">{event.scene_timestamp} - {event.scene_timestamp}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded text-[10px] font-normal ${event.video_embedding.severity_rating >= 7 ? "bg-red-100 text-red-800" :
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
                            <div className='flex justify-center absolute bottom-2 right-2 w-full'>
                                <button className='flex items-center gap-2 px-6 py-1 bg-[#1b3b5f] text-white rounded-md'> <span><ArrowDown className="h-5 w-5 font-bold" /></span>Download Reports</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}

export default FileAnalysis;