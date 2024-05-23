// src/components/SalaryLineChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { salaryData } from '../assets/salaries.ts';

interface SalaryRecord {
  work_year: number;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: number;
  salary_currency: string;
  salary_in_usd: number;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

const SalaryLineChart: React.FC = () => {
  // Transform data to aggregate total jobs per year
  const aggregatedData = salaryData.reduce((acc: any, curr: SalaryRecord) => {
    const year = curr.work_year;
    if (!acc[year]) {
      acc[year] = { year, totalJobs: 0 };
    }
    acc[year].totalJobs += 1;
    return acc;
  }, {});

  // Transform the aggregated data into an array for the chart
  const chartData = Object.keys(aggregatedData).map(year => {
    return {
      year: parseInt(year),
      totalJobs: aggregatedData[year].totalJobs,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalaryLineChart;
