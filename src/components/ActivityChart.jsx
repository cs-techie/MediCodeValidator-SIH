import React from 'react';
import ReactECharts from 'echarts-for-react';

const ActivityChart = () => {
  const option = {
    title: {
      text: 'Code Mapping & Validation Activity',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['ICD-11 Mappings', 'NAMASTE Mappings', 'Validations'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'ICD-11 Mappings',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: 'NAMASTE Mappings',
        type: 'line',
        smooth: true,
        data: [720, 832, 801, 834, 1090, 1130, 1120],
        itemStyle: {
          color: '#8b5cf6'
        }
      },
      {
        name: 'Validations',
        type: 'bar',
        data: [1520, 1732, 1601, 1734, 2190, 2230, 2220],
        itemStyle: {
          color: '#10b981'
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default ActivityChart;
