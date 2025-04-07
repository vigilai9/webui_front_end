// services/websocket_service.js
import { auth } from "../firebaseconfig";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {
      message: [],
      connect: [],
      disconnect: [],
      error: [],
    };
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000; // 3 seconds
    this.endpoint =
      process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT ||
      "wss://zknl2c0q8f.execute-api.us-east-2.amazonaws.com/Production/";
  }

  // Connect to WebSocket with Firebase token
  async connect() {
    if (this.isConnecting || this.socket?.readyState === WebSocket.OPEN) {
      return true; // Already connected or connecting
    }

    this.isConnecting = true;

    try {
      // Get current user and token
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const token = await user.getIdToken();

      // Close existing connection if any
      if (this.socket) {
        this.socket.close();
      }

      // Create new WebSocket connection with token in query string
      const wsUrl = `${this.endpoint}?token=${token}`;
      this.socket = new WebSocket(wsUrl);

      // Set up event handlers
      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.callbacks.connect.forEach((callback) => callback());
      };

      this.socket.onclose = (event) => {
        console.log(
          `WebSocket disconnected. Code: ${event.code}, Reason: ${event.reason}`
        );
        this.isConnecting = false;
        this.callbacks.disconnect.forEach((callback) => callback());

        // Attempt to reconnect if closed unexpectedly
        if (
          event.code !== 1000 &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          this.reconnectAttempts++;
          console.log(
            `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
          );
          setTimeout(() => this.connect(), this.reconnectInterval);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnecting = false;
        this.callbacks.error.forEach((callback) => callback(error));
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);
          this.callbacks.message.forEach((callback) => callback(data));
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      return true;
    } catch (error) {
      console.error("Error connecting to WebSocket:", error);
      this.isConnecting = false;
      this.callbacks.error.forEach((callback) => callback(error));
      return false;
    }
  }

  // Send a message through the WebSocket
  async sendMessage(message, chat_id = null) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      // Try to reconnect if not connected
      const connected = await this.connect();
      if (!connected) {
        throw new Error("WebSocket not connected");
      }
    }

    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Format message with action for routing
    const payload = JSON.stringify({
      action: "send_message",
      message,
      chat_id: chat_id || `chat_${user.uid}_${Date.now()}`, // Create chat_id if not provided
      user_id: user.uid,
    });

    this.socket.send(payload);
  }

  // Add event listeners
  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }
    return this;
  }

  // Remove event listeners
  off(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(
        (cb) => cb !== callback
      );
    }
    return this;
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close(1000, "User initiated disconnect");
      this.socket = null;
    }
  }
}

// Export a singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;
