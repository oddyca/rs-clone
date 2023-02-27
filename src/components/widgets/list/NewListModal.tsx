import { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import "../../../style/task-modal.css";
import { TTaskModalP } from "../../../AppTypes";

function TaskModal(props: TTaskModalP) {
  const { showModal } = props;
  const { setShowModal } = props;
  const { APP_CONTROLLER } = props;
  const { WORKSPACE_ID } = props;
  const { currentBoard } = props;
  const { setUserData } = props;
  const [newList, setNewList] = useState("");

  const saveChanges = (new_list: string, workspace_id: string, current_board: string) => {
    APP_CONTROLLER.addListOnBoard(new_list, workspace_id, current_board);
  };

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          saveChanges(newList, WORKSPACE_ID, currentBoard);
          setShowModal(false);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          setNewList("");
          setShowModal(false);
        }}
      >
        Отмена
      </Button>
    </div>
  );

  const DIALOG_BODY = (
    <div>
      Add List
      <input value={newList} onChange={(e) => setNewList(e.target.value)} />
    </div>
  );

  return (
    <Dialog
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
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

export default TaskModal;
