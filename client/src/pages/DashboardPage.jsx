import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import DashboardCharts from '../components/DashboardCharts';
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

        const totalEmissions = emissionsRes.data.reduce((sum, e) => sum + e.emissionValue, 0);
        const totalSinks = sinksRes.data.reduce((sum, s) => sum + s.amount, 0);

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
    { title: 'Input Emissions', path: '/emission-input', color: 'bg-red-100' },
    { title: 'Add Carbon Sink', path: '/carbon-sink', color: 'bg-green-100' },
    { title: 'Run Simulation', path: '/simulation', color: 'bg-blue-100' }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Summary</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-red-200 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total Emissions</h3>
          <p>{summary.totalEmissions} tons</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Carbon Sinks</h3>
          <p>{summary.totalSinks} tons</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Net Emissions</h3>
          <p>{summary.netEmissions} tons</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Navigate</h3>
      <div className="grid grid-cols-3 gap-4">
        {cards.map(card => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer p-6 rounded-lg shadow hover:scale-105 transition ${card.color}`}
          >
            <h4 className="text-lg font-semibold">{card.title}</h4>
          </div>
        ))}
      </div>

      {/* <DashboardCharts /> */}
    </div>
  );
};

export default DashboardPage;
