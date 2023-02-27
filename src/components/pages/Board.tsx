import { useState, memo } from "react";
import TaskModal from "../widgets/list/TaskModal";
import ListModal from "../widgets/list/ListModal";
import NewListModal from "../widgets/list/NewListModal";
import AddNewTask from "../addNewTask";

import { TBoardLists, TPropsBoard } from "../../AppTypes";

const Board = memo(function Board(props: TPropsBoard) {
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;
  const [dragList, setDragList] = useState(null);
  const [dragTask, setDragTask] = useState(null);
  const [currentObj, setCurrentObj] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [boardID, setBoardID] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [currentList, setCurrentList] = useState("");
  
  function dragStartHandlerList(e: React.DragEvent<HTMLElement>, list: any) {
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
            onClick={() => {
              // show task modal
              // set current board id to pass it to ListModal component
              setShowModal(true);
              setBoardID(BOARD.BOARD_ID);
              setCurrentTask(card.CARD_ID);
              setCurrentList(list.LIST_ID)
            }}
            onDragOver={(e: React.DragEvent<HTMLElement>) => dragOverHandlerTask(e)}
            onDragLeave={(e: React.DragEvent<HTMLElement>) => dragLeaveHandlerTask(e)}
            onDragStart={(e: React.DragEvent<HTMLElement>) => dragStartHandlerTask(e, list, card)}
            onDragEnd={(e: React.DragEvent<HTMLElement>) => dragEndHandlerTask(e)}
            onDrop={(e: React.DragEvent<HTMLElement>) => dropHandlerTask(e, list, card)}
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
            onDragStart={(e: React.DragEvent<HTMLElement>) => dragStartHandlerList(e, list)}
            onDragLeave={(e: React.DragEvent<HTMLElement>) => dragEndHandlerList(e)}
            onDragEnd={(e: React.DragEvent<HTMLElement>) => dragEndHandlerList(e)}
            onDragOver={(e: React.DragEvent<HTMLElement>) => dragOverHandlerList(e)}
            onDrop={(e: React.DragEvent<HTMLElement>) => dropHandlerList(e, list)}
            draggable
            id={list.LIST_ID}
          >
          <div 
            className="list-title"
            onClick={() => {
              setShowListModal(true);
              setBoardID(BOARD.BOARD_ID);
              setCurrentList(list.LIST_ID);
            }}
          >{list.LIST_TITLE}</div>
          <div 
            className="list_work-area"
          >
            <div className="list-cover" style={list.LIST_COLOR ? {backgroundColor: `${list.LIST_COLOR}`} : {backgroundColor: "#FFFFFF"}}/>
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
    {showListModal && 
      <ListModal
        showListModal={showListModal}
        setShowListModal={setShowListModal}
        currentWorkspace={WORKSPACE_ID}
        currentBoard={boardID}
        currentList={currentList}
        APP_CONTROLLER={APP_CONTROLLER}
        setUserData={setUserData}
      />
    }
    {showModal && 
      <TaskModal 
        showModal={showModal}
        setShowModal={setShowModal}
        currentWorkspace={WORKSPACE_ID}
        currentBoard={boardID}
        currentList={currentList}
        currentTask={currentTask}
        APP_CONTROLLER={APP_CONTROLLER}
        setUserData={setUserData}
     />
    }
      <div className="board__title">{BOARD.BOARD_TITLE}</div>
      <div className="board-inner">
        {getLists()}
        <div onClick={() => {setShowAddListModal(true); setBoardID(BOARD.BOARD_ID);}} className="list add-list">
          Add List
        </div>
      </div>
    {showAddListModal && <NewListModal
      showModal={showAddListModal}
      setShowModal={setShowAddListModal}
      WORKSPACE_ID={WORKSPACE_ID}
      APP_CONTROLLER={APP_CONTROLLER}
      currentBoard={boardID}
      setUserData={setUserData}
    />}
  </div>;
})

export default Board;