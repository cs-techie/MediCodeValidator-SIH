import React from 'react';
import { motion } from 'framer-motion';
import { Users, Database, CheckCircle, AlertTriangle, TrendingUp, Globe } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityChart from '../components/ActivityChart';
import RecentActivity from '../components/RecentActivity';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Codes Mapped',
      value: '45,892',
      change: '+12.5%',
      icon: Database,
      color: 'blue'
    },
    {
      title: 'Validation Success Rate',
      value: '94.8%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Active Healthcare Providers',
      value: '1,247',
      change: '+8.3%',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Records Processed Today',
      value: '3,456',
      change: '+15.2%',
      icon: TrendingUp,
      color: 'orange'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Coding Dashboard</h1>
          <p className="text-gray-600">Bridging modern and traditional medicine through unified coding standards</p>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 mb-8 text-white"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Universal Healthcare Coding Platform</h2>
              <p className="text-blue-100 mb-4">Seamlessly integrate ICD-11 and NAMASTE codes for comprehensive patient records</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  <span>WHO ICD-11 Certified</span>
                </div>
                <div className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  <span>AYUSH NAMASTE Integration</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="text-3xl font-bold">99.2%</div>
                <div className="text-sm text-blue-100">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <ActivityChart />
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <RecentActivity />
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-600 font-medium">WHO ICD-11 API</p>
                <p className="text-xs text-green-500">Connected</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-600 font-medium">AYUSH Database</p>
                <p className="text-xs text-green-500">Synchronized</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Validation Engine</p>
                <p className="text-xs text-yellow-500">High Load</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-600 font-medium">Integration APIs</p>
                <p className="text-xs text-green-500">Operational</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
