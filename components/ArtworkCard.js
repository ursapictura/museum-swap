import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleArtwork } from '../api/artworkData';

function ArtworkCard({ artObj, onUpdate }) {
  const deleteThisArtwork = () => {
    if (window.confirm(`Delete ${artObj.title}?`)) {
      deleteSingleArtwork(artObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={artObj.image} alt={artObj.title} style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title className="art-title">{artObj.title}</Card.Title>
        <h5 className="card-text bold">{artObj.artist}</h5>
        <h6 className="card-text">{artObj.medium}</h6>
        <Link href={`/artwork/edit/${artObj.firebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-dark" onClick={deleteThisArtwork} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ArtworkCard.propTypes = {
  artObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
    medium: PropTypes.string,
    museum_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ArtworkCard;
