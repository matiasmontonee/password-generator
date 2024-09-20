import React, { useState } from 'react';
import { generatePassword, PasswordOptions } from '../utils/passwordUtils';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db, collection, addDoc, auth } from '../firebase';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState<number>(12);
  const [error, setError] = useState<string | null>(null);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleGeneratePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setError('Debes seleccionar al menos un tipo de caracter.');
      return;
    }

    const options: PasswordOptions = {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    };
    const generatedPassword = generatePassword(options);
    setPassword(generatedPassword);
    setCopySuccess(false);
    setError(null);

    if (auth.currentUser) { // Solo guarda la contraseña si el usuario está logueado
      savePasswordToFirestore(generatedPassword);
    }
  };

  const savePasswordToFirestore = async (generatedPassword: string) => {
    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'generatedPasswords'), {
          password: generatedPassword,
          createdAt: new Date(),
          userId: auth.currentUser.uid,
        });
      } catch (e) {
        console.error("Error al guardar la contraseña: ", e);
      }
    }
  };

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopySuccess(true);
    }

    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-200 pt-20 pb-8 sm:pb-0 sm:pt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:max-w-xl h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Generador de Contraseñas</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 label-dark-mode">Longitud de la contraseña: {length}</label>
          <input
            type="range"
            min={4}
            max={30}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 label-dark-mode">Incluir:</label>
          <div className="mt-2 space-y-1">
            <label className="flex items-center">
              <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="mr-2"/>Mayúsculas
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="mr-2"/>Minúsculas
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="mr-2"/>Números
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="mr-2"/>Símbolos
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button onClick={handleGeneratePassword} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 primary-button-dark-mode">
          Generar Contraseña
        </button>

        <Link to="/validator" className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 mt-2 text-center block secondary-button-dark-mode">
          Validar Contraseña
        </Link>

        {password && (
          <div className="mt-4 bg-gray-200 p-2 rounded-md font-semibold flex">
            <div className="flex-1 break-words text-md sm:text-lg" style={{ wordBreak: 'break-all' }}>
              {password}
            </div>
            <button onClick={handleCopyPassword} className="ml-4 flex-shrink-0">
              {copySuccess ? (
                <FaClipboardCheck className="h-6 w-6 text-green-500" />
              ) : (
                <FaClipboard className="h-6 w-6 text-gray-500 hover:text-gray-600 icon-dark-mode" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;