import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMuseum, updateMuseum } from '../../api/museumData';

const initialState = {
  name: '',
  image: '',
  location: '',
};

function MuseumForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

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
      updateMuseum(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMuseum(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMuseum(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Museum</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Museum Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Museum Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Museum Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Museum Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Museum Location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Museum Location"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Museum</Button>
    </Form>
  );
}

MuseumForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MuseumForm.defaultProps = {
  obj: initialState,
};

export default MuseumForm;
