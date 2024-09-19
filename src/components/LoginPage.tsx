import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setLoginError('');
    
    let valid = true;

    // Validaciones
    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      valid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      valid = false;
    }

    if (valid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        
        console.log('Usuario autenticado con éxito:', email);
        
        navigate('/');
      } catch (error: any) {
        setLoginError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        console.error('Error al iniciar sesión:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Ingresa tu correo"
            />

            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 top-2 flex items-center text-sm"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-700" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>

            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {loginError && <p className="text-red-500 mb-4 text-center">{loginError}</p>}

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <Link to='/password-reset' className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;