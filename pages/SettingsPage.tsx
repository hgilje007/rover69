
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Save, Bell, UserCog, Palette, KeyRound } from 'lucide-react';

const SettingsPage: React.FC = () => {
  // Mock settings state
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [userProfile, setUserProfile] = React.useState({ name: 'Admin User', email: 'admin@example.com' });
  const [themeColor, setThemeColor] = React.useState('blue');

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card title="User Profile" className="shadow-xl">
        <div className="space-y-4">
            <UserCog className="h-12 w-12 text-sky-500 mb-4" />
            <Input id="profileName" label="Full Name" defaultValue={userProfile.name} />
            <Input id="profileEmail" label="Email Address" type="email" defaultValue={userProfile.email} />
            <Button variant="primary" leftIcon={<Save className="h-4 w-4"/>}>Save Profile</Button>
        </div>
      </Card>

      <Card title="Notifications" className="shadow-xl">
        <div className="space-y-4">
          <Bell className="h-12 w-12 text-yellow-500 mb-4" />
          <div className="flex items-center justify-between">
            <label htmlFor="notificationsToggle" className="text-slate-700 font-medium">
              Enable Email Notifications
            </label>
            <button
              id="notificationsToggle"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                notificationsEnabled ? 'bg-sky-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Receive email updates for new submissions and status changes.
          </p>
        </div>
      </Card>
      
      <Card title="API Keys & Integrations" className="shadow-xl">
        <KeyRound className="h-12 w-12 text-purple-500 mb-4" />
        <div className="space-y-4">
            <Input 
                id="geminiApiKey" 
                label="Gemini API Key (Loaded from environment)" 
                type="password" 
                value={process.env.API_KEY ? '**********' : 'Not Set'} 
                disabled 
                readOnly
            />
            <p className="text-xs text-slate-500">Gemini API Key is configured via environment variable <code>process.env.API_KEY</code>.</p>
            <Button variant="outline">Manage Visma.NET Connection (Placeholder)</Button>
        </div>
      </Card>

      <Card title="Appearance (Placeholder)" className="shadow-xl">
        <Palette className="h-12 w-12 text-pink-500 mb-4" />
        <p className="text-slate-600">Theme customization options will be available here.</p>
        {/* Example: Theme color selector */}
      </Card>
    </div>
  );
};

export default SettingsPage;
