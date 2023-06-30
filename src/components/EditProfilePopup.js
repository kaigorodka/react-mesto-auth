import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const context = React.useContext(CurrentUserContext);
  // обработка инпута имени
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // обработка инпута статуса
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  //установка данных в профиль из контекста
  React.useEffect(() => {
    setName(context.name);
    setDescription(context.about);
  }, [context, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input_type_name"
            id="name"
            name="name"
            required
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__error popup__error_name-error"></span>
          <input
            type="text"
            name="about"
            required
            placeholder="О себе"
            className="popup__input popup__input_type_status"
            id="status"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error popup__error_status-error"></span>
        </>
      }
    />
  );
}
export default EditProfilePopup;
