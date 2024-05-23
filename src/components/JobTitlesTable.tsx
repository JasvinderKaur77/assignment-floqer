// src/components/JobTitlesTable.tsx
import React from 'react';
import { Table } from 'antd';
import { salaryData } from '../assets/salaries.ts';

interface JobTitleRecord {
  job_title: string;
  job_count: number;
}

interface JobTitlesTableProps {
  selectedYear: number;
}

const JobTitlesTable: React.FC<JobTitlesTableProps> = ({ selectedYear }) => {
  const filteredData = salaryData.filter(record => record.work_year === selectedYear);
  const aggregatedData = filteredData.reduce((acc: any, curr) => {
    const jobTitle = curr.job_title;
    if (!acc[jobTitle]) {
      acc[jobTitle] = { job_title: jobTitle, job_count: 0 };
    }
    acc[jobTitle].job_count += 1;
    return acc;
  }, {});

  const tableData: JobTitleRecord[] = Object.keys(aggregatedData).map(jobTitle => {
    return aggregatedData[jobTitle];
  });

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'job_count',
      key: 'job_count',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey="job_title"
      pagination={false}
    />
  );
};

export default JobTitlesTable;
