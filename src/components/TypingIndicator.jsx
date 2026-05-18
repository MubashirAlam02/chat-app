function TypingIndicator() {
  return (
    <div className="flex w-full mb-3 justify-start">
      {/* Bot Avatar */}
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-2 shrink-0">
        B
      </div>

      {/* Typing Dots */}
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>
    </div>
  );
}

export default TypingIndicator;
