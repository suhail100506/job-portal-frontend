import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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

            const jobResponse = await axios.get(`http://localhost:5000/api/jobs/${jobId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setJob(jobResponse.data);


            const appsResponse = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
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
            await axios.put(
                `http://localhost:5000/api/applications/${applicationId}/status`,
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
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'shortlisted': return 'bg-purple-100 text-purple-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
                    ← Back to Dashboard
                </Link>

                {/* Job Info */}
                {job && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {/* Applications */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Applications ({applications.length})
                    </h2>

                    {applications.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No applications received yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {applications.map((application) => (
                                <div key={application._id} className="border rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {application.applicant.name}
                                            </h3>
                                            <p className="text-gray-600">{application.applicant.email}</p>
                                            {application.applicant.phone && (
                                                <p className="text-gray-600">{application.applicant.phone}</p>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Cover Letter:</h4>
                                        <p className="text-gray-700 whitespace-pre-line">{application.coverLetter}</p>
                                    </div>

                                    {application.resume && (
                                        <div className="mb-4">
                                            <a
                                                href={`http://localhost:5000/${application.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                📄 View Resume
                                            </a>
                                        </div>
                                    )}

                                    <div className="text-sm text-gray-500 mb-4">
                                        Applied on: {new Date(application.createdAt).toLocaleDateString()}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'reviewed')}
                                            disabled={application.status === 'reviewed'}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                                        >
                                            Mark Reviewed
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                                            disabled={application.status === 'shortlisted'}
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                                        >
                                            Shortlist
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'accepted')}
                                            disabled={application.status === 'accepted'}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                            disabled={application.status === 'rejected'}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
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
