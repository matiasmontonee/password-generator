import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;