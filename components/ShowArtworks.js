/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getArtworks } from '../api/artworkData';
import ArtworkCard from './ArtworkCard';
import { searchArtwork } from '../api/mergeData';

function ShowArtworks({ search }) {
  const [artworks, setArtworks] = useState([]);

  const { user } = useAuth();
  let getAllTheArtworks = '';

  if (search === '') {
    getAllTheArtworks = () => {
      getArtworks(user.uid).then(setArtworks);
    };
  } else {
    getAllTheArtworks = () => {
      searchArtwork(user.uid, search).then(setArtworks);
    };
  }

  useEffect(() => {
    getAllTheArtworks();
  }, [search, user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/artwork/new" passHref>
        <Button variant="light">Add An Artwork</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over authors here using AuthorCard component */}
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.firebaseKey} artObj={artwork} onUpdate={getAllTheArtworks} />
        ))}
      </div>

    </div>
  );
}
ShowArtworks.propTypes = {
  search: PropTypes.string.isRequired,
};

export default ShowArtworks;
