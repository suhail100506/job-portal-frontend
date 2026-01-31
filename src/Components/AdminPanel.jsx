import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import API from '../utils/api';

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
                const response = await API.get('/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUsers(response.data);
            } else {
                const response = await API.get('/jobs', {
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
            await API.put(
                `/users/${userId}/role`,
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>


                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 border dark:border-gray-700 transition-colors">
                    <div className="flex border-b dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'users'
                                ? 'border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Users ({users.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'jobs'
                                ? 'border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
                    <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading...</div>
                ) : (
                    <>
                        {activeTab === 'users' && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border dark:border-gray-700 transition-colors">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                                                        className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    >
                                                        <option value="jobseeker">Job Seeker</option>
                                                        <option value="recruiter">Recruiter</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
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
                                    <div key={job._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300 mb-1">{job.company}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location} • {job.type}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/jobs/${job._id}`}
                                                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
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
