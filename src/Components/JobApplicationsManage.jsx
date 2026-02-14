import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API from '../utils/api';

const JobApplicationsManage = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchJobAndApplications();
    }, [jobId]);

    const fetchJobAndApplications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const jobResponse = await API.get(`/jobs/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJob(jobResponse.data);


            const appsResponse = await API.get(`/applications/job/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setApplications(appsResponse.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch applications.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (applicationId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await API.put(
                `/applications/${applicationId}/status`,
                { status: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            // Update local state
            setApplications(applications.map(app =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
            alert('Application status updated successfully!');
        } catch (err) {
            alert('Failed to update status');
            console.error('Error:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
            case 'reviewed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
            case 'shortlisted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
            case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
                <div className="text-xl text-gray-600 dark:text-gray-300">Loading applications...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
                    ← Back to Dashboard
                </Link>

                {/* Job Info */}
                {job && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 border dark:border-gray-700 transition-colors">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{job.company} • {job.location}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {/* Applications */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 transition-colors">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Applications ({applications.length})
                    </h2>

                    {applications.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">No applications received yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {applications.map((application) => (
                                <div key={application._id} className="border dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-700/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {application.applicant.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">{application.applicant.email}</p>
                                            {application.applicant.phone && (
                                                <p className="text-gray-600 dark:text-gray-400">{application.applicant.phone}</p>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cover Letter:</h4>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{application.coverLetter}</p>
                                    </div>

                                    {application.resume && (
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Resume:</h4>
                                            <div className="flex gap-4">
                                                <a
                                                    href={
                                                        `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/api/files/download/view/${encodeURIComponent(application.resumeFilename || `resume_${application.applicant?.name?.replace(/\s+/g, '_') || 'applicant'}.pdf`)}?url=${encodeURIComponent(application.resume)}&token=${localStorage.getItem('token')}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow-md hover:shadow-lg"
                                                >
                                                    📄 View in Browser
                                                </a>
                                                <a
                                                    href={
                                                        `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/api/files/download/attachment/${encodeURIComponent(application.resumeFilename || `resume_${application.applicant?.name?.replace(/\s+/g, '_') || 'applicant'}.pdf`)}?url=${encodeURIComponent(application.resume)}&token=${localStorage.getItem('token')}`
                                                    }
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition shadow-md hover:shadow-lg"
                                                >
                                                    ⬇️ Download Resume
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                                        Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                    </div>

                                    {/* Action Buttons */}
                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'reviewed')}
                                            disabled={application.status === 'reviewed'}
                                            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:disabled:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Mark Reviewed
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                                            disabled={application.status === 'shortlisted'}
                                            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-400 dark:bg-violet-600 dark:hover:bg-violet-700 dark:disabled:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Shortlist
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'accepted')}
                                            disabled={application.status === 'accepted'}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:disabled:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                            disabled={application.status === 'rejected'}
                                            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400 dark:bg-rose-600 dark:hover:bg-rose-700 dark:disabled:bg-gray-600 transition-all shadow-md hover:shadow-lg"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobApplicationsManage;
