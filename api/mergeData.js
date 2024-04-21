import {
  deleteSingleArtwork,
  getArtworks,
  getMuseumArtworks,
} from './artworkData';
import { deleteSingleMuseum, getSingleMuseum } from './museumData';

const searchArtwork = async (uid, searchQuery) => {
  const allArtworks = await getArtworks(uid);
  const filteredArtworks = await allArtworks.filter((artwork) => (
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    || artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())
    || artwork.medium.toLowerCase().includes(searchQuery.toLowerCase())));

  return filteredArtworks;
};

const deleteMuseumArtworks = (museumId) => new Promise((resolve, reject) => {
  getMuseumArtworks(museumId).then((artworkArray) => {
    const deleteArtworkPromises = artworkArray.map((artwork) => deleteSingleArtwork(artwork.firebaseKey));

    Promise.all(deleteArtworkPromises).then(() => {
      deleteSingleMuseum(museumId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewMuseumDetails = (museumFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleMuseum(museumFirebaseKey), getMuseumArtworks(museumFirebaseKey)])
    .then(([museumObject, museumArtworkArray]) => {
      resolve({ ...museumObject, artworks: museumArtworkArray });
    }).catch((error) => reject(error));
});

export {
  searchArtwork,
  deleteMuseumArtworks,
  viewMuseumDetails,
};
