import { useState } from "react";

const MAX_CHARACTERS = 1500;

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_CHARACTERS) {
      setInput(e.target.value);
    }
  };

  const remaining = MAX_CHARACTERS - input.length;
  const isNearLimit = remaining <= 50;

  return (
    <div className="flex flex-col border-t border-gray-200 bg-white">
      {/* Character counter - only shows when near limit */}
      {isNearLimit && (
        <div
          className={`text-right px-4 pt-2 text-xs ${remaining <= 20 ? "text-red-500" : "text-gray-400"}`}
        >
          {remaining} characters remaining
        </div>
      )}

      <div className="flex items-center gap-2 p-3 sm:p-4">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-gray-300 outline-none focus:border-blue-500 text-xs sm:text-sm"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
