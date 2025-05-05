import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCharts from '../components/DashboardCharts';
import api from '../utils/api';

const DashboardPage = () => {
  const [summary, setSummary] = useState({
    totalEmissions: 0,
    totalSinks: 0,
    netEmissions: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const emissionsRes = await api.get('/emission');
        const sinksRes = await api.get('/carbonSink');

        const totalEmissions = emissionsRes.data?.reduce((sum, e) => sum + e.emissionValue, 0) || 0;
        const totalSinks = sinksRes.data?.reduce((sum, s) => sum + s.amount, 0) || 0;

        setSummary({
          totalEmissions,
          totalSinks,
          netEmissions: totalEmissions - totalSinks
        });
      } catch (error) {
        console.error('Error fetching summary data', error);
      }
    };

    fetchSummary();
  }, []);

  const cards = [
    { title: 'Input Emissions', path: '/emission', color: 'bg-red-100 hover:bg-red-200' },
    { title: 'Add Carbon Sink', path: '/carbon-sink', color: 'bg-green-100 hover:bg-green-200' },
    { title: 'Run Simulation', path: '/simulation', color: 'bg-blue-100 hover:bg-blue-200' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-200 p-6 rounded-2xl shadow-md text-center">
          <h3 className="font-semibold text-lg">Total Emissions</h3>
          <p className="text-xl font-bold">{summary.totalEmissions} tons</p>
        </div>
        <div className="bg-green-200 p-6 rounded-2xl shadow-md text-center">
          <h3 className="font-semibold text-lg">Carbon Sinks</h3>
          <p className="text-xl font-bold">{summary.totalSinks} tons</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded-2xl shadow-md text-center">
          <h3 className="font-semibold text-lg">Net Emissions</h3>
          <p className="text-xl font-bold">{summary.netEmissions} tons</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-8 text-gray-700">Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 ${card.color}`}
          >
            <h4 className="text-lg font-semibold text-center">{card.title}</h4>
          </div>
        ))}
      </div>

      <DashboardCharts />
    </div>
  );
};

export default DashboardPage;
