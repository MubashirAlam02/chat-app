import { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:8080";

function useWebSocket(onMessage) {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const { message } = JSON.parse(event.data);
      onMessage(message);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    };

    // Cleanup on unmount
    return () => ws.close();
  }, []);

  const sendMessage = (message) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }
    wsRef.current.send(JSON.stringify({ message }));
  };

  return { sendMessage, isConnected };
}

export default useWebSocket;
