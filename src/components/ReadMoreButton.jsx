// A tiny toggle button to expand or collapse long text
function ReadMoreButton({ expanded, isUser, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold inline cursor-pointer underline ${
        isUser ? "text-blue-100" : "text-blue-500"
      }`}
    >
      {expanded ? "Read less" : "Read more"}
    </button>
  );
}

export default ReadMoreButton;
