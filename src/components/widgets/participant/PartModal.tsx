import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { TParticipantsModalProps } from "../../../AppTypes";

function PartModal(props: TParticipantsModalProps) {
  const { viewPartModal } = props;
  const { setViewPartModal } = props;
  const { setParticipant } = props;
  const { currentWorkspaceId } = props;

  const [newParticipant, setNewParticipant] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          setParticipant(currentWorkspaceId, newParticipant, "add");
          setViewPartModal(false);
          setNewParticipant("");
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          setViewPartModal(false);
          setNewParticipant("");
        }}
      >
        Отмена
      </Button>
    </div>
  );

  const DIALOG_BODY = (
    <div>
      <input value={newParticipant} onChange={(e) => setNewParticipant(e.target.value)} />
      <div className="server-response">{serverResponse}</div>
    </div>
  );

  return (
    <Dialog
      title="Add participant"
      isOpen={viewPartModal}
      onClose={() => {
        setViewPartModal(false);
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

export default PartModal;
