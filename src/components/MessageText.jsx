import { useState } from "react";
import ReadMoreButton from "./ReadMoreButton";

// Maximum number of characters to display before truncating
const CHAR_LIMIT = 500;

// Displays the text inside a message bubble
// Automatically truncates long messages and adds a "Read more" button
function MessageText({ text, isUser }) {
  // State to track whether the message is expanded or not
  const [expanded, setExpanded] = useState(false);
  // Check if the message is long enough to be truncated
  const isLong = text.length > CHAR_LIMIT;

  return (
    <p className="break-words whitespace-pre-wrap">
      {isLong && !expanded ? (
        <>
          {text.slice(0, CHAR_LIMIT)}...{" "}
          <ReadMoreButton
            expanded={false}
            isUser={isUser}
            onClick={() => setExpanded(true)}
          />
        </>
      ) : (
        <>
          {text}
          {isLong && (
            <>
              {" "}
              <ReadMoreButton
                expanded={true}
                isUser={isUser}
                onClick={() => setExpanded(false)}
              />
            </>
          )}
        </>
      )}
    </p>
  );
}

export default MessageText;
