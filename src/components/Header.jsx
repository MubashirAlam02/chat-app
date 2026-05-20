// The top bar showing the assistant's name and avatar
function Header() {
  return (
    <div className="bg-blue-500 px-4 py-3 flex items-center gap-3 shadow">
      {/* Assistant logo */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold text-xs sm:text-sm shrink-0">
        B
      </div>
      {/* Assistant name and description */}
      <div>
        {/* Assistant name */}
        <p className="text-white font-semibold text-sm sm:text-base">
          Flight Booking Assistant
        </p>
        {/* Assistant description */}
        <p className="text-blue-100 text-xs">Powered by Dialogflow ES</p>
      </div>
    </div>
  );
}

export default Header;
