import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'success',
      title: 'ICD-11 Code Mapped',
      description: 'J44.1 mapped to NAMASTE-RESP-001',
      time: '2 minutes ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Validation Warning',
      description: 'Potential mismatch detected in record #12345',
      time: '5 minutes ago',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'success',
      title: 'Record Validated',
      description: 'Patient record successfully validated',
      time: '8 minutes ago',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'error',
      title: 'Mapping Failed',
      description: 'Unable to map Z51.11 - manual review required',
      time: '12 minutes ago',
      icon: XCircle
    },
    {
      id: 5,
      type: 'success',
      title: 'API Integration',
      description: 'Hospital XYZ connected successfully',
      time: '15 minutes ago',
      icon: CheckCircle
    }
  ];

  const getColorClasses = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${getColorClasses(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;
