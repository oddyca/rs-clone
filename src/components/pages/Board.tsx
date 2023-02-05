import React, { useState } from "react";
import Header from "../widgets/header/Header";

function Board(props: any) {
  const { USER_NAME } = props;
  const { BOARD } = props;

  const [modalToggle, setModalToggle] = useState(false);
  const [modalContent, setModalContent] = useState(''); // just text for now
  const [titleToggle, setTitleToggle] = useState(true);
  const [titleChange, setTitleChange] = useState('');

  const toggleModal = (content?: any) => { // ANY!
    setModalToggle(!modalToggle);
    setModalContent(content);
    return undefined;
  }

  let clickedID: number;

  const handleTitleChange = (input: string) => {
    setTitleChange(input);
  }

  const getLists = () => {
    return BOARD.BOARD_LISTS.map((list: any) => {
      const cards = list.LIST_CARDS.map((card: any) => {
        return <div 
          id={card.CARD_ID} 
          className="list_card"
          onClick={() => {
            toggleModal();
            setModalContent(card.CARD_DATA);
            setTitleChange(card.CARD_DATA);
          }}>{card.CARD_DATA}</div>;
      });
      return (
        <div id={list.LIST_ID} className="list">
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
    <div className="board-window">
      {getLists()}
        {modalToggle && (
        <div className="modal-window">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-window-wrapper">
            <div className="modal-window_title">
              <div className="modal_title-container">
                <textarea value={titleChange} className="modal-title-text" readOnly={titleToggle} onChange={(e) => handleTitleChange(e.target.value)}></textarea>
                <button 
                  className="modal_title-edit"
                  onClick={() => {
                    setTitleToggle(!titleToggle);
                  }}>{titleToggle ? 'edit' : 'save'}</button>
              </div>
              <button onClick={toggleModal}>close</button>
            </div>
            <div className="modal-window_content">
              <div className="content-container">
                <div className="modal-content">{modalContent}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
