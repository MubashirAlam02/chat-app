import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import Header from "./Header";
import WelcomeMessage from "./WelcomeMessage";
import useWebSocket from "../hooks/useWebSocket";
import ErrorBanner from "./ErrorBanner";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleBotMessage = (message) => {
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "bot", text: message },
    ]);
  };

  const { sendMessage, isConnected, error } = useWebSocket(handleBotMessage);

  const handleSend = (text) => {
    if (!isConnected) {
      console.error("WebSocket is not connected");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text }]);

    // Show typing indicator
    setIsTyping(true);

    // Send message to server
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Connection Error Banner */}
      {error && <ErrorBanner message={error} />}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Welcome Message */}
        {messages.length === 0 && <WelcomeMessage />}

        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={!isConnected} />
    </div>
  );
}

export default ChatWindow;
