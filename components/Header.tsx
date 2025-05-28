
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { Bell, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const currentNavItem = NAVIGATION_ITEMS.find(item => 
    location.pathname === '/' ? item.path === '/' : location.pathname.startsWith(item.path) && item.path !== '/'
  ) || NAVIGATION_ITEMS.find(item => location.pathname.includes(item.path.split('/')[1]) && item.path !== '/'); // Fallback for detail pages

  const pageTitle = currentNavItem ? currentNavItem.label : "Page";
  if (location.pathname.includes('/submissions/') && location.pathname !== '/submissions') {
     // pageTitle = "Submission Details"; // More specific title for detail page.
  }


  return (
    <header className="bg-white shadow-md p-4 md:p-6 flex justify-between items-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">{pageTitle}</h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-slate-200 transition-colors">
          <Bell className="h-6 w-6 text-slate-600" />
        </button>
        <UserCircle className="h-10 w-10 text-slate-500" />
      </div>
    </header>
  );
};

export default Header;
