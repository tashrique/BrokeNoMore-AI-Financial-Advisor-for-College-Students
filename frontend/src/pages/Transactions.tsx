import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

const Transactions = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    // Commented out real API call
    /*try {
      const response = await fetch('/api/v1/transactions/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Successfully uploaded! 🎉');
        setFile(null);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      alert('Failed to upload file 😢');
    }*/

    // Sample upload simulation
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Successfully uploaded! 🎉 (Demo)');
    setFile(null);
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upload Transactions 📊</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-purple-100 rounded-full">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drop your bank statement here 🏦
              </p>
              <p className="text-gray-500 mt-1">
                or click to select a file from your computer
              </p>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              accept=".csv,.pdf"
            />
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
            >
              Select File
            </label>
          </div>
        </div>

        {file && (
          <div className="mt-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FileText className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading... 🚀' : 'Upload 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Upload Tips 💡</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Supported formats: CSV, PDF</li>
          <li>• Make sure your statement includes transaction dates and amounts</li>
          <li>• Remove any sensitive information before uploading</li>
          <li>• Larger files may take longer to process</li>
        </ul>
      </div>
    </div>
  );
};

export default Transactions;