import React, { useState } from 'react';
import api from '../utils/api';

const CarbonSinkForm = () => {
  const [form, setForm] = useState({
    sinkType: '',
    areaInHectares: '',
    numberOfTrees: ''
  });
  const [message, setMessage] = useState('');

  // Assume average absorption is 6.5 tons CO₂ per hectare
  const calculateEstimatedAbsorption = (area) => {
    return area * 6.5;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const area = parseFloat(form.areaInHectares);
      const estimatedAbsorption = calculateEstimatedAbsorption(area);

      const res = await api.post('/carbonSink', {
        sinkType: form.sinkType,
        areaInHectares: area,
        numberOfTrees: parseInt(form.numberOfTrees) || 0,
        estimatedAbsorption
      });

      setMessage(res.data.message || 'Carbon sink data submitted!');
      setForm({ sinkType: '', areaInHectares: '', numberOfTrees: '' });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error submitting carbon sink data.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Add Carbon Sink</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Sink Type</label>
          <select
            name="sinkType"
            value={form.sinkType}
            onChange={(e) => setForm({ ...form, sinkType: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="tree plantation">Tree Plantation</option>
            <option value="wetland">Wetland</option>
            <option value="Soil Carbon">Soil Carbon</option>
            <option value="Agroforestry">Agroforestry</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Area (in hectares)</label>
          <input
            type="number"
            name="areaInHectares"
            value={form.areaInHectares}
            onChange={(e) => setForm({ ...form, areaInHectares: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Number of Trees (optional)</label>
          <input
            type="number"
            name="numberOfTrees"
            value={form.numberOfTrees}
            onChange={(e) => setForm({ ...form, numberOfTrees: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>

        {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default CarbonSinkForm;
