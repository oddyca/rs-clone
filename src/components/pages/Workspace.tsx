import React from "react";
import { Link } from "react-router-dom";

function Workspace(props: any) {
  const { WORKSPACE, workIndex } = props;

  const WORKSPACE_BOARDS = WORKSPACE.WORKSPACE_BOARDS;

  const getBoards = () => {
    return WORKSPACE_BOARDS.map((board: any, index: number) => {
      return (
        <Link className="link" to={`/workspace-${WORKSPACE.WORKSPACE_ID}/board-${board.BOARD_ID}/`}>
          <div
            id={board.BOARD_ID}
            className="board"
          >
            {board.BOARD_TITLE}
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="workspace-window">
        {getBoards()}
    </div>
  );
};

export default Workspace;
