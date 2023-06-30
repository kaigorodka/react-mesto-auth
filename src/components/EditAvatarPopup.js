import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen ? "popup_opened" : ""}
      title="Обновить аватар"
      onClose={props.onClose}
      name="avatar_edit"
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="url"
            name="avatar"
            ref={avatarRef}
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_status"
            id="avatar_url"
          />
          <span className="popup__error popup__error_avatar_url-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
