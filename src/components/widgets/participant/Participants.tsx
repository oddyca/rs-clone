import React from "react";
import Participant from "./Participant";
import { TParticipantsProps } from "../../../AppTypes";

function Participants(props: TParticipantsProps) {
  const { participantsArr } = props;
  const { WORKSPACE_ID } = props;
  const { setCurrentWorkspaceId } = props;
  const { setAddParticipantModal } = props;
  const { setParticipant } = props;
  const { users } = props;
  const { userLogo } = props;

  const renderParticipant = () => {
    return participantsArr.map((par: string) => {
      return (<Participant
        participant={par}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
        WORKSPACE_ID={WORKSPACE_ID}
        setParticipant={setParticipant}
        partObj={users.find(user => user.PARTICIPANT_NAME === par)}
        userLogo={userLogo}
      />);
    });
  };

  return (
    <div className="participants">
      <div className="participants-title">
        <h3 className="title-workspace">Participants:</h3>
      </div>
      <div className="participants-group">
        {renderParticipant()}
        <div
          className="participant-add-btn"
          // @ts-ignore
          onClick={() => {
            setAddParticipantModal(true);
            setCurrentWorkspaceId(WORKSPACE_ID);
          }}
        >
          ➕
        </div>
      </div>
    </div>
  );
}

export default Participants;
