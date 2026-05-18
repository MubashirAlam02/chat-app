import { useState } from "react";
import ReadMoreButton from "./ReadMoreButton";

const CHAR_LIMIT = 500;

function MessageText({ text, isUser }) {
  const [expanded, setExpanded] = useState(false);
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
