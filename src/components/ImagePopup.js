import React from "react";
import closeIcon from "../images/Close_Icon.svg";
function ImagePopup({ onClose, card }) {
  if (card == null) {
    return null;
  }
  const { name, link } = card;
  return (
    <div className={`popup popup__image popup_opened`}>
      <div className="img-popup__container">
        <button className="close-icon" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Закрыть" className="close-icon__img" />
        </button>
        <img className="img-popup__picture" src={link} alt={name} />
        <h2 className="img-popup__title">{name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
