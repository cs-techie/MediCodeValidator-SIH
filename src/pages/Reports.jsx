import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Calendar, Download, Filter, TrendingUp, PieChart } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('mappings');

  const mappingTrendsOption = {
    title: {
      text: 'Code Mapping Trends',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' }
    },
    tooltip: { trigger: 'axis' },
    legend: { data: ['ICD-11', 'NAMASTE', 'Cross-mapped'], bottom: 10 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'ICD-11',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330],
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'NAMASTE',
        type: 'line',
        smooth: true,
        data: [720, 832, 801, 834, 1090, 1130],
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Cross-mapped',
        type: 'line',
        smooth: true,
        data: [650, 750, 720, 780, 980, 1020],
        itemStyle: { color: '#10b981' }
      }
    ]
  };

  const categoryDistributionOption = {
    title: {
      text: 'Code Distribution by Category',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' }
    },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: 'Categories',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Respiratory' },
          { value: 735, name: 'Cardiovascular' },
          { value: 580, name: 'Digestive' },
          { value: 484, name: 'Neurological' },
          { value: 300, name: 'Musculoskeletal' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const validationAccuracyOption = {
    title: {
      text: 'Validation Accuracy Over Time',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' }
    },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: { type: 'value', min: 80, max: 100 },
    series: [
      {
        name: 'Accuracy %',
        type: 'bar',
        data: [88.5, 91.2, 93.8, 89.7, 94.1, 96.3],
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };

  const summaryStats = [
    { title: 'Total Mappings', value: '45,892', change: '+12.5%', color: 'blue' },
    { title: 'Validation Rate', value: '94.8%', change: '+2.1%', color: 'green' },
    { title: 'Error Rate', value: '2.3%', change: '-0.8%', color: 'red' },
    { title: 'Processing Speed', value: '1,247/hr', change: '+8.3%', color: 'purple' }
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive insights into coding validation and mapping performance</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {summaryStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <TrendingUp className={`w-4 h-4 text-${stat.color}-500`} />
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mapping Trends */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <ReactECharts option={mappingTrendsOption} style={{ height: '400px' }} />
          </motion.div>

          {/* Category Distribution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <ReactECharts option={categoryDistributionOption} style={{ height: '400px' }} />
          </motion.div>
        </div>

        {/* Validation Accuracy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <ReactECharts option={validationAccuracyOption} style={{ height: '400px' }} />
        </motion.div>

        {/* Detailed Reports Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Validation Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Records</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Hospital ABC - Weekly Report', type: 'Validation', date: '2025-01-15', records: '2,456', status: 'Completed' },
                  { name: 'ICD-NAMASTE Mapping Analysis', type: 'Mapping', date: '2025-01-14', records: '1,823', status: 'Completed' },
                  { name: 'Compliance Audit Report', type: 'Compliance', date: '2025-01-13', records: '3,692', status: 'In Progress' },
                  { name: 'Error Analysis Summary', type: 'Error Analysis', date: '2025-01-12', records: '892', status: 'Completed' }
                ].map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.records}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
