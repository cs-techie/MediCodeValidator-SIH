import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';

const Validation = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    // Simulate validation process
    setTimeout(() => {
      setValidationResults({
        totalRecords: 150,
        validRecords: 142,
        warningRecords: 6,
        errorRecords: 2,
        icdCompliance: 94.7,
        namasteCompliance: 89.3,
        overallScore: 92.0
      });
    }, 2000);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const validationItems = [
    {
      type: 'success',
      title: 'ICD-11 Format Validation',
      description: 'All codes follow WHO ICD-11 standards',
      status: 'Passed',
      icon: CheckCircle
    },
    {
      type: 'success',
      title: 'NAMASTE Code Structure',
      description: 'Traditional medicine codes properly formatted',
      status: 'Passed',
      icon: CheckCircle
    },
    {
      type: 'warning',
      title: 'Cross-Reference Accuracy',
      description: '6 records need manual verification',
      status: 'Warning',
      icon: AlertTriangle
    },
    {
      type: 'error',
      title: 'Data Completeness',
      description: '2 records missing required fields',
      status: 'Failed',
      icon: XCircle
    }
  ];

  const getStatusColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Record Validation</h1>
          <p className="text-gray-600">Upload patient records for dual validation against ICD-11 and NAMASTE standards</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Patient Records</h3>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your files here, or <label htmlFor="file-upload" className="text-blue-600 cursor-pointer hover:text-blue-700">browse</label>
                </h4>
                <p className="text-gray-600 mb-4">Support for CSV, Excel, and JSON formats</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={handleFileSelect}
                />
              </div>

              {uploadedFile && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">{uploadedFile.name}</p>
                    <p className="text-xs text-blue-600">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                  {validationResults ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  )}
                </div>
              )}
            </div>

            {/* Validation Results */}
            {validationResults && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Validation Results</h3>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{validationResults.validRecords}</div>
                    <div className="text-sm text-green-600">Valid Records</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{validationResults.warningRecords}</div>
                    <div className="text-sm text-yellow-600">Warnings</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{validationResults.errorRecords}</div>
                    <div className="text-sm text-red-600">Errors</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{validationResults.overallScore}%</div>
                    <div className="text-sm text-blue-600">Overall Score</div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4">
                  {validationItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <div className={`p-2 rounded-full ${getStatusColor(item.type)} mr-4`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.type)}`}>
                          {item.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Compliance Metrics */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Metrics</h3>
              
              {validationResults ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">ICD-11 Compliance</span>
                      <span className="text-sm text-gray-600">{validationResults.icdCompliance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${validationResults.icdCompliance}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">NAMASTE Compliance</span>
                      <span className="text-sm text-gray-600">{validationResults.namasteCompliance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${validationResults.namasteCompliance}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Score</span>
                      <span className="text-sm text-gray-600">{validationResults.overallScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${validationResults.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Upload a file to see compliance metrics</p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Ensure all ICD-11 codes follow WHO format standards</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">NAMASTE codes must include proper system prefixes</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Patient records require complete demographic data</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Cross-references must be bidirectional and accurate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
