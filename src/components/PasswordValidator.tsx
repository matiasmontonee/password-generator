import React, { useState } from 'react';
import { validatePasswordStrength } from '../utils/validationUtils';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { FaPaste } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db, collection, addDoc, auth } from '../firebase';

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

    if (!auth.currentUser) {
      console.error('Usuario no autenticado. No se puede guardar la contraseña.');
      return;
    }

    setIsSaving(true);

    try {
      await addDoc(collection(db, 'savedPasswords'), {
        password: password,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
      });

      setTimeout(() => setIsSaving(false), 2000);
    } catch (error) {
      console.error('Error al guardar la contraseña en Firestore:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center bg-gray-200 pt-20 pb-8 sm:pb-0 sm:pt-16'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:max-w-xl h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Validador de Contraseñas</h1>

        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1 label-dark-mode" htmlFor="password">
            Contraseña 
            <span className='ml-1 text-xs text-gray-600 label-dark-mode'>(máximo 30 caracteres)</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
            maxLength={30}
            className="w-full p-2 border border-gray-300 rounded-md pr-10 input-dark-mode"
          />
        
          <button
            onClick={handlePastePassword}
            className="absolute inset-y-0 right-0 top-6 flex items-center pr-2 text-gray-500 hover:text-gray-600 icon-dark-mode"
          >
            <FaPaste className="h-5 w-5" />
          </button>
        </div>

        <div className='flex justify-between items-center mt-1'>
          <button onClick={handleClearPassword} className='text-gray-500 hover:text-blue-500 label-dark-mode'>
            Limpiar
          </button>

          <button onClick={toggleShowPassword} className='text-gray-500 hover:text-blue-500 label-dark-mode'>
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>

        <PasswordStrengthMeter strength={strength} />

        <button
          onClick={auth.currentUser ? handleSavePassword : undefined}
          className={`w-full p-2 rounded-md mt-4 mb-2 transition-colors duration-500 ${auth.currentUser ? (isSaving ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600 primary-button-dark-mode') : 'bg-blue-300 text-gray-500 cursor-not-allowed disabled-button-dark-mode'} text-white`}
          disabled={!auth.currentUser}
        >
          {auth.currentUser ? (isSaving ? '¡Contraseña Guardada!' : 'Guardar Contraseña') : 'Guardar (debes iniciar sesión)'}
        </button>

        <Link to="/generator" className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-center block secondary-button-dark-mode">
          Generar Nueva Contraseña
        </Link>
      </div>
    </div>
  );
};

export default PasswordValidator;