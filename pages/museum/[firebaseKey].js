/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
        {console.warn(museumDetails)}
        { museumDetails.artworks?.map((artwork) => (
          <ArtworkCard key={artwork.firebaseKey} artObj={artwork} onUpdate={getMuseumDetails} />
        ))}
      </div>
    </>
  );
}
