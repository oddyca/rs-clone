import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/all-workspaces.css";
import { TPropsAllWorkspaces } from "../../AppTypes";
import WorkSpaceModal from "../widgets/list/WorkSpaceModal";

export default function AllWorkspaces(props: TPropsAllWorkspaces) {
  const { user, setUserData, APP_CONTROLLER } = props;
  const allWorkSpaces = user.USER_WORKSPACES;
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  function renderWorkspaces() {
    return allWorkSpaces.map((space: any) => {
      return (
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
      );
    });
  }

  return (
    <div className="workspaces-container">
      <h3 className="h3-heading">Workspaces ({allWorkSpaces.length})</h3>
      <div className="workspaces-list">
        {renderWorkspaces()}
        <div className="workspaces-link">
          <div className="workspace-card">
            <div className="workspace_cover">
              <div
                onClick={(e) => {
                  setShowNewWorkspaceModal(true);
                }}
                className="workspaces_info"
              >
                Add WorkSpace(+)
              </div>
            </div>
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
