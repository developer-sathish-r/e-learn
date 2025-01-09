import React from 'react';
import { FiBarChart2, FiGrid, FiUsers } from 'react-icons/fi';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dataPie = [
  { name: '18-24', value: 2400 },
  { name: '25-34', value: 4567 },
  { name: '35-44', value: 1398 },
  { name: '45-54', value: 9800 },
  { name: '55-64', value: 3908 },
  { name: '65+', value: 4800 },
];

const dataBar = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#99154E', '#605ca8'];

function Overview() {
  return (
    <div className=''>
      <h1 className="text-xl font-bold mb-4">Sales Overview</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <InfoCard title='Total Sales' value='$102,430' icon={<FiBarChart2 />} />
        <InfoCard title='Number of Orders' value='4,390' icon={<FiGrid />} />
        <InfoCard title='New Customers' value='1,021' icon={<FiUsers />} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='card shadow-xl p-5'>
          <h2 className='text-xl font-bold mb-5'>Customer Demographics</h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie dataKey='value' data={dataPie} cx='50%' cy='50%' outerRadius={100} fill='#8884d8' label={(entry) => entry.name}>
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='card shadow-xl p-5'>
          <h2 className='text-xl font-bold mb-5'>Sales Over Time</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={dataBar} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pv' fill='#8884d8' name='Sales' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className='card shadow-lg p-6 flex flex-col justify-between items-center text-center'>
      <div className='text-3xl mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-2xl'>{value}</p>
    </div>
  );
}

export default Overview;