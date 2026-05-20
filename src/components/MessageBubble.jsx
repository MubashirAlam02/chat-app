import BubblePointer from "./BubblePointer";
import MessageText from "./MessageText";
import Timestamp from "./Timestamp";

// A single chat bubble
// It aligns left or right and picks colors based on who sent the message
function MessageBubble({ message }) {
  // Check if the message was sent by the user
  const isUser = message.sender === "user";

  // Get current time for the timestamp
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // Flexbox to align messages to the right for users and left for the bot
    <div
      className={`flex w-full mb-1 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* Wrapper for bubble + pointer */}
      <div
        className={`relative max-w-[75%] sm:max-w-[70%] ${isUser ? "mr-1" : "ml-1"}`}
      >
        {/* Pointer */}
        <BubblePointer isUser={isUser} />

        {/* Bubble */}
        <div
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm ${
            isUser
              ? "bg-blue-500 text-white rounded-b-2xl rounded-bl-2xl rounded-br-md rounded-tl-2xl"
              : "bg-gray-200 text-gray-800 rounded-b-2xl rounded-br-2xl rounded-bl-md rounded-tr-2xl"
          }`}
        >
          <MessageText text={message.text} isUser={isUser} />
          <Timestamp time={time} isUser={isUser} />
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
