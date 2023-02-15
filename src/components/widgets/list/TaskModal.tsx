import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { TBoardLists, TCard, TListModalProps} from "../../../AppTypes";
import "../../../style/task-modal.css";

function TaskModal(props: any) {
  const { showModal } = props;
  const { setShowModal } = props;
  const { currentWorkspace } = props;
  const { currentBoard } = props;
  const { currentList } = props;
  const { currentTask } = props;
  const { APP_CONTROLLER } = props;

  const allLists = APP_CONTROLLER.getBoards(currentWorkspace, currentBoard);
  const currentListObj = allLists.filter((list: TBoardLists) => list.LIST_ID === currentList)[0];
  const currentTaskObj = currentListObj.LIST_CARDS.filter((task: TCard) => task.CARD_ID === currentTask)[0];

  // if title clicked change from readOnly=true to readOnly=false
  // default value of textarea (task title) = CARD_DATA
  const [titleToggle, setTitleToggle] = useState(true);
  const [titleChange, setTitleChange] = useState(currentTaskObj.CARD_DATA);
  const [bodyChange, setBodyChange] = useState("Description text");

  const saveChanges = (args: TListModalProps) => {
    APP_CONTROLLER.saveTaskModalChanges(args);
  }

  const textArea = (type: string) => {
    const value = type === "title" ? titleChange : bodyChange;
    const readOnly = type === "title" ? titleToggle : false;
    return (
      <textarea 
        value={value} 
        className={`task-modal_${type}-text`}
        maxLength={40}
        readOnly={readOnly} 
        onChange={(e) => {
          if (type === "title") {
            setTitleChange(e.target.value);
            e.target.setAttribute("style", `width: 1px`);
            e.target.setAttribute("style", `width: ${e.target.scrollWidth}px`);
          } else {
            setBodyChange(e.target.value);
            e.target.setAttribute("style", `height: auto`);
            e.target.setAttribute("style", `height: ${e.target.scrollHeight}px`);
          }
        }} 
      />
    )
  }

  const DIALOG_HEADER = (
    <div className="dialog-header_title">
      {textArea("title")}
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
    <div className="task-modal_description">
      <p>Description</p>
      {textArea("body")}
    </div>
  );

  const DIALOG_FOOTER = (
    <div className="">
      <Button
        onClick={() => {
          saveChanges({currentWorkspace, currentBoard, currentList, currentTask, titleChange, bodyChange});
          setShowModal(false);
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          setShowModal(false);
        }}
      >
        Cancel
      </Button>
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
      <div className={Classes.DIALOG_HEADER}>{DIALOG_HEADER}</div>
      <div className={Classes.DIALOG_BODY}>{DIALOG_BODY}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>{DIALOG_FOOTER}</div>
      </div>
    </Dialog>
  );
}

export default TaskModal;
