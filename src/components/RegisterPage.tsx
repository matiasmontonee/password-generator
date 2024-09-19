import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validaciones
    let valid = true;

    if (!name) {
      setNameError('El nombre es obligatorio.');
      valid = false;
    }

    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('El correo electrónico no es válido.');
      valid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('La confirmación de la contraseña es obligatoria.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
      valid = false;
    }

    if (valid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/login');
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('El correo electrónico ya está en uso.');
        } else {
          setEmailError('Error al registrar: ' + error.message);
        }
        console.error('Error al registrar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Registrarse</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${nameError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu nombre"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu contraseña"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirma tu contraseña"
            />
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;