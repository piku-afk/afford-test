import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError('');
    try {
      const { data, status } = await axios.post(
        'http://localhost:3030/signup',
        formData
      );
      if (status === 201) {
        navigate('/signin');
      }
    } catch (error) {
      const { response } = error;
      const { status, data } = response;
      const { message } = data;
      if (status === 409) {
        setError('User already exists');
      } else if (message) {
        setError(message);
      }
    }
  };

  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'>
      <form
        style={{ maxWidth: 520 }}
        className='card p-4'
        onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-12'>
            <h1 className='h3 text-center mb-4'>Sign Up</h1>
          </div>

          {error && (
            <div className='alert alert-danger text-capitalize' role='alert'>
              {error}
            </div>
          )}
          <div className='col-6 mb-3'>
            <label htmlFor='firstname' className='form-label'>
              First Name
            </label>
            <input
              required
              id='firstname'
              type='text'
              className='form-control'
              name='firstname'
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className='col-6 mb-3'>
            <label htmlFor='lastname' className='form-label'>
              Last Name
            </label>
            <input
              className='form-control'
              required
              id='lastname'
              type='text'
              name='lastname'
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className='col-12 mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              className='form-control'
              required
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='col-12 mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              required
              className='form-control'
              id='password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className='col-12'>
            <button
              style={{ marginLeft: 'auto' }}
              type='submit'
              className='btn btn-primary d-block'>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
