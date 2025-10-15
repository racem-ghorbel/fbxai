
import React, { useCallback } from 'react';
import { ConversionStatus } from '../types';
import Card from './Card';
import { UploadIcon } from './icons/Icons';

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  status: ConversionStatus;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, status }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (status !== ConversionStatus.Processing && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setImages(Array.from(event.dataTransfer.files));
    }
  }, [status, setImages]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const isDisabled = status === ConversionStatus.Processing;

  return (
    <Card title="1. رفع الصور">
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDisabled ? 'cursor-not-allowed bg-gray-100 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isDisabled}
        />
        <label htmlFor="file-upload" className={`flex flex-col items-center justify-center gap-4 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <UploadIcon className="w-12 h-12 text-gray-400"/>
            <p className="text-gray-600 dark:text-gray-300">
            اسحب وأفلت الصور هنا، أو <span className="font-semibold text-blue-600">تصفح الملفات</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            (PNG, JPG, WEBP, etc.)
            </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">الصور المحددة:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-sm">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate text-center">
                    {file.name}
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ImageUploader;
