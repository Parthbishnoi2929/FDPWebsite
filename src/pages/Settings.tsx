
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-100 rounded-full">
            <SettingsIcon size={48} className="text-blue-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Coming Soon</h1>
          <p className="text-lg text-gray-600 max-w-md">
            Settings page is under development. We're working hard to bring you amazing features!
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Development in progress</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;


