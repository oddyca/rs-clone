import React, { useState } from "react";
import { TParticipantProps } from "../../../AppTypes";

function Participant(props: TParticipantProps) {
  const [displayCloseBtn, setDisplayCloseBtn] = useState("none");
  const { participant } = props;

  return (
    <div
      className="participant"
      onMouseOver={() => setDisplayCloseBtn("")}
      onMouseLeave={() => setDisplayCloseBtn("none")}
    >
      <div className="participant-icon" />
      <div className="participant-title">{participant}</div>
      <div
        style={{ display: displayCloseBtn }}
        className="participant-del-btn"
        onClick={() => {
          console.log(`participant ${participant} onClick`);
        }}
      >
        ➖
      </div>
    </div>
  );
}

export default Participant;
