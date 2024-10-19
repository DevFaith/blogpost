import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../Firebase/Config';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); 
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-bold text-gray-700 mb-6'>Login</h1>

        {error && <p className='mb-4 text-red-500'>{error}</p>}

        <form onSubmit={login}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              placeholder='Enter email...'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
          </div>

          <div className='mb-6'>
            <label htmlFor="password" className='block text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              placeholder='Enter password...'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
          </div>

          <button 
            type='submit'
            className='w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300'>
            Login
          </button>
        </form>

        <p className='mt-4 text-gray-700'>
          Don't have an account? <Link to="/signup" className='text-gray-500 underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
