import React, { useState } from "react";
import { Link } from "react-router-dom";
import trashBin_icon from "../../assets/delete_icon.svg";
import addIcon from "../../assets/add-icon.png";
import "../../style/all-workspaces.css";
import { TPropsAllWorkspaces, TUserWorkspace } from "../../AppTypes";
import WorkSpaceModal from "../widgets/list/WorkSpaceModal";

export default function AllWorkspaces(props: TPropsAllWorkspaces) {
  const { user, setUserData, APP_CONTROLLER } = props;
  const allWorkSpaces = user.USER_WORKSPACES;
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  function renderWorkspaces() {
    return allWorkSpaces.map((space: TUserWorkspace) => {
      return (
        <div className="workspaces-link">
          <Link
            id={space.WORKSPACE_ID}
            className="workspaces-link"
            to={`/workspace-${space.WORKSPACE_ID}`}
          >
            <div className="workspace-card">
              <p className="workspaces_title">{space.WORKSPACE_TITLE}</p>
              <div className="workspace_cover">
                <div className="workspaces_info">
                  <p>Boards: {space.WORKSPACE_BOARDS.length}</p>
                  <p>Participants: {space.WORKSPACE_PS.join(" ")}</p>
                </div>
              </div>
            </div>
          </Link>
          <button
            onClick={(e) => {
              APP_CONTROLLER.deleteWorkSpace({
                WORKSPACE_ID: space.WORKSPACE_ID,
              });
              setUserData(structuredClone(APP_CONTROLLER.loadData()));
            }}
            className="trashBin-icon"
          >
            <img className="trashBin-img" src={trashBin_icon} alt="" />
          </button>
        </div>
      );
    });
  }

  return (
    <div className="workspaces-container">
      <h3 className="h3-heading">Workspaces ({allWorkSpaces.length})</h3>
      <div className="workspaces-list">
        {renderWorkspaces()}
        <div
          onClick={(e) => {
            setShowNewWorkspaceModal(true);
          }}
          className="workspaces-link-add"
        >
          <div className="workspaces_img-add">
            <img className="workspaces-add" src={addIcon} alt="" />
          </div>
        </div>
      </div>
      {showNewWorkspaceModal && (
        <WorkSpaceModal
          showModal={showNewWorkspaceModal}
          setShowModal={setShowNewWorkspaceModal}
          APP_CONTROLLER={APP_CONTROLLER}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}
