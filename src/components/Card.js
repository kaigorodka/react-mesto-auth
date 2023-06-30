import React from "react";
import trashIcon from "../images/Trash.svg";
import likeIcon from "../images/Vector_(2).svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, handleCardDelete, onCardClick, onCardLike }) {
  const context = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === context._id;
  const isLiked = card.likes.some((i) => i._id === context._id);
  const cardLikeButtonClassName = `like-button__icon ${
    isLiked && "like-button__icon_active"
  }`;
  function handleDelete(e) {
    e.preventDefault();
    handleCardDelete(card);
  }
  return (
    <div className="element">
      {isOwn && (
        <button className="trash-button" type="button" onClick={handleDelete}>
          <img className="trash-button__icon" alt="Корзина" src={trashIcon} />
        </button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={() => onCardClick(card)}
      />
      <div className="element__white-part">
        <h2 className="element__title">{card.name}</h2>
        <button
          className="like-button"
          type="button"
          onClick={() => {
            onCardLike(card);
          }}
        >
          <img
            src={likeIcon}
            alt="Нравится"
            className={cardLikeButtonClassName}
          />
        </button>
        <h3 className="element__numbers">{card.likes.length}</h3>
      </div>
    </div>
  );
}

export default Card;
