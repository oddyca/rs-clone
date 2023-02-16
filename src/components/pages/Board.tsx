import { useState } from "react";
import TaskModal from "../widgets/list/TaskModal";
import AddNewTask from "../addNewTask";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;
  const [dragList, setDragList] = useState(null);
  const [dragTask, setDragTask] = useState(null);
  const [currentObj, setCurrentObj] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [boardID, setBoardID] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [currentList, setCurrentList] = useState("");
  // const [newTaskTitle, setNewTaskTitle] = useState("");

  function dragStartHandlerList(e: any, list: any) {
    e.stopPropagation();
    setDragList(list);
    setCurrentObj("list");
  }

  function dragEndHandlerList(e: any) {
    e.target.style.boxShadow = "0 0 0 0";
  }

  function dragOverHandlerList(e: any) {
    e.preventDefault();
    if (e.target.className === "list") {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dropHandlerList(e: any, list: any) {
    e.preventDefault();
    if (e.target.className === "list") {
      e.target.style.boxShadow = "0 0 0 0";
      APP_CONTROLLER.sortList({
        WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dropList: list,
        dragList,
      });
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
    if (currentObj === "list") {
      return;
    }
    if (e.target.className === "list_work-area") {
      APP_CONTROLLER.sortListCard({
        WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dropList: list,
        dragList,
        dragTask,
      });
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
  }

  function dragOverHandlerTask(e: any) {
    e.preventDefault();
    if (e.target.className === "list_card") {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
    if (currentObj === "list") {
      e.target.style.boxShadow = "0 2px 3px red";
    }
  }

  function dragLeaveHandlerTask(e: any) {
    if (e.target.className === "list_card") {
      e.target.style.boxShadow = "none";
    }
  }

  function dragStartHandlerTask(e: any, list: any, card: any) {
    e.stopPropagation();
    setDragList(list);
    setDragTask(card);
    setCurrentObj("card");
  }

  function dragEndHandlerTask(e: any) {
    if (e.target.className === "list_card") {
      e.target.style.boxShadow = "none";
    }
  }

  function dropHandlerTask(e: any, list: any, card: any) {
    e.preventDefault();
    e.stopPropagation();
    if (currentObj === "list") {
      e.target.style.boxShadow = "0 0 0 0";
      return;
    }
    e.target.style.boxShadow = "0 0 0 0";
    if (e.target.className === "list_card") {
      APP_CONTROLLER.sortCard({
        WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dragList,
        dropList: list,
        dragCard: dragTask,
        dropCard: card,
      });
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
  }

  const sortCards = (a: any, b: any) => {
    if (a.LIST_ORDER > b.LIST_ORDER) {
      return 1;
    }
    return -1;
  };

  const getLists = () => {
    return BOARD.BOARD_LISTS.sort(sortCards).map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return (
          <div
            onClick={(e) => {
              // show task modal
              // set current board id to pass it to ListModal component
              setShowModal(true);
              setBoardID(BOARD.BOARD_ID);
              setCurrentTask(card.CARD_ID);
              setCurrentList(list.LIST_ID)
            }}
            onDragOver={(e) => dragOverHandlerTask(e)}
            onDragLeave={(e) => dragLeaveHandlerTask(e)}
            onDragStart={(e) => dragStartHandlerTask(e, list, card)}
            onDragEnd={(e) => dragEndHandlerTask(e)}
            onDrop={(e) => dropHandlerTask(e, list, card)}
            id={card.CARD_ID}
            className="list_card"
            draggable
          >
            {card.CARD_DATA}
          </div>
        );
      });

      return (
        <>
          <div
            className="list"
            onDragStart={(e) => dragStartHandlerList(e, list)}
            onDragLeave={(e) => dragEndHandlerList(e)}
            onDragEnd={(e) => dragEndHandlerList(e)}
            onDragOver={(e) => dragOverHandlerList(e)}
            onDrop={(e) => dropHandlerList(e, list)}
            draggable
            id={list.LIST_ID}
          >
          <div className="list-title">{list.LIST_TITLE}</div>
          <div 
            className="list_work-area"
          >
            <div className="list-cover" />
            {cards}
          </div>
          <AddNewTask
            APP_CONTROLLER={APP_CONTROLLER}
            setUserData={setUserData}
            WORKSPACE_ID={WORKSPACE_ID}
            BOARD_ID={BOARD.BOARD_ID}
            list={list}
          />
          </div>
        </>
      );
    });
  };

  return <div className="board-window">
    {showModal && <TaskModal 
      showModal={showModal}
      setShowModal={setShowModal}
      currentWorkspace={WORKSPACE_ID}
      currentBoard={boardID}
      currentList={currentList}
      currentTask={currentTask}
      APP_CONTROLLER={APP_CONTROLLER}
      setUserData={setUserData}
    />}
    {getLists()}
  </div>;
}

export default Board;