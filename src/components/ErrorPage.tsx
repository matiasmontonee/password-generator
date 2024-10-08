import React from 'react';
import { Link } from 'react-router-dom';
import safenest from '../assets/images/safenest.png';

const Error404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <img src={safenest} alt="SafeNest" className='w-16 sm:w-20 h-16 sm:h-20 bg-black p-2 sm:p-4 rounded-md img-dark-mode' />
      <h1 className="text-2xl sm:text-4xl font-bold my-4 text-red-500">404 - Página No Encontrada</h1>
      <p className="mb-4 sm:text-lg text-gray-700 label-dark-mode">Uy! La página que estás buscando no existe.</p>
      <Link to="/" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 primary-button-dark-mode">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Error404;