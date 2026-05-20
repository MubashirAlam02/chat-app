// Just a little triangle that points left or right depending on who sent the message
// This makes the chat bubbles look more like real chat bubbles
function BubblePointer({ isUser }) {
  return isUser ? (
    // User message pointer (points right)
    <div className="absolute -right-1.5 top-0 w-0 h-0 border-l-[8px] border-l-blue-500 border-b-[8px] border-b-transparent" />
  ) : (
    // AI message pointer (points left)
    <div className="absolute -left-1.5 top-0 w-0 h-0 border-r-[8px] border-r-gray-200 border-b-[8px] border-b-transparent" />
  );
}

export default BubblePointer;
