import { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import "../../../style/task-modal.css";

function TaskModal(props: any) {
  const { showModal } = props;
  const { setShowModal } = props;
  const { APP_CONTROLLER } = props;
  const { WORKSPACE_ID } = props;
  const [newBoard, setNewBoard] = useState("");

  const saveChanges = (new_board: any, workspace_id: any) => {
    APP_CONTROLLER.addBoard(new_board, workspace_id);
  };

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          saveChanges(newBoard, WORKSPACE_ID);
          setShowModal(false);
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          setNewBoard("");
          setShowModal(false);
        }}
      >
        Отмена
      </Button>
    </div>
  );

  const DIALOG_BODY = (
    <div>
      Add Board
      <input value={newBoard} onChange={(e) => setNewBoard(e.target.value)} />
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
