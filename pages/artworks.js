/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getArtworks } from '../api/artworkData';
import ArtworkCard from '../components/ArtworkCard';

function ShowArtworks() {
  const [artworks, setArtworks] = useState([]);

  const { user } = useAuth();

  const getAllTheArtworks = () => {
    getArtworks(user.uid).then(setArtworks);
  };

  useEffect(() => {
    getAllTheArtworks();
  }, []);

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

export default ShowArtworks;
