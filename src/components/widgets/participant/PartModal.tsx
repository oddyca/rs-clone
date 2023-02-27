import React, { useState } from "react";
import { Button, Dialog, MenuItem, Classes } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";
import { TParticipantsModalProps, TUserParticipant } from "../../../AppTypes";

function PartModal(props: TParticipantsModalProps) {
  const { viewPartModal } = props;
  const { setViewPartModal } = props;
  const { setParticipant } = props;
  const { currentWorkspaceId } = props;
  const { users } = props;

  const [newParticipant, setNewParticipant] = useState<string>("Select participant");

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        disabled={newParticipant === "Select participant" ? true : false}
        onClick={() => {
          setParticipant(currentWorkspaceId, newParticipant, "add");
          setViewPartModal(false);
          setNewParticipant("Select participant");
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
      <Select2
        filterable={false}
        items={users.map((elem: TUserParticipant) => elem.PARTICIPANT_NAME)}
        itemRenderer={(val, itemProps) => {
          return (
            <MenuItem
              key={val}
              text={val}
              onClick={(elm) => {
                const target = elm.target as HTMLElement;
                if (target.textContent) {
                  setNewParticipant(target.textContent);
                }
              }}
            />
          );
        }}
        onItemSelect={() => {
        }}
      >
        <Button text={newParticipant} rightIcon="double-caret-vertical" />
      </Select2>
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
