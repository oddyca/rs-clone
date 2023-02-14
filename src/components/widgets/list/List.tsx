import React from "react";

function List(props: any) {
  const { LIST_TITLE } = props;
  const { LIST_CARDS } = props;

  const createCards = () => {
    return LIST_CARDS.map((card: any) => {
      return <textarea id={card.CARD_ID} value={card.CARD_DATA} />;
    });
  };

  return (
    <div className="List">
      {LIST_TITLE}
      {createCards()}
    </div>
  );
}

export default List;
