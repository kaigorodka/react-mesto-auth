import React from "react";
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => {
        return this._getResponseData(res);
      }
    );
  }
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        return this._getResponseData(res);
      }
    );
  }
  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteCard(data) {
    console.log(data);
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  likeThePhoto(data) {
    console.log(data);
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      console.log(res);
      return this._getResponseData(res);
    });
  }
  removeLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  changeLikeCardStatus({ data, isLiked }) {
    if (isLiked) {
      return this.removeLike(data);
    } else {
      return this.likeThePhoto(data);
    }
  }
}
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "946c735e-253d-40be-bd13-90c7647e3ddc",
    "Content-Type": "application/json",
  },
});
export default api;
