import React, { useState } from 'react';
import { generatePassword, PasswordOptions } from '../utils/passwordUtils';
import InputField from './InputField';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';

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
    if (length < 6) {
      setError('La longitud debe ser de al menos 6 caracteres.');
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Generador de Contraseñas</h2>

      <InputField
        label="Longitud de la contraseña"
        type="number"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700">Incluir:</label>
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
      </div>

      <button 
        onClick={handleGeneratePassword} 
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Generar Contraseña
      </button>

      {password && (
        <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded-md">
          <span className="text-lg">{password}</span>

          <button onClick={handleCopyPassword}>
            {copySuccess ? (
              <FaClipboardCheck className="h-6 w-6 text-green-500" />
            ) : (
              <FaClipboard className="h-6 w-6 text-gray-500 hover:text-blue-500" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;