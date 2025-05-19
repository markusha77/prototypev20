import React, { useRef, useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File, isMain?: boolean) => void;
  onMultipleFilesSelect?: (files: File[]) => void;
  currentImageUrl?: string;
  additionalImages?: string[];
  onClearImage?: (imageUrl?: string) => void;
  onSetMainImage?: (imageUrl: string) => void;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onMultipleFilesSelect,
  currentImageUrl,
  additionalImages = [],
  onClearImage,
  onSetMainImage,
  multiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple && files.length > 1 && onMultipleFilesSelect) {
      // Convert FileList to array
      const fileArray = Array.from(files);
      onMultipleFilesSelect(fileArray);
    } else {
      // Handle single file
      onFileSelect(files[0], true);
    }

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (multiple && files.length > 1 && onMultipleFilesSelect) {
      // Convert FileList to array
      const fileArray = Array.from(files);
      onMultipleFilesSelect(fileArray);
    } else {
      // Handle single file
      onFileSelect(files[0], true);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <label className="block text-sm font-medium text-gray-700">
        Project Images
      </label>

      {!currentImageUrl ? (
        // Upload area when no main image exists - ENLARGED
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            multiple={multiple}
          />

          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="p-4 bg-indigo-100 rounded-full">
              <Upload size={32} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">
                {multiple ? 'Drag and drop images or' : 'Drag and drop an image or'}
              </p>
              <button
                type="button"
                onClick={handleButtonClick}
                className="text-indigo-600 font-medium hover:text-indigo-700 focus:outline-none"
              >
                browse
              </button>
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      ) : (
        // Display main image with additional images - ENLARGED
        <div className="space-y-6">
          {/* Main image section - ENLARGED */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden border-2 border-indigo-500">
              {/* Fixed height for main image container */}
              <div className="h-[300px]">
                <img
                  src={currentImageUrl}
                  alt="Main project"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute top-3 left-3 bg-indigo-500 text-white px-3 py-1.5 rounded-md font-medium">
                Main
              </div>
            </div>
            {onClearImage && (
              <button
                type="button"
                onClick={() => onClearImage()}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                aria-label="Remove image"
              >
                <X size={20} className="text-red-500" />
              </button>
            )}
          </div>

          {/* Add more images button - ENLARGED */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
            onClick={handleButtonClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple={multiple}
            />
            <div className="flex items-center space-x-3 text-gray-600 py-4">
              <Plus size={24} className="text-indigo-500" />
              <span className="text-base font-medium">Add more images</span>
            </div>
          </div>

          {/* Additional images grid - ENLARGED */}
          {additionalImages.length > 0 && (
            <div className="mt-6">
              <h4 className="text-base font-medium text-gray-700 mb-3">
                Additional Images
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {additionalImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      {/* Fixed height for additional images */}
                      <div className="h-[180px]">
                        <img
                          src={imageUrl}
                          alt={`Project ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {onSetMainImage && (
                        <button
                          type="button"
                          onClick={() => onSetMainImage(imageUrl)}
                          className="px-2 py-1 bg-white rounded-md shadow-md hover:bg-indigo-50 transition-colors text-xs font-medium text-indigo-600"
                          aria-label="Set as main image"
                        >
                          Main
                        </button>
                      )}
                      {onClearImage && (
                        <button
                          type="button"
                          onClick={() => onClearImage(imageUrl)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                          aria-label="Remove image"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
