export default class Api {
  constructor(options) {
    this._options = options;
    this._headers = {
      'Content-type': 'application/json'
    }
  }

  _handleErrors(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Возникла ошибка');
  }

  getCardsInfo() {
    return fetch(`${this._options}/cards`, {
      method: 'GET',
      credentials: "include", 
      headers: this._headers
    })
      .then((res) => {
        return this._handleErrors(res);
      });
  }

  getUserInfo() {
    return fetch(`${this._options}/users/me`, {
      method: 'GET',
      credentials: "include", 
      headers: this._headers,
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  }

  editAvatar(profileAvatar) {
    return fetch(`${this._options}/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include", 
      headers: this._headers,
      body: JSON.stringify({
        avatar: profileAvatar
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }

  editProfile(fullnameProfile, aboutProfile) {
    return fetch(`${this._options}/users/me`, {
      method: 'PATCH',
      credentials: "include", 
      headers: this._headers,
      body: JSON.stringify({
        name: fullnameProfile,
        about: aboutProfile
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }
  
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._options}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: "include", 
      headers: this._headers
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }

  addCard(cardName, cardLink) {
    return fetch(`${this._options}/cards`, {
      method: 'POST',
      credentials: "include", 
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then((res) => {
        return this._handleErrors(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._options}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: "include", 
      headers: this._headers,
    })
      .then((res) => {
        return this._handleErrors(res);
      });
  }
}