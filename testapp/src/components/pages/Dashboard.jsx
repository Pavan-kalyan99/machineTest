import React from 'react';
import { Link } from 'react-router-dom';
import AgentTasks from './AgentTasks';

export default function Dashboard() {
  return (
    <>

      <div className="flex items-center justify-center bg-gray-100 px-4 py-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          <div className="flex flex-col gap-4">
            <Link
              to="/add-agent"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
            >
              Add Agent
            </Link>
            <Link
              to="/upload-csv"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded transition"
            >
              Upload CSV
            </Link>
          </div>
        </div>
      </div>
      <AgentTasks />
    </>

  );
}

// src/pages/AddAgent.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function AddAgent() {
//     const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await axios.post('http://localhost:5000/api/agents', form);
//         alert('Agent added');
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Add Agent</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
//                 <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 w-full" />
//                 <input type="tel" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="border p-2 w-full" />
//                 <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 w-full" />
//                 <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
//             </form>
//         </div>
//     );
// }
