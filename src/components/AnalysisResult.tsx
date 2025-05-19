import React from 'react';
import { AnalysisResult } from '../types/analysis';

interface AnalysisResultProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const AnalysisResultComponent: React.FC<AnalysisResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Analyzing seaweed image...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { isReady, waitTime } = result;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg">
      <div className="space-y-4">
        <div 
          className={`w-full h-2 rounded-full ${
            isReady ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
        
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-r-4 border-t-2 border-b-2 border-gray-200">
          <h3 className={`text-xl font-bold ${isReady ? 'text-green-600' : 'text-red-600'}`}>
            {isReady ? 'Ready to harvest!' : 'Not ready to harvest'}
          </h3>
          
          {!isReady && waitTime && (
            <p className="mt-2 text-gray-700">
              Please wait approximately <span className="font-semibold">{waitTime}</span> before harvesting.
            </p>
          )}
          
          {isReady && (
            <p className="mt-2 text-gray-700">
              Your seaweed is at the optimal stage for harvesting.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultComponent;