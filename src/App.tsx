import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import ImageUpload from './components/ImageUpload';
import AnalysisResult from './components/AnalysisResult';
import { AnalysisResult as AnalysisResultType } from './types/analysis';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  setTimeout(() => {
    setShowSplash(false);
  }, 2500);

  const handleAnalysisComplete = (result: AnalysisResultType) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-teal-500 to-teal-700 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white text-center">SeaweedSense</h1>
          <p className="text-teal-100 text-center mt-2">Analyze your seaweed for optimal harvest time</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Seaweed Image</h2>
                <ImageUpload 
                  onAnalysisComplete={handleAnalysisComplete} 
                  onAnalysisStart={handleAnalysisStart} 
                />
              </div>
            </div>

            <div className="space-y-6">
              {(analysisResult || isAnalyzing) && (
                <AnalysisResult 
                  result={analysisResult} 
                  isLoading={isAnalyzing} 
                />
              )}

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Seaweed Harvesting Guide</h2>
                <p className="text-gray-700">
                  Upload a clear image of your seaweed to determine if it's ready for harvest. 
                  Our analysis will tell you if it's the optimal time to harvest or how long 
                  you should wait.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} SeaweedSense - The smart way to determine seaweed harvest readiness</p>
        </div>
      </footer>
    </div>
  );
}

export default App;