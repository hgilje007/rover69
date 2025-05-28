import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { Zap } from 'lucide-react'; // Added Zap icon

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-800 text-slate-100 p-6 flex flex-col">
      <div className="flex items-center justify-center mb-10 px-2 pt-2">
        {/* Placeholder logo: Zap icon and text */}
        <div className="flex items-center text-sky-400">
          <Zap className="h-10 w-10 mr-2" strokeWidth={1.5} />
          <span className="text-3xl font-bold text-slate-100">FastField+</span>
        </div>
      </div>
      <nav className="flex-grow">
        <ul>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.path} className="mb-3">
              <NavLink
                to={item.path}
                end={item.path === '/'} // `end` prop for exact match on root path
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-2xl text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 ease-in-out ${
                    isActive ? 'bg-sky-600 text-white shadow-lg' : ''
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-4" />
                <span className="text-lg">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <p className="text-xs text-slate-500 text-center">© 2024 Your Company</p>
      </div>
    </aside>
  );
};

export default Sidebar;