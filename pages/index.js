import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import MuseumCard from '../components/MuseumCard';
import { getMuseums } from '../api/museumData';

function Home() {
  const [museums, setMuseums] = useState([]);

  const { user } = useAuth();

  const getAllMuseums = () => {
    getMuseums(user.uid).then(setMuseums);
  };

  useEffect(() => {
    getAllMuseums();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/museum/new" passHref>
        <Button>Add A Museum</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {museums.map((museum) => (
          <MuseumCard key={museum.firebaseKey} museumObj={museum} onUpdate={getMuseums} />
        ))}
      </div>
    </div>
  );
}

export default Home;
