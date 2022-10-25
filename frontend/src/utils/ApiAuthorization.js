export default class ApiAuthorization {
  constructor(options) {
    this._options = options;
    this._headers = {
      "Content-Type": "application/json"
    }
  }

  _handleErrors(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Возникла ошибка');
  }

  registrationUser({values}) {
    return fetch(`${this._options}/sign-up`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email': values.login,
        'password': values.password
      })
    })
    .then(res => this._handleErrors(res));
  }

  authorizationUser({values}) {
    return fetch(`${this._options}/sign-in`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'email': values.login,
        'password': values.password
      })
    })
    .then(res => this._checkResponse(res));
  }

  getEmail(token) {
    return fetch(`${this._options}/user/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._handleErrors(res));
  }
}