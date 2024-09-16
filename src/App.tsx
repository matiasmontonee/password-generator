import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation  } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import PasswordValidator from './components/PasswordValidator';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="my-8">
        <ul className="flex">
          <li>
            <Link to="/" className={`${location.pathname === '/' ? 'text-white bg-blue-500 p-2 px-4 rounded-md rounded-r-none font-bold' : 'text-white bg-gray-400 hover:bg-gray-500 py-2 px-4 rounded-md rounded-r-none font-bold'}`}>
              Generador de Contraseñas
            </Link>
          </li>
          <li>
            <Link to="/validator" className={`${location.pathname === '/validator' ? 'text-white bg-blue-500 p-2 px-4 rounded-md rounded-l-none font-bold' : 'text-white bg-gray-400 hover:bg-gray-500 py-2 px-4 rounded-md rounded-l-none font-bold'}`}>
              Validador de Contraseñas
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PasswordGenerator />} />
        <Route path="/validator" element={<PasswordValidator />} />
      </Routes>
    </div>
  );
};

export default App;