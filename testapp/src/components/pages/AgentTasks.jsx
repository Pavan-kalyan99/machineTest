import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentTasks() {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [openAgentIndex, setOpenAgentIndex] = useState(null);
    const [openTaskIndex, setOpenTaskIndex] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await axiosInstance.get('/api/agents/agents-tasks');
                setAgents(res.data);
                setError('');
            } catch (err) {
                // console.error("Error fetching agents:", err);
                setError('Failed to load agent data',err);
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    const toggleAgent = (index) => {
        setOpenAgentIndex(openAgentIndex === index ? null : index);
        setOpenTaskIndex(null); // Reset tasks when toggling agent
    };

    const toggleTasks = (index) => {
        setOpenTaskIndex(openTaskIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-xl font-bold mb-4">Agent Tasks</h1>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agents.map((agent, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleAgent(index)}
                        >
                            <h2 className="text-lg font-semibold text-blue-700">{agent.name}</h2>
                            {openAgentIndex === index ? <ChevronUp /> : <ChevronDown />}
                        </div>

                        {openAgentIndex === index && (
                            <div className="mt-2 text-sm space-y-1">
                                <p>Email: {agent.email}</p>
                                <p>Mobile: {agent.mobile}</p>

                                {/* Tasks Dropdown */}
                                <div className="mt-2">
                                    <button
                                        className="text-blue-600 text-sm underline"
                                        onClick={() => toggleTasks(index)}
                                    >
                                        {openTaskIndex === index ? 'Hide Tasks' : 'Show Tasks'}
                                    </button>

                                    {openTaskIndex === index && (
                                        <div className="mt-3 space-y-3">
                                            {agent.tasks.length === 0 ? (
                                                <p className="text-gray-500 text-sm italic">No tasks assigned</p>
                                            ) : (
                                                agent.tasks.map((task, taskIdx) => (
                                                    <div
                                                        key={taskIdx}
                                                        className="border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm"
                                                    >
                                                        <div className="font-medium text-blue-800">{task.firstName}</div>
                                                        <div className="text-sm text-gray-700">
                                                            📞 <span className="font-semibold">{task.phone}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-600 italic mt-1">
                                                            📝 {task.notes}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
