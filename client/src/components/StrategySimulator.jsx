import React, { useState } from 'react';
import api from '../utils/api';

const StrategySimulator = () => {
  const [targetYear, setTargetYear] = useState('');
  const [result, setResult] = useState(null);

  const simulate = async () => {
    try {
      const res = await api.post('/simulation', { targetYear });
      setResult(res.data);
    } catch (error) {
      console.error('Simulation error', error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Target Year (e.g. 2030)"
        value={targetYear}
        onChange={(e) => setTargetYear(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={simulate}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Simulate Strategy
      </button>
      {result && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="font-semibold">Simulation Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StrategySimulator;
