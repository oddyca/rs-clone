import React, { useState } from "react";
import Icon from "../../../assets/myaccount.svg"


const Participant = (props: any) => {
  const [displayCloseBtn, setDisplayCloseBtn] = useState("none");

  return (
    <div className="participant"
         onMouseOver={() => setDisplayCloseBtn("")}
         onMouseLeave={() => setDisplayCloseBtn("none")}
    >
      <div className="participant-icon">

      </div>
      <div className="participant-title">
        USER
      </div>
      <div
        style={{display: displayCloseBtn}}
        className="participant-del-btn"
        onClick={() => {
          console.log("participant onClick");
        }}
      >
        ➖
      </div>
    </div>
  );
};

export default Participant;
