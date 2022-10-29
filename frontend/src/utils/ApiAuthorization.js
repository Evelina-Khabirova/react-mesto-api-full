export default class ApiAuthorization {
  constructor(options) {
    this._options = options;
    this._headers = {
      credential: 'include',
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  }

  _handleErrors(res) {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Возникла ошибка');
  }

  registrationUser({email, password}) {
    return fetch(`${this._options}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }

  authorizationUser({email, password}) {
    return fetch(`${this._options}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    })
    .then((res) => {
      return this._handleErrors(res);
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('token', data.token)
    });
  }

  getToken() {
    return fetch(`${this._options}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: "include",
    })
    .then((res) => {
      return this._handleErrors(res);
    });
  }
}