import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h1 className="text-2xl font-bold text-center">¡Bienvenido al SafeNest!</h1>
        <p className='my-8'>En esta aplicación, puedes generar contraseñas seguras y personalizadas para proteger tus cuentas y datos personales. Nuestro generador te permite crear contraseñas con diferentes configuraciones, como incluir mayúsculas, números o símbolos, asegurando que sean lo suficientemente robustas para cualquier plataforma. Además, también ofrecemos una herramienta de validación de contraseñas, donde puedes comprobar si la contraseña que has creado cumple con los estándares de seguridad necesarios. <br /> ¡Empieza ahora para proteger tu información de manera fácil y rápida!</p>

        <div className="space-x-4 flex justify-center">
          <Link to="/generator">
            <button className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Generar Contraseña</button>
          </Link>
        
          <Link to="/login">
            <button className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">Iniciar Sesión</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;