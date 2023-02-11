import React from "react";
import Participant from "./participant/Participant";
import { TParticipantsProps } from "../../AppTypes";

const Participants = (props: TParticipantsProps) => {
  const { participantsArr } = props;

  const renderParticipant = () => {
    return participantsArr.map((par: string) => {
      return <Participant participant={par}/>
    })
  }


  return (
    <div className="participants">
      <div className="participants-title"><h3>Participants:</h3></div>
      <div className="participants-group">
        {renderParticipant()}
      </div>
    </div>

  );
};

export default Participants;
