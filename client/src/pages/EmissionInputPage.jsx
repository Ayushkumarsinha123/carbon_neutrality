import React from 'react';
import EmissionForm from '../components/EmissionForm';

const EmissionInputPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Emission Data</h2>
      <EmissionForm />
    </div>
  );
};

export default EmissionInputPage;
