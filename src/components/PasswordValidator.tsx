import React, { useState } from 'react';
import { validatePasswordStrength } from '../utils/validationUtils';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { FaPaste } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Manejar el cambio de contraseña y actualizar la fuerza
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(validatePasswordStrength(value));
  };

  // Manejar la acción de pegar la contraseña
  const handlePastePassword = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPassword(text);
      setStrength(validatePasswordStrength(text));
    } catch (error) {
      console.error('Error al pegar desde el portapapeles:', error);
    }
  };

  // Alternar visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Limpiar el campo de contraseña
  const handleClearPassword = () => {
    setPassword('');
    setStrength(0);
  };

  return (
    <div className='min-h-screen flex justify-center pt-16 bg-gray-100'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Validador de Contraseñas</h2>

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
            className="w-full p-2 border border-gray-300 rounded-md pr-10"
          />
        
          <button
            onClick={handlePastePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 hover:text-blue-500"
          >
            <FaPaste className="h-5 w-5" />
          </button>
        </div>

        <div className='flex justify-between items-center mt-1'>
          <button onClick={handleClearPassword} className='text-gray-500 hover:text-blue-500'>
            Limpiar
          </button>

          <button onClick={toggleShowPassword} className="text-gray-500 hover:text-blue-500">
            {showPassword ? (
              <p>Ocultar</p>
            ) : (
              <p>Ver</p>
          )}
          </button>
        </div>

        <PasswordStrengthMeter strength={strength} />

        <Link to="/generator" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-8">
          Generar Nueva Contraseña
        </Link>
      </div>
    </div>
  );
};

export default PasswordValidator;