import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (activeTab === 'users') {
                const response = await axios.get('https://job-portal-backend-gcjw.onrender.com/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUsers(response.data);
            } else {
                const response = await axios.get('https://job-portal-backend-gcjw.onrender.com/api/jobs', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setJobs(response.data);
            }
            setError('');
        } catch (err) {
            setError('Failed to fetch data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('token');
            await API.delete(`/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(users.filter(u => u._id !== userId));
            alert('User deleted successfully');
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            const token = localStorage.getItem('token');
            await API.delete(`/jobs/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJobs(jobs.filter(j => j._id !== jobId));
            alert('Job deleted successfully');
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `https://job-portal-backend-gcjw.onrender.com/api/users/${userId}/role`,
                { role: newRole },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            alert('Role updated successfully');
        } catch (err) {
            alert('Failed to update role');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>


                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'users'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Users ({users.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'jobs'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Jobs ({jobs.length})
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <>
                        {activeTab === 'users' && (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        <option value="jobseeker">Job Seeker</option>
                                                        <option value="recruiter">Recruiter</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'jobs' && (
                            <div className="grid gap-6">
                                {jobs.map((job) => (
                                    <div key={job._id} className="bg-white rounded-lg shadow p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                                <p className="text-gray-600 mb-1">{job.company}</p>
                                                <p className="text-gray-500 text-sm">{job.location} • {job.type}</p>
                                                <p className="text-gray-500 text-sm mt-2">
                                                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/jobs/${job._id}`}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
