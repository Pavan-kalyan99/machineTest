import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function AddAgent() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    // console.log('form::', form);
    try {
      const res = await axiosInstance.post('/api/agents', form);
      if (res.status === 200 || res.status === 201) {
        setMessage('✅ Agent added successfully!');
        setForm({ name: '', email: '', mobile: '', password: '' }); // Reset form
      } else {
        setError('⚠️ Unexpected response from server.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '❌ Failed to add agent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center w-full">Add Agent</h2>
        </div>

        {/* Back Button */}
        <div className="mb-4">
          <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Status Message */}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="tel"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <PhoneInput
            country={'in'}
            containerClass="w-full"

            inputClass="!w-full !border !border-gray-300 !rounded !py-2 !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
            inputStyle={{ paddingLeft: '48px', height: '42px' }}

            value={form.mobile}
            onChange={(value) => setForm({ ...form, mobile: `+${value}` })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } text-white p-2 rounded w-full transition`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
