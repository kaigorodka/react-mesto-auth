import React from "react";
import EditProfileButtom from "../images/Edit_Button(1).svg";
import EditAvatarButton from "../images/edit__avatar.svg";
import AddButton from "../images/Vector_(3).svg";
import api from "../utils/api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(props) {
  const context = React.useContext(CurrentUserContext);
  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__alignment">
            <button className="profile__edit" onClick={props.onEditAvatar}>
              <img
                src={EditAvatarButton}
                alt="Редактировать"
                className="profile__edit-icon"
              />
              <div className="opacity-maker"></div>
              <img
                src={context.avatar}
                alt="Аватар"
                className="profile__image"
              />
            </button>
            <div className="profile-info">
              <div className="profile__row-alignment">
                <h1 className="profile__name">{context.name}</h1>
                <button
                  className="edit-button"
                  type="button"
                  onClick={props.onEditProfile}
                >
                  <img
                    src={EditProfileButtom}
                    alt="Редактировать"
                    className="edit-button__icon"
                  />
                </button>
              </div>
              <h2 className="profile__status">{context.about}</h2>
            </div>
          </div>
          <button
            className="add-button"
            type="button"
            onClick={props.onAddPlace}
          >
            <img src={AddButton} alt="Добавить" className="add-button__icon" />
          </button>
        </section>
        <section className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                handleTrashClick={props.handleTrashClick}
                onCardClick={props.handleCardClick}
                onCardLike={props.handleCardLike}
                handleCardDelete={props.handleCardDelete}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
export default Main;
