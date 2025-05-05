// src/components/EmissionForm.jsx
import React, { useState } from 'react';
import api from '../utils/api';

const EmissionForm = () => {
  const [form, setForm] = useState({
    activityType: '',
    quantity: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/emission', {
        activityType: form.activityType,
        quantity: Number(form.quantity)
      });

      setMessage(res.data.message);
      setForm({ activityType: '', quantity: '' });
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || 'Failed to submit emission data.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Add Emission Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Activity Type</label>
          <select
            value={form.activityType}
            onChange={(e) => setForm({ ...form, activityType: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Activity</option>
            <option value="Excavation">Excavation</option>
            <option value="Transportation">Transportation</option>
            <option value="Drilling">Drilling</option>
            <option value="Machinery">Machinery</option>
            <option value="Electricity">Electricity</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter quantity"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {message && (
          <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default EmissionForm;
