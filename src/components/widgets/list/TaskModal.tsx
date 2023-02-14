import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
//import { TParticipantsModalProps } from "../../AppTypes";

function TaskModal(props: any) {
  const { showModal } = props;
  const { currentWorkspace } = props;
  const { currentBoard } = props;
  const { taskObj } = props;

  // if title clicked change from readOnly=true to readOnly=false
  // default value of textarea (task title) = CARD_DATA
  const [titleToggle, setTitleToggle] = useState(true);
  const [titleChange, setTitleChange] = useState(taskObj.CARD_DATA);

  const handleTitleChange = (input: string) => {
    setTitleChange(input);
  }

  const DIALOG_HEADER = (
    <div className="modal_title-container">
      <textarea 
        value={titleChange} 
        className="modal-title-text" 
        readOnly={titleToggle} 
        onChange={(e) => handleTitleChange(e.target.value)} 
      />
      <button 
        className="modal_title-edit"
        onClick={() => {
          setTitleToggle(!titleToggle);
        }}>
          {titleToggle ? 'edit' : 'save'}
      </button>
    </div>
  )

  const DIALOG_BODY = (
    <div className="task-modal_body">
      <div></div>
    </div>
  );

  // const DIALOG_FOOTER = (
  //   <div className="">
  //     <Button
  //       onClick={() => {
  //         addParticipant(newParticipant);
  //         setAddParticipantModal(false);
  //         setNewParticipant("");
  //       }}
  //     >
  //       Добавить
  //     </Button>
  //     <Button
  //       onClick={() => {
  //         // setAddParticipantModal(false);
  //         setNewParticipant("");
  //       }}
  //     >
  //       Отмена
  //     </Button>
  //   </div>
  // );

  return (
    <Dialog
      isOpen={showModal}
      onClose={() => {
        // setAddParticipantModal(false);
        // setNewParticipant("");
      }}
      canOutsideClickClose={false}
      isCloseButtonShown
    >
      <div className={Classes.DIALOG_HEADER}>{DIALOG_HEADER}</div>
      <div className={Classes.DIALOG_BODY}>{DIALOG_BODY}</div>
    </Dialog>
  );
}

export default TaskModal;
