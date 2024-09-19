import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut, updateProfile, onAuthStateChanged } from '../firebase';

const ProfilePage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || '');
        setNewName(user.displayName || '');
        setEmail(user.email || '');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleSaveName = async () => {
    try {
      const user = auth.currentUser;
      if (user && newName) {
        await updateProfile(user, { displayName: newName });
        setDisplayName(newName);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error al actualizar el nombre:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Perfil</h1>
      
        <div>        
          <div>
            <label className="block text-sm font-medium text-gray-700 label-dark-mode">Nombre</label>
            {editMode ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm edit-dark-mode focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                type="text"
                value={displayName}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700 label-dark-mode">Correo Electrónico</label>
            <input
              type="text"
              value={email}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {editMode ? (
            <button
              onClick={handleSaveName}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-full mb-4 confirm-button-dark-mode"
            >
              Guardar Nombre
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors w-full mb-4 primary-button-dark-mode"
            >
              Editar Nombre
            </button>
          )}

          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors w-full close-button-dark-mode"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;