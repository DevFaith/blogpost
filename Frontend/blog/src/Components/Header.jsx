import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className='w-full relative h-16 bg-gray-400 border-b border-red-200 px-5 flex justify-between items-center'>
        <div className='flex justify-start gap-20 items-center'>
          <h1 className='text-5xl text-white '>Blogger.com</h1>
        </div>
        <div className='hidden md:flex justify-center items-center'>
          <ul className='flex gap-8 text-white text-2xl'>
            <li>
              <Link to='/' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Home</Link>
            </li>
            <li>
              <Link to='/blogs' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Blogs</Link>
            </li>
            <li>
              <Link to='/addblog' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Addblog</Link>
            </li>
            
            <li>
              <Link to='/login' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Login</Link>
            </li>
            
          </ul>
        </div>
        <div className='md:hidden flex items-center'>
          {dropdown ? (
            <IoMdClose
              className='text-white text-3xl cursor-pointer'
              onClick={() => setDropdown(false)}
            />
          ) : (
            <FaBars
              className='text-white text-3xl cursor-pointer'
              onClick={() => setDropdown(true)}
            />
          )}
        </div>
      </div>
      {dropdown && (
        <div className='w-full bg-gray-400 flex flex-col items-center md:hidden'>
          <ul className='flex flex-col gap-4 text-white text-2xl'>
            <li>
              <Link to='/' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Home</Link>
            </li>
            <li>
              <Link to='/blog' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Blogs</Link>
            </li>
            <li>
              <Link to='/addblog' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Addblog</Link>
            </li>
            <li>
              <Link to='login' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Login</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
