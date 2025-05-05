import React from 'react';
import StrategySimulator from '../components/StrategySimulator';

const SimulationPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Carbon Neutrality Simulation</h2>
      <StrategySimulator />
    </div>
  );
};

export default SimulationPage;
