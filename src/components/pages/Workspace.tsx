import { useState } from "react";
import { Link } from "react-router-dom";
import Participants from "../widgets/participant/Participants";
import trashBin_icon from "../../assets/delete_icon.svg";
import addIcon from "../../assets/add-icon.png";
import { TPropsAllWorkspaces } from "../../AppTypes";
import BoardModal from "../widgets/list/BoardModal";
import "../../style/workspace.css";

function Workspace(props: any) {
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const {
    users,
    userLogo,
    WORKSPACE,
    APP_CONTROLLER,
    BOARD,
    WORKSPACE_ID,
    setUserData,
    setAddParticipantModal,
    setCurrentWorkspaceId,
    setParticipant,
  } = props;

  const { WORKSPACE_BOARDS } = WORKSPACE;

  const getBoards = () => {
    return WORKSPACE_BOARDS.map((board: any, index: number) => {
      return (
        <div className="board-item link-board">
          <Link
            className="link"
            to={`/workspace-${WORKSPACE.WORKSPACE_ID}/board-${board.BOARD_ID}/`}
          >
            <div id={board.BOARD_ID} className="board">
              {board.BOARD_TITLE}
            </div>
          </Link>
          <button
            onClick={() => {
              APP_CONTROLLER.deleteBoard({
                WORKSPACE_ID,
                BOARD_ID: BOARD.BOARD_ID,
              });
              const newData = structuredClone(APP_CONTROLLER.loadData());
              setUserData(newData);
            }}
            className="boards_trashBin-icon"
          >
            <img className="boards_trashBin-img" src={trashBin_icon} alt="" />
          </button>
        </div>
      );
    });
  };

  return (
    <div className="workspace-window">
      <Participants
        setParticipant={setParticipant}
        participantsArr={WORKSPACE.WORKSPACE_PS}
        setAddParticipantModal={setAddParticipantModal}
        WORKSPACE_ID={WORKSPACE_ID}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
        users={users}
        userLogo={userLogo}
      />
      <div className="boards-title">
        <h3 className="boardsTitle title-workspace">Boards: </h3>
      </div>
      <div className="boards-group">
        {getBoards()}
        <div
          className="board-link-add link-board"
          onClick={(e) => {
            setShowNewBoardModal(true);
          }}
        >
          <div className="board-link_add">
            <div className="board-add">
              <img src={addIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
      {showNewBoardModal && (
        <BoardModal
          showModal={showNewBoardModal}
          setShowModal={setShowNewBoardModal}
          APP_CONTROLLER={APP_CONTROLLER}
          WORKSPACE_ID={WORKSPACE_ID}
          setUserData={setUserData}
        />
      )}
    </div>
  );
}

export default Workspace;
