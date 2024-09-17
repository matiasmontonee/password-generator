import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bienvenido al Generador de Contraseñas</h1>
      
      <div className="space-x-4">
        <Link to="/generator">
          <button
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Ir al Generador de Contraseñas
          </button>
        </Link>
        
        <Link to="/login">
          <button
            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;