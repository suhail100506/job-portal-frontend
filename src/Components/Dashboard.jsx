import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            if (user.role === 'recruiter' || user.role === 'admin') {
                const res = await API.get('/jobs');
                const myJobs = res.data.filter(job => job.postedBy._id === user._id);
                setData(myJobs);
            } else {
                const res = await API.get('/applications/my-applications');
                setData(res.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await API.delete(`/jobs/${jobId}`);
                setData(data.filter(job => job._id !== jobId));
                alert('Job deleted successfully');
            } catch (error) {
                alert('Failed to delete job');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {user.role === 'recruiter' ? 'Recruiter Dashboard' : 'My Applications'}
                    </h1>
                    {user.role === 'recruiter' && (
                        <Link
                            to="/add-job"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Post New Job
                        </Link>
                    )}
                </div>

                {user.role === 'recruiter' ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">My Posted Jobs ({data.length})</h2>
                        {data.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                                <Link
                                    to="/add-job"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Post Your First Job
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {data.map(job => (
                                    <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                                <p className="text-gray-600 mb-1">{job.company}</p>
                                                <p className="text-gray-500 text-sm mb-2">{job.location} • {job.jobType}</p>
                                                <p className="text-green-600 font-semibold">{job.salary}</p>
                                                <p className="text-gray-500 text-sm mt-2">
                                                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/jobs/${job._id}/applications`}
                                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                >
                                                    View Applications
                                                </Link>
                                                <Link
                                                    to={`/jobs/${job._id}`}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => deleteJob(job._id)}
                                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
                        <h2 className="text-xl font-semibold mb-4">My Applications ({data.length})</h2>
                        {data.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                                <Link
                                    to="/jobs"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {data.map(application => (
                                    <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-2">{application.job.title}</h3>
                                                <p className="text-gray-600 mb-1">{application.job.company}</p>
                                                <p className="text-gray-500 text-sm mb-2">{application.job.location}</p>
                                                <p className="text-gray-500 text-sm">
                                                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-sm ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </span>
                                                <div className="mt-2">
                                                    <Link
                                                        to={`/jobs/${application.job._id}`}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                    >
                                                        View Job
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;