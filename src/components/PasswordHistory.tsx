import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const PasswordHistory: React.FC = () => {
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [savedPasswords, setSavedPasswords] = useState<string[]>([]);

  useEffect(() => {
    const passwords = JSON.parse(localStorage.getItem('generatedPasswords') || '[]');
    setGeneratedPasswords(passwords.slice(-10));

    const saved = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    setSavedPasswords(saved.slice(-10));
  }, []);

  const handleDeletePassword = (password: string) => {
    const updatedPasswords = savedPasswords.filter(p => p !== password);
    setSavedPasswords(updatedPasswords);
    localStorage.setItem('savedPasswords', JSON.stringify(updatedPasswords));
  };

  return (
    <div className='min-h-screen flex justify-center pt-16 bg-gray-200'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Historial de Contraseñas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contraseñas Generadas</h2>
            <ul className="list-disc list-inside">
              {generatedPasswords.map((password, index) => (
                <li key={index} className="mb-1">{password}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contraseñas Guardadas</h2>
            <ul className="list-disc list-inside">
              {savedPasswords.map((password, index) => (
                <li key={index} className="mb-1 flex justify-between items-center">
                  <span>{password}</span>
                  <button
                    onClick={() => handleDeletePassword(password)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordHistory;