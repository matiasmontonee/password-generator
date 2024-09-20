import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signOut, updateProfile } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
        });

        await signOut(auth);
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
    <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-8 sm:pb-0 sm:pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 sm:max-w-xl h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Registrarse</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 label-dark-mode" htmlFor="name">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border input-dark-mode ${nameError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu nombre"
            />

            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 label-dark-mode" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border input-dark-mode ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu correo"
            />

            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 label-dark-mode" htmlFor="password">
              Contraseña
            </label>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border input-dark-mode ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 top-1.5 flex items-center text-sm"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-700 hover:text-gray-500 eye-dark-mode" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-700 hover:text-gray-500 eye-dark-mode" />
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 label-dark-mode" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <div className='relative flex items-center'>
              <input
                type={showPasswordConfirmation ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border input-dark-mode ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Confirma tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className="absolute inset-y-0 right-0 pr-3 top-1.5 flex items-center text-sm"
              >
                {showPasswordConfirmation ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-700 hover:text-gray-500 eye-dark-mode" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-700 hover:text-gray-500 eye-dark-mode" />
                )}
              </button>
            </div>
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors primary-button-dark-mode"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 label-dark-mode">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;