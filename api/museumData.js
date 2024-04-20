import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMuseums = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/museums.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createMuseum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/museums.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleMuseum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/museums/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMuseum = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/museums/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleMuseum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/museums/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMuseumArtwork = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks.json?orderBy="museum_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getMuseums,
  createMuseum,
  getSingleMuseum,
  updateMuseum,
  deleteSingleMuseum,
  getMuseumArtwork,
};
