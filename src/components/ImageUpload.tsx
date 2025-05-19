import React, { useState, useRef } from 'react';
import { Camera, Upload, RefreshCw } from 'lucide-react';
import { analyzeImage } from '../utils/imageAnalysis';
import { AnalysisResult } from '../types/analysis';

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onAnalysisStart: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalysisComplete, onAnalysisStart }) => {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (file: File) => {
    try {
      // Reset states
      setError(null);
      setIsLoading(true);
      onAnalysisStart();
      
      // Create URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      // Analyze the image
      const result = await analyzeImage(imageUrl);
      onAnalysisComplete(result);
    } catch (err) {
      setError('Failed to analyze image. Please try another image.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleReset = () => {
    setImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out ${
          dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-gray-50'
        } ${image ? 'border-opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        {image ? (
          <div className="space-y-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <img
                src={image}
                alt="Uploaded seaweed"
                className="w-full h-full object-cover"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className="mr-2" />
                New Image
              </button>
              
              <button
                onClick={handleClickUpload}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors disabled:opacity-50"
              >
                <Upload size={18} className="mr-2" />
                Replace
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <Camera size={28} className="text-teal-600" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Drag & drop an image of seaweed here, or click to select
              </p>
              
              <button
                onClick={handleClickUpload}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
              >
                Select Image
              </button>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;