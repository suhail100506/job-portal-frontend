import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [applying, setApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(false);

    useEffect(() => {
        fetchJobDetails();
        if (user && user.role === 'jobseeker') {
            checkIfAlreadyApplied();
        }
    }, [id, user]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
            setJob(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch job details.');
            console.error('Error fetching job:', err);
        } finally {
            setLoading(false);
        }
    };

    const checkIfAlreadyApplied = async () => {
        try {
            setCheckingApplication(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/applications/my-applications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const applied = response.data.some(app => app.job._id === id);
            setHasApplied(applied);
        } catch (err) {
            console.error('Error checking application status:', err);
        } finally {
            setCheckingApplication(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setApplying(true);
            const formData = new FormData();
            formData.append('jobId', id);
            formData.append('coverLetter', coverLetter);
            if (resume) {
                formData.append('resume', resume);
            }

            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setHasApplied(true);
            alert('Application submitted successfully!');
            setCoverLetter('');
            setResume(null);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to submit application';
            if (errorMessage === 'Already applied') {
                setHasApplied(true);
            }
            alert(errorMessage);
            console.error('Error submitting application:', err);
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-gray-600">Loading job details...</div>
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

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                    <Link to="/jobs" className="text-blue-600 hover:underline">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <Link to="/jobs" className="text-blue-600 hover:underline mb-4 inline-block">
                        ← Back to Jobs
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-900">{job.company}</span>
                        </div>
                        <div className="flex items-center">
                            <span>📍 {job.location}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {job.type}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {job.category}
                            </span>
                        </div>
                    </div>
                    {job.salary && (
                        <p className="text-xl font-semibold text-green-600 mb-2">💰 {job.salary}</p>
                    )}
                    <p className="text-gray-500 text-sm">
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                        <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                    </section>
                </div>

                {user && user.role !== 'recruiter' && user.role !== 'admin' && (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {hasApplied ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <div className="text-green-600 text-xl font-semibold mb-2">✓ Application Submitted</div>
                                <p className="text-gray-700 mb-4">You have already applied for this position.</p>
                                <Link
                                    to="/my-applications"
                                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    View My Applications
                                </Link>
                            </div>
                        ) : checkingApplication ? (
                            <div className="text-center text-gray-600">Checking application status...</div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Job</h2>
                                <form onSubmit={handleApply}>
                                    <div className="mb-6">
                                        <label htmlFor="coverLetter" className="block text-gray-700 font-semibold mb-2">
                                            Cover Letter *
                                        </label>
                                        <textarea
                                            id="coverLetter"
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            required
                                            rows="6"
                                            placeholder="Explain why you're a great fit for this position..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">
                                            Resume (PDF or DOC)
                                        </label>
                                        <input
                                            type="file"
                                            id="resume"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setResume(e.target.files[0])}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
                                        disabled={applying}
                                    >
                                        {applying ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                )}

                {!user && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <p className="text-gray-700 text-lg">
                            Please{' '}
                            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                                login
                            </Link>{' '}
                            to apply for this job.
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default JobDetails;
