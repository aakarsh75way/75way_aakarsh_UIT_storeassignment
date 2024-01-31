import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    console.log("i am being called")
    // Remove session token and role from localStorage
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('role');

    // Reload the page
    window.location.reload();
  };



  return (
    <div className='bg-black flex justify-between items-center h-24 max-w-[100%] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold'>
        <span style={{ color: '#FF5733' }}>My</span>
        <span style={{ color: '#00df9a' }}>Store</span>
      </h1>


      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

         
      </ul>
      <button
          onClick={handleLogout}
          className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
          Logout
          </button>
    </div>
  );
};

export default Navbar;
