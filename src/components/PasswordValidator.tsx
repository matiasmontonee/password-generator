import React, { useState } from 'react';
import { validatePasswordStrength } from '../utils/validationUtils';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { FaPaste } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../firebase';

const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(validatePasswordStrength(value));
  };

  const handlePastePassword = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPassword(text);
      setStrength(validatePasswordStrength(text));
    } catch (error) {
      console.error('Error al pegar desde el portapapeles:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClearPassword = () => {
    setPassword('');
    setStrength(0);
  };

  const handleSavePassword = async () => {
    if (password.trim() === '') return;

    setIsSaving(true);

    try {
      await addDoc(collection(db, 'savedPasswords'), {
        password: password,
        createdAt: new Date(),
      });

      setTimeout(() => setIsSaving(false), 2000);
    } catch (error) {
      console.error('Error al guardar la contraseña en Firestore:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center pt-16 bg-gray-200'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Validador de Contraseñas</h2>

        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Contraseña 
            <span className='ml-1 text-xs text-gray-600'>(máximo 30 caracteres)</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
            maxLength={30}
            className="w-full p-2 border border-gray-300 rounded-md pr-10"
          />
        
          <button
            onClick={handlePastePassword}
            className="absolute inset-y-0 right-0 top-6 flex items-center pr-2 text-gray-500 hover:text-blue-500"
          >
            <FaPaste className="h-5 w-5" />
          </button>
        </div>

        <div className='flex justify-between items-center mt-1'>
          <button onClick={handleClearPassword} className='text-gray-500 hover:text-blue-500'>
            Limpiar
          </button>

          <button onClick={toggleShowPassword} className="text-gray-500 hover:text-blue-500">
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>

        <PasswordStrengthMeter strength={strength} />

        <button
          onClick={handleSavePassword}
          className={`w-full p-2 rounded-md mt-4 mb-2 transition-colors duration-500 ${isSaving ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {isSaving ? '¡Contraseña Guardada!' : 'Guardar Contraseña'}
        </button>

        <Link to="/generator" className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-center block">
          Generar Nueva Contraseña
        </Link>
      </div>
    </div>
  );
};

export default PasswordValidator;