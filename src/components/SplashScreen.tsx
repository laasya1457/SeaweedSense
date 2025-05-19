import React from 'react';
import { Sprout } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-teal-500">
      <div className="text-center space-y-4">
        <div className="animate-bounce">
          <Sprout size={64} className="text-white mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-white">SeaweedSense</h1>
        <p className="text-teal-100">Analyzing seaweed for optimal harvest time</p>
      </div>
    </div>
  );
};

export default SplashScreen;