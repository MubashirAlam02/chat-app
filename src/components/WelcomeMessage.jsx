function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 px-4">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
      <p className="font-semibold text-gray-500 text-sm sm:text-base">
        Flight Booking Assistant
      </p>
      <p className="text-xs sm:text-sm mt-1">Type a message to get started!</p>
    </div>
  );
}

export default WelcomeMessage;
