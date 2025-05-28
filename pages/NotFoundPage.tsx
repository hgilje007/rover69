
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <AlertTriangle className="h-24 w-24 text-yellow-400 mb-8" />
      <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
      <p className="text-2xl text-slate-600 mb-8">Oops! Page Not Found.</p>
      <p className="text-slate-500 mb-10 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Button 
        variant="primary" 
        size="lg" 
        onClick={() => { /* Handled by Link */ }}
        leftIcon={<Home className="h-5 w-5"/>}
      >
        <Link to="/">Go to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
