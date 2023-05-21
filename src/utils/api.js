export default class Api {
    constructor({baseUrl, headers}) {
      this._url = baseUrl;
      this._header = headers;
    }
    _checkData(res) {
      return res.ok? res.json(): Promise.reject(`Ошибка: ${res.status}`);
    }
    getLikes(method, cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: method,
        headers: this._header
      })
      .then((res) => {
         return this._checkData(res);
      });
    }
    
    getInitialCards() {
        return fetch(this._url + 'cards', {
            headers: this._header
          })
          .then(res => {
            return this._checkData(res);
          });
    }

    addNewCard(data) {
      return fetch(this._url + 'cards ', {
        method: 'POST',
        headers: this._header,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => {
        return this._checkData(res);
      });
    }

    getUserData() {
      return fetch(this._url +'/users/me', {
        method: 'GET',
        headers: this._header
      })
      .then(res => {
        return this._checkData(res);
      });
    }

    editUser(name, about) {
      fetch(this._url +'/users/me', {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then((res) => {
        return this._checkData(res);
      });  
    }

    setUserLogo(link) {
      fetch(this._url +'/users/me/avatar', {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then((res) => {
        return this._checkData(res);
      });  
    }

    deleteCard(id) {
       fetch(this._url + 'cards/' + id, {
        method: 'DELETE',
        headers: this._header
      })
      .then((res) => {
        return this._checkData(res);
      });
    }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: '6b7c306a-38f3-4456-bb25-4b5474285830',
    'Content-Type': 'application/json'
  },
});