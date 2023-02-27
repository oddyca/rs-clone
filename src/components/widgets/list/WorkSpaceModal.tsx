import { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import "../../../style/task-modal.css";

function WorkSpaceModal(props: any) {
  const { showModal } = props;
  const { setShowModal } = props;
  const { APP_CONTROLLER } = props;
  const { setUserData } = props;
  const [newWorkSpace, setNewWorkSpace] = useState("");

  const saveChanges = (new_work_space: any) => {
    APP_CONTROLLER.addWorkSpace(new_work_space);
  };

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          saveChanges(newWorkSpace);
          setShowModal(false);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        }}
      >
        Добавить
      </Button>
      <Button
        onClick={() => {
          setNewWorkSpace("");
          setShowModal(false);
        }}
      >
        Отмена
      </Button>
    </div>
  );

  const DIALOG_BODY = (
    <div>
      Add workspace
      <input value={newWorkSpace} onChange={(e) => setNewWorkSpace(e.target.value)} />
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

export default WorkSpaceModal;
