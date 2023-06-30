import React from "react";
import logo from "../images/Vector.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const context = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-up", { replace: true });
  }
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <div className="header__container">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in">
                <button className="header__button">Войти</button>
              </Link>
            }
          />
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up">
                <button className="header__button">Зарегистрироваться</button>
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__nickname">{props.userData.email}</p>
                <button onClick={signOut} className="header__button">
                  Выход
                </button>
              </>
            }
          />
        </Routes>
        ;
      </div>
    </header>
  );
}
export default Header;
