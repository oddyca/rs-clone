import React from "react";
import { Link } from "react-router-dom";
import Header from "../widgets/header/Header";

function Workspace(props: any) {
  const { USER_NAME } = props.appView;
  const { USER_WORKSPACES } = props.appView;

  const getWorkspaces = () => {
    return USER_WORKSPACES.map((workspace: any) => {
      return (
        <div
          id={workspace.WORKSPACE_ID}
          className="workspace"
        >
          <Link className="link" to={`/workspace/${workspace.WORKSPACE_ID}`}>
            {workspace.WORKSPACE_TITLE}
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="workspace-window">
      <>
        <Header
          title={USER_NAME}
        />
        {getWorkspaces()}
      </>
    </div>
  );
};

export default Workspace;
