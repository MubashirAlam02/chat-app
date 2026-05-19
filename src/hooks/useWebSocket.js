import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:8080";
const RECONNECT_DELAY = 3000;

function useWebSocket(onMessage) {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const connect = () => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const { message } = JSON.parse(event.data);
        onMessage(message);
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Connection error. Reconnecting...");
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from server. Reconnecting...");
      setIsConnected(false);
      setError("Disconnected. Reconnecting...");
      // Auto reconnect after 3 seconds
      setTimeout(() => connect(), RECONNECT_DELAY);
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      setError("Not connected. Please wait...");
      return;
    }
    wsRef.current.send(JSON.stringify({ message }));
  };

  return { sendMessage, isConnected, error };
}

export default useWebSocket;
