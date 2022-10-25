export default class Api {
  constructor(options) {
    this._options = options;
    this._headers = {
      'Content-type': 'application/json',
      authorization: 'f14481c5-e77c-456f-a863-20543b32692f'
    }
  }

  _handleErrors(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Возникла ошибка');
  }

  getInitialCards() {
    return fetch(`${this._options}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._handleErrors(res);
      });
  }

  identificationProfile() {
    return fetch(`${this._options}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handleErrors(res);
    })
  }

  editAvatar(profileAvatar) {
    return fetch(`${this._options}/users/me/avatar`, {
      method: 'PATCH',
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
      headers: this._headers
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }

  addCard(cardName, cardLink) {
    return fetch(`${this._options}/cards`, {
      method: 'POST',
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
      headers: this._headers,
    })
      .then((res) => {
        return this._handleErrors(res);
      });
  }
}