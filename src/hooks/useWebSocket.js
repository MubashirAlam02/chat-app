import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:8080";
const RECONNECT_DELAY = 3000;

// Custom hook to manage our WebSocket connection to the server
// Automatically reconnects if we drop the connection
function useWebSocket(onMessage) {
  // WebSocket connection reference
  const wsRef = useRef(null);
  // Connection status state
  const [isConnected, setIsConnected] = useState(false);
  // Error state
  const [error, setError] = useState(null);

  // Function to connect to the WebSocket server
  const connect = () => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    // Handle successful connection
    ws.onopen = () => {
      console.log("Connected to server");
      setIsConnected(true);
      setError(null);
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      try {
        const { message } = JSON.parse(event.data);
        onMessage(message);
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    // Handle connection errors
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Connection error. Reconnecting...");
      setIsConnected(false);
    };

    // Handle connection closed event
    ws.onclose = () => {
      console.log("Disconnected from server. Reconnecting...");
      setIsConnected(false);
      setError("Disconnected. Reconnecting...");
      // Auto reconnect after 3 seconds
      setTimeout(() => connect(), RECONNECT_DELAY);
    };
  };

  // Initialize WebSocket connection when component mounts
  useEffect(() => {
    connect();

    // Clean up the connection when component unmounts
    return () => {
      wsRef.current?.close();
    };
  }, []);

  // Function to send messages to the WebSocket server
  const sendMessage = (message) => {
    // Check if the WebSocket connection is open
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      setError("Not connected. Please wait...");
      return;
    }
    // Send message to server
    wsRef.current.send(JSON.stringify({ message }));
  };

  // Return the send function, connection status, and error state
  return { sendMessage, isConnected, error };
}

export default useWebSocket;
