import React from "react";
import Header from "../widgets/header/Header";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD, setUserData, WORKSPACE_ID, APP_CONTROLLER } = props;

  const getLists = () => {
    return BOARD.BOARD_LISTS.map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return <div id={card.CARD_ID} className="list_card">{card.CARD_DATA}</div>;
      });
      return (
        <div id={list.LIST_ID} className="list" onClick={() => {
          APP_CONTROLLER.sortList({
            WORKSPACE_ID: WORKSPACE_ID,
            BOARD_ID: BOARD.BOARD_ID,
            LIST_ORDER: list.LIST_ORDER
          })
          }}>
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
