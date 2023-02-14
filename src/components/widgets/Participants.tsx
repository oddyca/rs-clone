import React from "react";
import Participant from "./participant/Participant";
import { TParticipantsProps } from "../../AppTypes";

const Participants = (props: TParticipantsProps) => {
  const { participantsArr } = props;
  const { WORKSPACE_ID } = props;
  const { setCurrentWorkspaceId } = props;
  const { setAddParticipantModal } = props;


  const renderParticipant = () => {
    return participantsArr.map((par: string) => {
      return <Participant participant={par} />;
    });
  };


  return (
    <div className="participants">
      <div className="participants-title"><h3>Participants:</h3></div>
      <div className="participants-group">
        {renderParticipant()}
        <div className="participant-add-btn"
          // @ts-ignore
             onClick={() => {
               setAddParticipantModal(true);
               setCurrentWorkspaceId(WORKSPACE_ID);
             }}
        >➕
        </div>
      </div>
    </div>

  );
};

export default Participants;
