import React from "react";
import logo from "../images/Vector.svg";
import * as auth from "./Auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import union from "../images/galochka.svg";
function Register(props) {
  const [formValue, setFormValue] = React.useState({
    password: "",
    email: "",
  });
  debugger;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth
      .register({ password, email })
      .then((res) => {
        navigate("/sign-in", { replace: true });
      })
      .catch(props.onErr)
      .finally(props.onSucces);
  };
  return (
    <>
      <div className="form-place__container">
        <h2 className="form-place__title">{props.title}</h2>
        <form
          name="form-place"
          className="form-place__form"
          action="/"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="form-place__input form-place__input_type_login"
            id="login"
            name="email"
            required
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={formValue.email}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_name-error"></span>
          <input
            type="password"
            name="password"
            required
            placeholder="Пароль"
            className="form-place__input form-place__input_type_password"
            id="password"
            minLength="2"
            maxLength="200"
            value={formValue.password}
            onChange={handleChange}
          />
          <span className="popup__error popup__error_status-error"></span>

          <button className="form-place__save-button" type="submit">
            {props.buttonText}
          </button>
          <p className="form-place__paragraph">
            Уже зарегистрированы?
            <Link to="/sign-up">
              <button className="form-place__login-button">Войти</button>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
