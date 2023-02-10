import { useState } from "react";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;
  const [dragList, setDragList] = useState(null);

  function dragStartHandlerList(e: any, list: any) {
    setDragList(list);
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
            onDragOver={(e) => dragOverHandlerTask(e, list, card)}
            onDragLeave={(e) => dragLeaveHandlerTask(e)}
            onDragStart={(e) => dragStarthandlerTask(e)}
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
