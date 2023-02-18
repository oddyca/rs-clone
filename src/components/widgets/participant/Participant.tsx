import React, { useState } from "react";
import { TParticipantProps } from "../../../AppTypes";

function Participant(props: TParticipantProps) {
  const [displayCloseBtn, setDisplayCloseBtn] = useState("none");
  const { participant } = props;
  const { setCurrentWorkspaceId } = props;
  const { WORKSPACE_ID } = props;
  const { setParticipant } = props;
  const { partObj } = props;
  const { userLogo } = props;

  return (
    <div
      className="participant"
      onMouseOver={() => setDisplayCloseBtn("")}
      onMouseLeave={() => setDisplayCloseBtn("none")}
    >
      <div className="participant-icon" >
        <img src={partObj != undefined ? partObj.PARTICIPANT_LOGO : userLogo} />
      </div>
      <div className="participant-title">{participant}</div>
      <div
        style={{ display: displayCloseBtn }}
        className="participant-del-btn"
        onClick={() => {
          setCurrentWorkspaceId(WORKSPACE_ID);
          setParticipant(WORKSPACE_ID, participant, "del");
        }}
      >
        ➖
      </div>
    </div>
  );
}

export default Participant;
