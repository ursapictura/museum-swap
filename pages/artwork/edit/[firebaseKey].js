import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleArtwork } from '../../../api/artworkData';
import ArtworkForm from '../../../components/forms/ArtworkForm';

export default function EditArtwork() {
  const [editArt, setEditArt] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleArtwork(firebaseKey).then(setEditArt);
  }, [firebaseKey]);

  return (<ArtworkForm obj={editArt} />);
}
