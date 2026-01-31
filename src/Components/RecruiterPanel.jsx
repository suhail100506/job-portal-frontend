import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const RecruiterPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('jobs');
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        pendingApplications: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecruiterData();
    }, []);

    const fetchRecruiterData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const jobsResponse = await API.get('/jobs', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const myJobs = jobsResponse.data.filter(job => job.postedBy._id === user._id);
            setJobs(myJobs);

            const applicationsResponse = await API.get('/applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setApplications(applicationsResponse.data);

            const pendingApps = applicationsResponse.data.filter(app => app.status === 'pending').length;
            setStats({
                totalJobs: myJobs.length,
                activeJobs: myJobs.length,
                totalApplications: applicationsResponse.data.length,
                pendingApplications: pendingApps
            });

            setError('');
        } catch (err) {
            setError('Failed to fetch recruiter data');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) return;

        try {
            const token = localStorage.getItem('token');
            await API.delete(`/jobs/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJobs(jobs.filter(j => j._id !== jobId));
            alert('Job deleted successfully');
            fetchRecruiterData();
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await API.put(
                `/applications/${applicationId}/status`,
                { status: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setApplications(applications.map(app =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
            alert('Application status updated successfully');
        } catch (err) {
            alert('Failed to update application status');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recruiter Panel</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your job postings and applications</p>
                    </div>
                    <div>
                        <Link
                            to="/add-job"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Post New Job
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Jobs</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalJobs}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-3">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Active Jobs</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.activeJobs}</p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-3">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Applications</p>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalApplications}</p>
                            </div>
                            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-full p-3">
                                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Pending Reviews</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingApplications}</p>
                            </div>
                            <div className="bg-yellow-100 dark:bg-yellow-900/40 rounded-full p-3">
                                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>



                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 border dark:border-gray-700 transition-colors">
                    <div className="flex border-b dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'jobs'
                                ? 'border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            My Job Postings ({jobs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`flex-1 py-4 px-6 text-center font-semibold ${activeTab === 'applications'
                                ? 'border-b-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Applications ({applications.length})
                        </button>
                    </div>
                </div>

                {activeTab === 'jobs' ? (
                    <div>
                        {jobs.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center border dark:border-gray-700 transition-colors">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No jobs posted yet</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">Start by posting your first job opening</p>
                                <Link
                                    to="/add-job"
                                    className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Post Your First Job
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {jobs.map((job) => (
                                    <div key={job._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">{job.company}</p>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                                        📍 {job.location}
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                                                        {job.type}
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full text-sm">
                                                        {job.category}
                                                    </span>
                                                </div>
                                                {job.salary && (
                                                    <p className="text-green-600 dark:text-green-400 font-semibold mb-2">💰 {job.salary}</p>
                                                )}
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2 ml-4">
                                                <Link
                                                    to={`/jobs/${job._id}/applications`}
                                                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-center text-sm font-medium"
                                                >
                                                    View Applications
                                                </Link>
                                                <Link
                                                    to={`/jobs/${job._id}`}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-center text-sm font-medium"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {applications.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center border dark:border-gray-700 transition-colors">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No applications yet</h3>
                                <p className="text-gray-600 dark:text-gray-400">Applications for your job postings will appear here</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border dark:border-gray-700 transition-colors">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Applicant
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Job Position
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Applied Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {applications.map((application) => (
                                            <tr key={application._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {application.applicant?.name || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {application.applicant?.email || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {application.job?.title || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {application.job?.company || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(application.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={application.status}
                                                        onChange={(e) => handleUpdateApplicationStatus(application._id, e.target.value)}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium border dark:bg-gray-700 ${application.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700'
                                                            : application.status === 'reviewed'
                                                                ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700'
                                                                : application.status === 'accepted'
                                                                    ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700'
                                                                    : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700'
                                                            }`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="reviewed">Reviewed</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        to={`/jobs/${application.job?._id}`}
                                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterPanel;
