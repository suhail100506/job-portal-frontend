import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/applications/my-applications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setApplications(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch applications.');
            console.error('Error fetching applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800';
            case 'shortlisted':
                return 'bg-purple-100 text-purple-800';
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">Loading applications...</div>
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Job Applications</h1>

                {applications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            No Applications Yet
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You haven't applied to any jobs yet. Start browsing and apply to your dream job!
                        </p>
                        <Link
                            to="/jobs"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {applications.map((application) => (
                            <div
                                key={application._id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {application.job.title}
                                        </h3>
                                        <p className="text-gray-700 font-semibold mb-1">
                                            {application.job.company}
                                        </p>
                                        <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                                            <span>📍 {application.job.location}</span>
                                            <span className="px-3 py-1 bg-gray-100 rounded-full">
                                                {application.job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                                            application.status
                                        )}`}
                                    >
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </span>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <p className="text-gray-600 text-sm mb-3">
                                        Applied on {new Date(application.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <Link
                                        to={`/jobs/${application.job._id}`}
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                                    >
                                        View Job Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplications;
