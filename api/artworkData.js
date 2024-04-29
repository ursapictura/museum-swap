import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getArtworks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks.json`, {
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

const createArtwork = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks.json`, {
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

const getSingleArtwork = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateArtwork = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks/${payload.firebaseKey}.json`, {
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

const deleteSingleArtwork = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/artworks/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMuseumArtworks = (firebaseKey) => new Promise((resolve, reject) => {
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
  getArtworks,
  createArtwork,
  getSingleArtwork,
  updateArtwork,
  deleteSingleArtwork,
  getMuseumArtworks,
};
