function BubblePointer({ isUser }) {
  return isUser ? (
    <div className="absolute -right-1.5 top-0 w-0 h-0 border-l-[8px] border-l-blue-500 border-b-[8px] border-b-transparent" />
  ) : (
    <div className="absolute -left-1.5 top-0 w-0 h-0 border-r-[8px] border-r-gray-200 border-b-[8px] border-b-transparent" />
  );
}

export default BubblePointer;
