/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import { viewMuseumDetails } from '../../api/mergeData';

export default function ViewMuseum() {
  const [museumDetails, setMuseumDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  const getMuseumDetails = () => {
    viewMuseumDetails(firebaseKey).then(setMuseumDetails);
  };

  // make call to API layer to get the data
  useEffect(() => {
    getMuseumDetails();
  }, [firebaseKey]);

  return (
    <>
      {museumDetails.private === true ? (
        <Card key={museumDetails.firebaseKey} style={{ width: '18rem', margin: '10px', textAlign: 'center' }}>
          <Card.Img variant="top" src={museumDetails.image} alt={museumDetails.name} style={{ width: '18rem' }} />
          <Card.Body>
            <Card.Title className="art-title">{museumDetails.name}</Card.Title>
            <h5>These Artworks Cannot Be Viewed By the Public!</h5>
            <p>Want to keep art available to everyone?</p>
            <p>Support public museums!</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="mt-5 d-flex flex-wrap">
            <div className="text-white ms-5 details">
              <h5>
                {museumDetails.name}
              </h5>
              Location:{museumDetails.location}
              <hr />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {museumDetails.artworks?.map((artwork) => (
              <ArtworkCard key={artwork.firebaseKey} artObj={artwork} onUpdate={getMuseumDetails} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
