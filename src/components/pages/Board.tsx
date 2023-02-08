import { useState } from "react";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;
  const [listState, setListState] = useState(BOARD.BOARD_LISTS);
  const [currentList, setCurrentList] = useState(null);

  function dragStartHandler(e: any, list: any) {
    /* console.log('drag', list); */
    setCurrentList(list);
  }

  function dragEndHandler(e: any) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e: any) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }

  function dropHandler(e: any, list: any) {
    e.preventDefault();
    /* console.log('drop', list); */
    setListState(listState.map((c: any) => {
      if(c.LIST_ID === list.LIST_ID) {
        return {...c, LIST_ORDER: currentList.LIST_ORDER}
      }
      if(c.LIST_ID === currentList.LIST_ID) {
        return {...c, LIST_ORDER: list.LIST_ORDER}
      }
      return c;
    }))
    e.target.style.background = 'white';
  }

  const sortCards = (a: any, b: any) => {
    if(a.LIST_ORDER > b.LIST_ORDER) {
      return 1
    } else {
      return -1
    }
  }

  const getLists = () => {
    return listState.sort(sortCards).map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return <div id={card.CARD_ID} className="list_card">{card.CARD_DATA}</div>;
      });
      return (
        <div
          className="list" 
          onDragStart={(e) => dragStartHandler(e, list)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, list)}
          draggable={true}
          id={list.LIST_ID}
          /* onClick={() => {
          APP_CONTROLLER.sortList({
            WORKSPACE_ID: WORKSPACE_ID,
            BOARD_ID: BOARD.BOARD_ID,
            LIST_ORDER: list.LIST_ORDER
          })
          }} */
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
