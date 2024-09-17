import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaCheckCircle, FaHome, FaKey, FaSignInAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 text-white rounded-md bg-gray-800 hover:bg-gray-700">
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <nav className="mt-16">
          <ul>
            <Link to="/" onClick={toggleSidebar}>
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                    <FaHome className='mr-3' />Home
                </li>
            </Link>
            <Link to="/generator" onClick={toggleSidebar}>
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                    <FaKey className='mr-3' />Generador
                </li>
            </Link>
            <Link to="/validator" onClick={toggleSidebar}>
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                    <FaCheckCircle className='mr-3' />Validador
                </li>
            </Link>
            <Link to="/login" onClick={toggleSidebar}>
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                    <FaSignInAlt className='mr-3' />Login
                </li>
            </Link>
          </ul>
        </nav>
      </div>
      
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
      </div>
    </div>
  );
};

export default Sidebar;