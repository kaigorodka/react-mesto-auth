import React from "react";

import * as auth from "./Auth";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [formValue, setFormValue] = React.useState({
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: "", email: "" });
          props.handleLogin(e);
          navigate("/", { replace: true });
        }
      })
      .catch(props.onErr);
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
        </form>
      </div>
    </>
  );
}

export default Login;
