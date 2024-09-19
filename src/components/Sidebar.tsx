import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaCheckCircle, FaHome, FaKey, FaSignInAlt, FaHistory, FaMoon, FaSun, FaUserAlt } from 'react-icons/fa';
import safenest from '../assets/images/safenest.png';
import { auth } from '../firebase';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 text-white rounded-md bg-gray-800 hover:bg-gray-700">
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <nav className="mt-16">
          <ul>
            <Link to="/">
              <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                <FaHome className='mr-3' />Home
              </li>
            </Link>
            <Link to="/generator">
              <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                <FaKey className='mr-3' />Generador
              </li>
            </Link>
            <Link to="/validator">
              <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                <FaCheckCircle className='mr-3' />Validador
              </li>
            </Link>

            {user && ( // Si el usuario está autenticado, muestra la opción de Historial
              <Link to="/history">
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                  <FaHistory className='mr-3' />Historial
                </li>
              </Link>
            )}
            
            {user ? ( // Si el usuario está autenticado, muestra la opción de Perfil
              <Link to="/profile">
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                  <FaUserAlt className='mr-3' />Perfil
                </li>
              </Link>
            ) : ( // Si el usuario no está autenticado, muestra la opción de Iniciar Sesión
              <Link to="/login">
                <li className="flex items-center py-4 px-6 hover:bg-gray-700">
                  <FaSignInAlt className='mr-3' />Iniciar Sesión
                </li>
              </Link>
            )}

            <button onClick={toggleTheme} className="flex items-center py-4 px-6 hover:bg-gray-700 w-full">
              <span className='mr-3'>{isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}</span>
              <span>{isDarkMode ? 'Tema claro' : 'Tema oscuro'}</span>
            </button>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-6 flex items-center">
          <p className='text-2xl mr-4'>SafeNest</p>
          <img src={safenest} alt="SafeNest" className='w-10 h-10' />
        </div>
      </div>

      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
      </div>
    </div>
  );
};

export default Sidebar;