import React from 'react';
import CarbonSinkForm from '../components/CarbonSinkForm';

const CarbonSinkPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Carbon Sink</h2>
      <CarbonSinkForm />
    </div>
  );
};

export default CarbonSinkPage;
