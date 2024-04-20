import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createArtwork, updateArtwork } from '../../api/artworkData';
import { getMuseums } from '../../api/museumData';

const initialState = {
  title: '',
  image: '',
  medium: '',
};

function ArtworkForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [museums, setMuseums] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMuseums(user.uid).then(setMuseums);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateArtwork(formInput).then(() => router.push('/artworks'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createArtwork(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateArtwork(patchPayload).then(() => {
          router.push('/artworks');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Artwork</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Artwork Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Artwork Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ARTIST INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Artist's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Artist's Name"
          name="artist"
          value={formInput.artist}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Artwork Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* MEDIUM INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="medium" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Artwork Medium"
          name="medium"
          value={formInput.medium}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="museum">
        <Form.Select
          aria-label="Museum"
          name="museum_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.museum_id}
          required
        >
          <option value="">Select a Museum</option>
          {
            museums.map((museum) => (
              <option
                key={museum.firebaseKey}
                value={museum.firebaseKey}
              >
                {museum.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Artwork</Button>
    </Form>
  );
}

ArtworkForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    medium: PropTypes.string,
    museum_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ArtworkForm.defaultProps = {
  obj: initialState,
};

export default ArtworkForm;
