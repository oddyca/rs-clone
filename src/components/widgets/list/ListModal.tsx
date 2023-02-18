import React, { useState } from "react";
import { Button, Dialog, Classes } from "@blueprintjs/core";
import { TBoardLists, TCard, TListModalProps} from "../../../AppTypes";
import "../../../style/task-modal.css";
import delete_icon from "../../../assets/delete_icon.svg";

export default function ListModal(props: any) {
  const { 
    showListModal,
    setShowListModal,
    currentWorkspace,
    currentBoard,
    currentList,
    APP_CONTROLLER,
    setUserData
    } = props;

    const allLists = APP_CONTROLLER.getBoards(currentWorkspace, currentBoard);
    const currentListObj = allLists.filter((list: TBoardLists) => list.LIST_ID === currentList)[0];
  
    const [titleToggle, setTitleToggle] = useState(true);
    const [titleChange, setTitleChange] = useState(currentListObj.LIST_TITLE);
    const [colorPick, setColorPick] = useState("#FFFFFF");

    const saveChanges = (args: TListModalProps, whichModal: string, color: string, currentListObj: TBoardLists) => {
      APP_CONTROLLER.saveModalChanges(args, whichModal, color, currentListObj);
      setUserData(structuredClone(APP_CONTROLLER.loadData()));
    }
  
    const DIALOG_HEADER = (
      <div className="dialog-header_title">
        <textarea 
          value={titleChange} 
          className={"modal-window_title-text"}
          maxLength={25}
          readOnly={titleToggle} 
          onChange={(e) => {setTitleChange(e.target.value)}}
        />
        <button 
          className="modal_title-edit"
          onClick={() => {
            setTitleToggle(!titleToggle);
          }}>
            {titleToggle ? 'edit' : 'save'}
        </button>
      </div>
    );
  
    const DIALOG_BODY = (
      <div className="modal-window_description">
        <input 
          type="color"
          value={colorPick}
          onChange={(e) => setColorPick(e.target.value)}
        />
      </div>
    );
  
    const DIALOG_FOOTER = (
      <div className="modal-window_footer-container">
        <div className="modal-window_delete-task">
          <button 
            className="modal_delete-button"
            onClick={() => {
              APP_CONTROLLER.deleteList({
                currentWorkspace,
                BOARD_ID: currentBoard,
                CURRENTLIST: currentList
              });
              setShowListModal(false);
              const newData = structuredClone(APP_CONTROLLER.loadData());
              setUserData(newData);
            }}
          >
            <img 
              src={delete_icon}
              alt="delete-icon"
            />
          </button>
        </div>
        <div className="modal-window_controls">
          <Button
            onClick={() => {
              saveChanges(
                {currentWorkspace, currentBoard, currentList, titleChange},
                "list",
                colorPick,
                currentListObj
              )
              setShowListModal(false);
              const newData = structuredClone(APP_CONTROLLER.loadData());
              setUserData(newData);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setShowListModal(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  
  return (
    <Dialog
      isOpen={showListModal}
      onClose={() => {
        setShowListModal(false);
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
