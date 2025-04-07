import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import webSocketService from "@/services/websocket_service";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Setup WebSocket connection and event handlers
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

    const handleError = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };

    const handleMessage = (data) => {
      console.log("Received message:", data);
      if (data.type === "response") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.data.response || data.data.message || "No response",
          },
        ]);
        setLoading(false);
      } else if (data.type === "error") {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Error: ${data.message}` },
        ]);
        setLoading(false);
      }
    };

    // Register event handlers
    webSocketService
      .on("connect", handleConnect)
      .on("disconnect", handleDisconnect)
      .on("error", handleError)
      .on("message", handleMessage);

    // Clean up event handlers when component unmounts
    return () => {
      webSocketService
        .off("connect", handleConnect)
        .off("disconnect", handleDisconnect)
        .off("error", handleError)
        .off("message", handleMessage);
    };
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "") return;
    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }

    const userMessage = input.trim();

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);
    setInput("");
    setLoading(true);

    try {
      // If we don't have a chat_id yet, create one
      const currentChatId = chatId || `chat_${currentUser.uid}_${Date.now()}`;
      if (!chatId) {
        setChatId(currentChatId);
      }

      // Send message via WebSocket
      await webSocketService.sendMessage(userMessage, currentChatId);

      // Note: We don't add a bot response here - it will come from the WebSocket message handler
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error sending message: ${error.message}` },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot bg-white border rounded-xl shadow-lg w-full h-[500px] flex flex-col overflow-hidden">
      <div className="chat-header bg-gray-50 p-4 border-b">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <span
            className={`h-3 w-3 ${
              connected ? "bg-green-500" : "bg-red-500"
            } rounded-full mr-2 animate-pulse`}
          ></span>
          VigilAI Assistant {connected ? "(Connected)" : "(Disconnected)"}
        </h3>
      </div>

      <div className="chat-messages flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-center">
            <div>
              <svg
                className="w-12 h-12 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p>Ask me anything about your video!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-tl-none flex items-center">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area p-4 border-t">
        <div className="flex items-center bg-gray-50 rounded-full border overflow-hidden pl-4 pr-1 py-1">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me something..."
            disabled={!connected}
          />
          <button
            onClick={handleSend}
            disabled={loading || input.trim() === "" || !connected}
            className={`ml-2 p-2 rounded-full ${
              loading || input.trim() === "" || !connected
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-colors`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
