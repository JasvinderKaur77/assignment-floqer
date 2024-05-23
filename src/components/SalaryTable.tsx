// src/components/SalaryTable.tsx
import React, { useState } from 'react';
import { Table, Collapse } from 'antd';
import { salaryData } from '../assets/salaries.ts';
import JobTitlesTable from './JobTitlesTable';

const { Panel } = Collapse;

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

interface AggregatedData {
  year: number;
  totalJobs: number;
  averageSalary: number;
}

const SalaryTable: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const aggregatedData = salaryData.reduce((acc: any, curr: SalaryRecord) => {
    const year = curr.work_year;
    if (!acc[year]) {
      acc[year] = { year, totalJobs: 0, totalSalary: 0 };
    }
    acc[year].totalJobs += 1;
    acc[year].totalSalary += curr.salary_in_usd;
    return acc;
  }, {});

  const tableData: AggregatedData[] = Object.keys(aggregatedData).map(year => {
    return {
      year: parseInt(year),
      totalJobs: aggregatedData[year].totalJobs,
      averageSalary: aggregatedData[year].totalSalary / aggregatedData[year].totalJobs,
    };
  });

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: AggregatedData, b: AggregatedData) => a.year - b.year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a: AggregatedData, b: AggregatedData) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'averageSalary',
      key: 'averageSalary',
      sorter: (a: AggregatedData, b: AggregatedData) => a.averageSalary - b.averageSalary,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="year"
        onRow={(record) => {
          return {
            onClick: () => {
              setExpandedYear(expandedYear === record.year ? null : record.year);
            },
          };
        }}
      />
      <Collapse activeKey={expandedYear ? [expandedYear] : []}>
        {tableData.map((data) => (
          <Panel header={`Details for ${data.year}`} key={data.year}>
            <JobTitlesTable selectedYear={data.year} />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default SalaryTable;
