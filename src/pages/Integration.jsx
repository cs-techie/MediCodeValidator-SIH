import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Key, Database, Cloud, CheckCircle, Copy, ExternalLink } from 'lucide-react';

const Integration = () => {
  const [selectedTab, setSelectedTab] = useState('api');
  const [copiedCode, setCopiedCode] = useState('');

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/codes/search',
      description: 'Search for ICD-11 and NAMASTE codes',
      parameters: ['query', 'system', 'category']
    },
    {
      method: 'POST',
      endpoint: '/api/v1/validation/records',
      description: 'Validate patient records against both systems',
      parameters: ['records', 'validation_type', 'format']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/mappings/{code}',
      description: 'Get cross-reference mappings for a specific code',
      parameters: ['code', 'direction', 'confidence_threshold']
    },
    {
      method: 'POST',
      endpoint: '/api/v1/batch/validate',
      description: 'Batch validation for large datasets',
      parameters: ['file_url', 'callback_url', 'options']
    }
  ];

  const codeExamples = {
    javascript: `// Initialize MediCode Bridge SDK
import { MediCodeBridge } from '@medicode/bridge-sdk';

const client = new MediCodeBridge({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'sandbox'
});

// Search for codes
const searchResults = await client.codes.search({
  query: 'diabetes',
  system: 'both', // 'icd11', 'namaste', or 'both'
  limit: 10
});

// Validate patient records
const validationResult = await client.validation.validateRecords({
  records: [
    {
      patientId: 'P001',
      icdCode: 'E11.9',
      namasteCode: 'NAM-END-042',
      // ... other fields
    }
  ],
  options: {
    strictMode: true,
    generateReport: true
  }
});

console.log('Validation Status:', validationResult.status);
console.log('Compliance Score:', validationResult.complianceScore);`,

    python: `# Install: pip install medicode-bridge
from medicode_bridge import MediCodeBridge

# Initialize client
client = MediCodeBridge(
    api_key='YOUR_API_KEY',
    environment='production'
)

# Search for codes
search_results = client.codes.search(
    query='diabetes',
    system='both',
    limit=10
)

# Validate records
validation_result = client.validation.validate_records(
    records=[
        {
            'patient_id': 'P001',
            'icd_code': 'E11.9',
            'namaste_code': 'NAM-END-042',
            # ... other fields
        }
    ],
    options={
        'strict_mode': True,
        'generate_report': True
    }
)

print(f"Validation Status: {validation_result['status']}")
print(f"Compliance Score: {validation_result['compliance_score']}")`,

    curl: `# Search for codes
curl -X GET "https://api.medicode.dev/v1/codes/search" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "diabetes",
    "system": "both",
    "limit": 10
  }'

# Validate patient records
curl -X POST "https://api.medicode.dev/v1/validation/records" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "records": [
      {
        "patient_id": "P001",
        "icd_code": "E11.9",
        "namaste_code": "NAM-END-042"
      }
    ],
    "options": {
      "strict_mode": true,
      "generate_report": true
    }
  }'`
  };

  const handleCopyCode = (code, type) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const integrationSteps = [
    {
      step: 1,
      title: 'Get API Key',
      description: 'Register your organization and obtain authentication credentials',
      icon: Key
    },
    {
      step: 2,
      title: 'Install SDK',
      description: 'Install our SDK for your preferred programming language',
      icon: Code
    },
    {
      step: 3,
      title: 'Configure Integration',
      description: 'Set up validation rules and mapping preferences',
      icon: Database
    },
    {
      step: 4,
      title: 'Deploy & Monitor',
      description: 'Deploy to production and monitor validation metrics',
      icon: Cloud
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Integration</h1>
          <p className="text-gray-600">Integrate MediCode Bridge into your healthcare systems with our comprehensive APIs</p>
        </motion.div>

        {/* Integration Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Integration Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {integrationSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'api', label: 'API Reference', icon: Code },
                { id: 'examples', label: 'Code Examples', icon: ExternalLink },
                { id: 'webhooks', label: 'Webhooks', icon: Database }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'api' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints</h3>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            endpoint.method === 'GET' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="ml-3 text-sm font-mono text-gray-900">
                            {endpoint.endpoint}
                          </code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.parameters.map((param) => (
                          <span key={param} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'examples' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
                <div className="space-y-6">
                  {Object.entries(codeExamples).map(([language, code]) => (
                    <div key={language} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{language}</span>
                        <button
                          onClick={() => handleCopyCode(code, language)}
                          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                        >
                          {copiedCode === language ? (
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 mr-1" />
                          )}
                          {copiedCode === language ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'webhooks' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Events</h3>
                <div className="space-y-4">
                  {[
                    { event: 'validation.completed', description: 'Triggered when a validation job is completed' },
                    { event: 'mapping.updated', description: 'Triggered when new code mappings are added' },
                    { event: 'error.detected', description: 'Triggered when validation errors are detected' },
                    { event: 'batch.processed', description: 'Triggered when batch processing is complete' }
                  ].map((webhook, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <code className="text-sm font-mono text-blue-600">{webhook.event}</code>
                          <p className="text-sm text-gray-600 mt-1">{webhook.description}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-blue-100">Contact our integration team for personalized onboarding and support</p>
            </div>
            <div className="mt-4 lg:mt-0 flex gap-3">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Get API Key
              </button>
              <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Integration;
