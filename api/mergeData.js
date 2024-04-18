import { getArtworks } from './artworkData';

const searchArtwork = async (uid, searchQuery) => {
  const allArtworks = await getArtworks(uid);
  const filteredArtworks = await allArtworks.filter((artwork) => (
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    || artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())
    || artwork.medium.toLowerCase().includes(searchQuery.toLowerCase())));

  return filteredArtworks;
};

export default searchArtwork;
