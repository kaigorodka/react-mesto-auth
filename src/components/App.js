import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import errLogo from "../images/krestik.svg";
import union from "../images/galochka.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import { tokenGetter } from "./Auth";
import * as auth from "./Auth";
import { Navigate } from "react-router-dom";
function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
  });
  const [userData, setUserData] = React.useState({
    email: "",
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isSuccesPopupOpen, setSuccesPopupOpen] = React.useState(false);
  const [isErrPopupOpen, setErrPopupOpen] = React.useState(false);
  // const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // подгрузка данных с сервера
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([info, cards]) => {
        const userInformation = info;
        setCurrentUser(info);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    tokenCheck();
  }, []);
  const navigate = useNavigate();
  function tokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth.tokenGetter(token).then((res) => {
        if (res) {
          // авторизуем пользователя
          const userData = {
            email: res.data.email,
          };
          setUserData(userData);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      });
    }
  }
  // закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    // setConfirmPopupOpen(false);
    setSelectedCard(null);
    setSuccesPopupOpen(false);
    setErrPopupOpen(false);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  // function handleTrashClick() {
  //   setConfirmPopupOpen(true);
  // }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleSuccesPopup() {
    setSuccesPopupOpen(true);
  }
  function handleErrorPopup() {
    setErrPopupOpen(true);
  }
  //обработка лайка через API
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus({ data: card, isLiked: isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление карты через API
  function handleCardDelete(mainCard) {
    api
      .deleteCard(mainCard)
      .then(
        setCards(
          cards.filter(function (card) {
            return card._id !== mainCard._id;
          })
        )
      )
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление данных юзера через API
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление аватара через API
  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  // добавление новой карточки через API
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header userData={userData} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={() => {
                  handleEditAvatarClick();
                }}
                onEditProfile={() => {
                  handleEditProfileClick();
                }}
                onAddPlace={() => {
                  handleAddPlaceClick();
                }}
                // handleTrashClick={() => {
                //   handleTrashClick();
                // }}
                handleCardClick={(card) => {
                  handleCardClick(card);
                }}
                handleCardLike={(card) => {
                  handleCardLike(card);
                }}
                handleCardDelete={(card) => {
                  handleCardDelete(card);
                }}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                buttonText={"Войти"}
                title={"Вход"}
                handleLogin={handleLogin}
                onErr={handleErrorPopup}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                buttonText={"Зарегистрироваться"}
                title={"Регистрация"}
                onSucces={handleSuccesPopup}
                onErr={handleErrorPopup}
              />
            }
          />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(data) => {
            handleUpdateUser(data);
          }}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(data) => {
            handleUpdateAvatar(data);
          }}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlacePopup={(data) => {
            handleAddPlaceSubmit(data);
          }}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        {/* <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonText={"Да"}
          isOpen={isConfirmPopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
        /> */}

        <InfoTooltip
          isOpen={isErrPopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
          text="Что-то пошло не так! Попробуйте еще раз."
          picture={errLogo}
        />
        <InfoTooltip
          isOpen={isSuccesPopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
          text="Вы успешно зарегистрировались!"
          picture={union}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
