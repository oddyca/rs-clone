import React from "react";
import Header from "../widgets/header/Header";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD } = props;

  const getLists = () => {
    return BOARD.BOARD_LISTS.map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return <textarea id={card.CARD_ID} value={card.CARD_DATA} />;
      });
      return (
        <div id={list.LIST_ID} className="list">
          <div className="list-title">{list.LIST_TITLE}</div>
          {cards}
        </div>
      );
    });
  };

  return (
    <div className="board-window">
      <>
        <Header title={USER_NAME} />
        {getLists()}
      </>
    </div>
  );
}

export default Board;
