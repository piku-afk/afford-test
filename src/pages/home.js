import { useEffect } from 'react';
import { Constants } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem(Constants.localStorageKey);
    if (!authToken) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center'>
      <h1 className='h3'>Welcome</h1>
    </div>
  );
};
