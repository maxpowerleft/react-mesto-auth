class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`АЛАРМ! Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }

  patchUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getResponse)
  }

  patchUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._getResponse);
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._getResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '1a380a79-3cff-47a0-9f14-eca29c961cf4',
    'Content-Type': 'application/json'
  }
});

export default api;