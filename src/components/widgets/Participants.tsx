import React from "react";
import Participant from "./participant/Participant";

const Participants = (props: any) => {
  return (
    <div className="participants">
      <div className="participants-title"><h4>Participants:</h4></div>
      <div className="participants-group">
        <Participant />
      </div>
    </div>

  );
};

export default Participants;
