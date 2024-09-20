import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboard, FaClipboardCheck, FaTrash } from 'react-icons/fa';
import { collection, getDocs, deleteDoc, doc, db, query, where, limit } from '../firebase';
import { auth, onAuthStateChanged } from '../firebase';

interface Password {
  id: string;
  password: string;
}

const PasswordHistory: React.FC = () => {
  const [generatedPasswords, setGeneratedPasswords] = useState<Password[]>([]);
  const [savedPasswords, setSavedPasswords] = useState<Password[]>([]);
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        const currentUserId = user.uid;
        fetchPasswords(currentUserId);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchPasswords = async (userId: string) => {
    try {
      // Obtener las últimas 10 contraseñas generadas por el usuario actual
      const generatedQuery = query(
        collection(db, 'generatedPasswords'),
        where('userId', '==', userId),
        limit(10)
      );
      const generatedSnapshot = await getDocs(generatedQuery);
      const generatedData = generatedSnapshot.docs.map(doc => ({
        id: doc.id,
        password: doc.data().password,
      }));
      setGeneratedPasswords(generatedData);

      // Obtener las últimas 10 contraseñas guardadas por el usuario actual
      const savedQuery = query(
        collection(db, 'savedPasswords'),
        where('userId', '==', userId),
        limit(10)
      );
      const savedSnapshot = await getDocs(savedQuery);
      const savedData = savedSnapshot.docs.map(doc => ({
        id: doc.id,
        password: doc.data().password,
      }));
      setSavedPasswords(savedData);
    } catch (error) {
      console.error('Error al obtener las contraseñas desde Firestore:', error);
    }
  };

  const handleDeletePassword = async (passwordId: string, collectionName: string) => {
    try {
      await deleteDoc(doc(db, collectionName, passwordId));
      if (collectionName === 'savedPasswords') {
        setSavedPasswords(savedPasswords.filter(p => p.id !== passwordId));
      } else if (collectionName === 'generatedPasswords') {
        setGeneratedPasswords(generatedPasswords.filter(p => p.id !== passwordId));
      }
    } catch (error) {
      console.error('Error al eliminar la contraseña:', error);
    }
  };

  const handleCopyPassword = async (password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccessId(id);
      setTimeout(() => {
        setCopySuccessId(null);
      }, 2000);
    } catch (error) {
      console.error('Error al copiar la contraseña:', error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center bg-gray-200 pt-20 pb-8 sm:pb-0 sm:pt-16'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:max-w-2xl h-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Historial de Contraseñas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='text-center'>
            <h2 className="text-lg font-semibold mb-2">Contraseñas Generadas</h2>

            {generatedPasswords.length > 0 ? (
              <ul className="list-disc list-inside">
                {generatedPasswords.map(({ id, password }) => (
                  <li key={id} className="mb-1 flex justify-between items-center">
                    <span>{password}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay contraseñas generadas.</p>
            )}
          </div>

          <div className='text-center'>
            <h2 className="text-lg font-semibold mb-2">Contraseñas Guardadas</h2>

            {savedPasswords.length > 0 ? (
              <ul className="list-disc list-inside">
                {savedPasswords.map(({ id, password }) => (
                  <li key={id} className="mb-1 flex justify-between items-center">
                    <span>{password}</span>
                    <div className='flex justify-end space-x-2 text-lg'>
                      <button onClick={() => handleCopyPassword(password, id)}>
                        {copySuccessId === id ? (
                          <FaClipboardCheck className="text-green-500" />
                        ) : (
                          <FaClipboard className="text-gray-500 hover:text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeletePassword(id, 'savedPasswords')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay contraseñas guardadas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordHistory;