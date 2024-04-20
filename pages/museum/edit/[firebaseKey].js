import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MuseumForm from '../../../components/forms/MuseumForm';
import { getSingleMuseum } from '../../../api/museumData';

export default function EditMuseum() {
  const [editMuseum, setEditMuseum] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMuseum(firebaseKey).then(setEditMuseum);
  }, [firebaseKey]);

  return (<MuseumForm obj={editMuseum} />);
}
