import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth, sendPasswordResetEmail } from '../firebase';

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setMessage('');

    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('El correo electrónico no es válido.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Correo de recuperación enviado. Revisa tu bandeja de entrada.');

      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setEmailError('No se encontró una cuenta con este correo electrónico.');
      } else {
        setEmailError('Error al enviar el correo de recuperación: ' + error.message);
      }
      console.error('Error al enviar el correo de recuperación:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Recuperar Contraseña</h1>

        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu correo"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Enviar Correo de Recuperación
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordResetPage;