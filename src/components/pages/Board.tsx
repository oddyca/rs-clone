import { useState } from "react";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;
  const [dragList, setDragList] = useState(null);
  const [dragTask, setDragTask] = useState(null);
  const [currentObj, setCurrentObj] = useState(null);

  function dragStartHandlerList(e: any, list: any) {
    e.stopPropagation();
    setDragList(list);
    setCurrentObj('list');
  }

  function dragEndHandlerList(e: any) {
    e.target.style.background = 'white';
  }

  function dragOverHandlerList(e: any) {
    e.preventDefault();
    if(e.target.className == 'list') {
      e.target.style.background = 'lightgray';
    }
  }

  function dropHandlerList(e: any, list: any) {
    e.preventDefault();
    if(e.target.className === 'list') {
      e.target.style.background = 'white';
      APP_CONTROLLER.sortList({
        WORKSPACE_ID: WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dropList: list,
        dragList: dragList,
      })
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
    if(e.target.className === 'list_work-area') {
      APP_CONTROLLER.sortListCard({
        WORKSPACE_ID: WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dropList: list,
        dragList: dragList,
        dragTask: dragTask,
      })
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
  }

  function dragOverHandlerTask(e: any) {
    e.preventDefault()
    if(e.target.className === 'list_card') {
      e.target.style.boxShadow = '0 2px 3px gray';
    }
    if(currentObj === 'list') {
      e.target.style.boxShadow = '0 2px 3px red';
    }
  }

  function dragLeaveHandlerTask(e: any) {
    if(e.target.className === 'list_card') {
      e.target.style.boxShadow = 'none';
    }
  }

  function dragStartHandlerTask(e: any, list: any, card: any) {
    e.stopPropagation();
    setDragList(list);
    setDragTask(card);
    setCurrentObj('card');
  }

  function dragEndHandlerTask(e: any) {
    if(e.target.className === 'list_card') {
      e.target.style.boxShadow = 'none';
    }
  }

  function dropHandlerTask(e: any, list: any, card: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target, 'event'); /* list_card */
    console.log(dragList, 'list'); /*  */
    if(currentObj === 'list') {
      e.target.style.boxShadow = '0 0 0 0';
      return
    }
    e.target.style.boxShadow = '0 0 0 0';
    if(e.target.className === 'list_card') {
      APP_CONTROLLER.sortCard({
        WORKSPACE_ID: WORKSPACE_ID,
        BOARD_ID: BOARD.BOARD_ID,
        dropList: list,
        dropCard: card,
        dragList: dragList,
        dragTask: dragTask,
      })
      const newData = structuredClone(APP_CONTROLLER.loadData());
      setUserData(newData);
    }
  }

  const sortCards = (a: any, b: any) => {
    if(a.LIST_ORDER > b.LIST_ORDER) {
      return 1
    } else {
      return -1
    }
  }

  const getLists = () => {
    return BOARD.BOARD_LISTS.sort(sortCards).map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return (
          <div
            onDragOver={(e) => dragOverHandlerTask(e)}
            onDragLeave={(e) => dragLeaveHandlerTask(e)}
            onDragStart={(e) => dragStartHandlerTask(e, list, card)}
            onDragEnd={(e) => dragEndHandlerTask(e)}
            onDrop={(e) => dropHandlerTask(e, list, card)}
            id={card.CARD_ID}
            className="list_card"
            draggable={true}
          >
            {card.CARD_DATA}
          </div>
        );
      });
      return (
        <div
          className="list"
          onDragStart={(e) => dragStartHandlerList(e, list)}
          onDragLeave={(e) => dragEndHandlerList(e)}
          onDragEnd={(e) => dragEndHandlerList(e)}
          onDragOver={(e) => dragOverHandlerList(e)}
          onDrop={(e) => dropHandlerList(e, list)}
          draggable={true}
          id={list.LIST_ID}
          >
          <div className="list-title">{list.LIST_TITLE}</div>
          <div className="list_work-area">
            <div className="list-cover"></div>
            {cards}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="board-window">{getLists()}</div>
  );
}

export default Board;
