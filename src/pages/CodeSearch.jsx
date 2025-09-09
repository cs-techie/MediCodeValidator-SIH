import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRightLeft, BookOpen, Stethoscope } from 'lucide-react';
import { faker } from '@faker-js/faker';

const CodeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [searchResults, setSearchResults] = useState([]);

  // Generate mock data for demonstration
  const generateMockResults = () => {
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push({
        id: i + 1,
        icdCode: `${faker.string.alpha({ length: 1, casing: 'upper' })}${faker.number.int({ min: 10, max: 99 })}.${faker.number.int({ min: 0, max: 9 })}`,
        icdDescription: faker.lorem.sentence(),
        namasteCode: `NAM-${faker.string.alpha({ length: 3, casing: 'upper' })}-${faker.number.int({ min: 100, max: 999 })}`,
        namasteDescription: faker.lorem.sentence(),
        mappingAccuracy: faker.number.int({ min: 85, max: 99 }),
        category: faker.helpers.arrayElement(['Respiratory', 'Cardiovascular', 'Digestive', 'Neurological', 'Musculoskeletal'])
      });
    }
    setSearchResults(results);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      generateMockResults();
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Search & Mapping</h1>
          <p className="text-gray-600">Search and explore mappings between ICD-11 and NAMASTE coding systems</p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by code, description, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Systems</option>
                <option value="icd11">ICD-11 Only</option>
                <option value="namaste">NAMASTE Only</option>
              </select>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Access Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8" />
              <span className="text-blue-100 text-sm">WHO Standard</span>
            </div>
            <h3 className="text-xl font-bold mb-2">ICD-11 Codes</h3>
            <p className="text-blue-100 mb-4">International Classification of Diseases</p>
            <div className="text-2xl font-bold">45,892</div>
            <p className="text-blue-100 text-sm">Total codes available</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Stethoscope className="w-8 h-8" />
              <span className="text-purple-100 text-sm">AYUSH Standard</span>
            </div>
            <h3 className="text-xl font-bold mb-2">NAMASTE Codes</h3>
            <p className="text-purple-100 mb-4">Traditional Medicine Classification</p>
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-purple-100 text-sm">Total codes available</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <ArrowRightLeft className="w-8 h-8" />
              <span className="text-green-100 text-sm">Cross-Reference</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Mapped Codes</h3>
            <p className="text-green-100 mb-4">Successfully cross-referenced</p>
            <div className="text-2xl font-bold">18,734</div>
            <p className="text-green-100 text-sm">Active mappings</p>
          </div>
        </motion.div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
              <p className="text-sm text-gray-600">Found {searchResults.length} matching codes</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ICD-11 Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAMASTE Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{result.icdCode}</div>
                          <div className="text-sm text-gray-600">{result.icdDescription}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{result.namasteCode}</div>
                          <div className="text-sm text-gray-600">{result.namasteDescription}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {result.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${result.mappingAccuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{result.mappingAccuracy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && searchTerm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-12 text-center shadow-sm"
          >
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeSearch;
