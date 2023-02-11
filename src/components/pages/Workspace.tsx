import React from "react";
import { Link } from "react-router-dom";
import Participants from "../widgets/Participants";
import { TPropsAllWorkspaces } from "../../AppTypes";

function Workspace(props: any) {
  const { WORKSPACE, workIndex, APP_CONTROLLER, BOARD, WORKSPACE_ID, setUserData, participantsArr } = props;

  const WORKSPACE_BOARDS = WORKSPACE.WORKSPACE_BOARDS;

  const getBoards = () => {
    return WORKSPACE_BOARDS.map((board: any, index: number) => {
      return (
        <>
          <Link className="link" to={`/workspace-${WORKSPACE.WORKSPACE_ID}/board-${board.BOARD_ID}/`}>
            <div
              id={board.BOARD_ID}
              className="board"
            >
              {board.BOARD_TITLE}
            </div>
          </Link>
          <button onClick={() => {
            APP_CONTROLLER.deleteBoard({
              WORKSPACE_ID: WORKSPACE_ID,
              BOARD_ID: BOARD.BOARD_ID
            });
            const newData = structuredClone(APP_CONTROLLER.loadData());
            setUserData(newData);
          }}>
            del
          </button>
        </>

      );
    });
  };

  return (
    <div className="workspace-window">
      <Participants participantsArr={WORKSPACE.WORKSPACE_PS} />
      <div className="boards-group">
        {getBoards()}
      </div>
    </div>
  );
};

export default Workspace;
