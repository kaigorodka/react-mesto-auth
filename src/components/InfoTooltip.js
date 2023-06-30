import React from "react";
import closeIcon from "../images/Close_Icon.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="close-icon" onClick={props.onClose} type="reset">
          <img src={closeIcon} alt="Закрыть" className="close-icon__img" />
        </button>
        <img
          src={props.picture}
          alt="Статус регистрации"
          className="popup__reg-picture"
        ></img>
        <h2 className="popup__reg-message">{props.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
