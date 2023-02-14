import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { TParticipantsModalProps } from "../../AppTypes";

function Modal(props: TParticipantsModalProps) {
  const { addParticipantModal } = props;
  const { setAddParticipantModal } = props;
  const { addParticipant } = props;

  const [newParticipant, setNewParticipant] = useState("");

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          addParticipant(newParticipant);
          setAddParticipantModal(false);
          setNewParticipant("");
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          setAddParticipantModal(false);
          setNewParticipant("");
        }}
      >
        Отмена
      </Button>
    </div>
  );

  const DIALOG_BODY = (
    <div>
      <textarea value={newParticipant} onChange={(e) => setNewParticipant(e.target.value)} />
    </div>
  );

  return (
    <Dialog
      title="Add participant"
      isOpen={addParticipantModal}
      onClose={() => {
        setAddParticipantModal(false);
        setNewParticipant("");
      }}
      canOutsideClickClose={false}
      isCloseButtonShown
    >
      <div className={Classes.DIALOG_BODY}>{DIALOG_BODY}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>{DIALOG_FOOTER}</div>
      </div>
    </Dialog>
  );
}

export default Modal;
