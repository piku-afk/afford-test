import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Constants } from '../utils/constants';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setError('');
    try {
      const { data, status } = await axios.post(
        `http://localhost:3030/users/${email}/login`,
        {
          password,
        }
      );
      if (status === 200) {
        const { access_token, token_type } = data;
        localStorage.setItem(
          Constants.localStorageKey,
          `${token_type} ${access_token}`
        );
        navigate('/');
      }
    } catch (error) {
      const { response } = error;
      const { data, status } = response || {};
      const { message = '' } = data || {};
      // if (status) {
      setError(message);
      // }
    }
  };

  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'>
      <form
        style={{ maxWidth: 520, minWidth: 400 }}
        className='card p-4'
        onSubmit={handleSubmit}>
        <div className='col-12'>
          <h1 className='h3 text-center mb-4'>Sign In</h1>
        </div>

        {error && (
          <div className='alert alert-danger text-capitalize' role='alert'>
            {error}
          </div>
        )}
        <div className='col-12 mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            required
            className='form-control'
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
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
