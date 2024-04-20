import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMuseumArtworks } from '../api/mergeData';

function MuseumCard({ museumObj, onUpdate }) {
  console.warn(museumObj);
  const deleteThisMuseum = () => {
    if (window.confirm(`Delete ${museumObj.name}?`)) {
      deleteMuseumArtworks(museumObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card key={museumObj.firebaseKey} style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={museumObj.image} alt={museumObj.name} style={{ width: '18rem' }} />
      <Card.Body>
        <Card.Title className="art-title">{museumObj.name}</Card.Title>
        <h5 className="card-text bold">{museumObj.location}</h5>
        <Link href={`/museum/edit/${museumObj.firebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-dark" onClick={deleteThisMuseum} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MuseumCard.propTypes = {
  museumObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MuseumCard;
