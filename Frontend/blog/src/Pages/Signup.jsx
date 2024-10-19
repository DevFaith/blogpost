import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from '../Firebase/Config';
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-bold text-gray-700 mb-6'>Sign Up</h1>

        {error && <p className='mb-4 text-red-500'>{error}</p>}

        <form onSubmit={signup}>
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

          <div className='mb-4'>
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

          <div className='mb-6'>
            <label htmlFor="confirmPassword" className='block text-gray-700 mb-2'>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm password...'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
            />
          </div>

          <button 
            type='submit'
            className='w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300'>
            Sign Up
          </button>
        </form>

        <p className='mt-4 text-gray-700'>
          Already have an account? <Link to="/login" className='text-gray-500 underline'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
