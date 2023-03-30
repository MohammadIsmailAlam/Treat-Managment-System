import React from "react";

export default function Note({ note }) {
  return (
    <div className="wavy">
      {note.split(" ").map((word, index) => (
        <span style={{ "--i": index + 1 }}>{word}&nbsp;</span>
      ))}
    </div>
  );
}
