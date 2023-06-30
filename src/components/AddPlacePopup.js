import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const [link, setLink] = React.useState("");
  const [name, setName] = React.useState("");
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlacePopup({ name, link });
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // обработка инпута статуса
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="new_item"
      title="Новое место"
      buttonText={"Создать"}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input_type_name"
            id="place_name"
            name="name"
            required
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__error popup__error_place_name-error"></span>
          <input
            type="url"
            name="link"
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_status"
            id="input_url"
            value={link}
            onChange={handleLinkChange}
          />
          <span className="popup__error popup__error_input_url-error"></span>
        </>
      }
    />
  );
}
export default AddPlacePopup;
