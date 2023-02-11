import React from "react";
import Participant from "./participant/Participant";

const Participants = (props: any) => {
  return (
    <div className="participants">
      <div className="participants-title"><h3>Participants:</h3></div>
      <div className="participants-group">
        <Participant />
      </div>
    </div>

  );
};

export default Participants;
