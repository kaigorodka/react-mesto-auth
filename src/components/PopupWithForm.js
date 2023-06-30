import React from "react";
import closeIcon from "../images/Close_Icon.svg";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="close-icon" onClick={props.onClose} type="reset">
          <img src={closeIcon} alt="Закрыть" className="close-icon__img" />
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className="popup__form"
          action="/"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
