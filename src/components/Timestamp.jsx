// Shows the time right under the message text
function Timestamp({ time, isUser }) {
  return (
    <div
      className={`text-right text-[10px] mt-1 ${isUser ? "text-blue-100" : "text-gray-400"}`}
    >
      {time}
    </div>
  );
}

export default Timestamp;
