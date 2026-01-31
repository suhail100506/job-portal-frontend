import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            if (user.role === 'recruiter' || user.role === 'employer' || user.role === 'admin') {
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

    const getCompanyIcon = (company) => {
        return company ? company.charAt(0).toUpperCase() : '?';
    };

    const getCompanyColor = (index) => {
        const colors = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];
        return colors[index % colors.length];
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return '#10B981';
            case 'rejected': return '#EF4444';
            case 'reviewed': return '#3B82F6';
            default: return '#F59E0B';
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-state">Loading...</div>
            </div>
        );
    }

    const isRecruiter = user.role === 'recruiter' || user.role === 'employer' || user.role === 'admin';

    return (
        <div className="dashboard-container">
            {/* Hero Section */}
            <div className="dashboard-hero">
                <div className="dashboard-hero-content">
                    <h1 className="dashboard-title">
                        {isRecruiter ? 'Manage Your Job Postings' : 'My Job Applications'}
                    </h1>
                    <p className="dashboard-subtitle">
                        {isRecruiter
                            ? 'Track and manage all your job postings in one place'
                            : 'Keep track of all your job applications and their status'}
                    </p>
                </div>
                {isRecruiter && (
                    <Link to="/add-job" className="post-job-btn">
                        + Post New Job
                    </Link>
                )}
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon stat-icon-blue">
                        📊
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">{data.length}</h3>
                        <p className="stat-label">{isRecruiter ? 'Active Jobs' : 'Applications'}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon stat-icon-green">
                        ✅
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">
                            {isRecruiter ? data.length : data.filter(app => app.status === 'accepted').length}
                        </h3>
                        <p className="stat-label">{isRecruiter ? 'Total Postings' : 'Accepted'}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon stat-icon-yellow">
                        ⏳
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-number">
                            {isRecruiter ? '0' : data.filter(app => app.status === 'pending').length}
                        </h3>
                        <p className="stat-label">{isRecruiter ? 'Applications' : 'Pending'}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="dashboard-content">
                <div className="content-header">
                    <h2 className="content-title">
                        {isRecruiter ? 'Your Job Listings' : 'Your Applications'}
                    </h2>
                    <span className="content-count">{data.length} total</span>
                </div>

                {data.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3 className="empty-title">
                            {isRecruiter ? 'No jobs posted yet' : 'No applications yet'}
                        </h3>
                        <p className="empty-description">
                            {isRecruiter
                                ? 'Start by posting your first job to attract great candidates'
                                : 'Start applying to jobs to see them here'}
                        </p>
                        <Link
                            to={isRecruiter ? '/add-job' : '/jobs'}
                            className="empty-action-btn"
                        >
                            {isRecruiter ? 'Post Your First Job' : 'Browse Jobs'}
                        </Link>
                    </div>
                ) : (
                    <div className="dashboard-grid">
                        {isRecruiter ? (
                            // Recruiter Jobs View
                            data.map((job, index) => (
                                <div key={job._id} className="dashboard-card">
                                    <div className="card-header">
                                        <div
                                            className="card-icon"
                                            style={{ backgroundColor: getCompanyColor(index) }}
                                        >
                                            {getCompanyIcon(job.company)}
                                        </div>
                                        <div className="card-actions">
                                            <button
                                                onClick={() => navigate(`/jobs/${job._id}/applications`)}
                                                className="action-btn view-btn"
                                                title="View Applications"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                onClick={() => deleteJob(job._id)}
                                                className="action-btn delete-btn"
                                                title="Delete Job"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="card-title">{job.title}</h3>

                                    <div className="card-meta">
                                        <span className="meta-item">
                                            <span className="meta-icon">🏢</span>
                                            {job.company}
                                        </span>
                                        <span className="meta-item">
                                            <span className="meta-icon">📍</span>
                                            {job.location}
                                        </span>
                                    </div>

                                    <div className="card-tags">
                                        <span className="tag">{job.type || 'Full Time'}</span>
                                        <span className="tag">{job.category || 'General'}</span>
                                    </div>

                                    <div className="card-footer">
                                        <span className="card-date">
                                            Posted {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                        <Link
                                            to={`/jobs/${job._id}`}
                                            className="view-details-btn"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Job Seeker Applications View
                            data.map((application, index) => (
                                <div key={application._id} className="dashboard-card">
                                    <div className="card-header">
                                        <div
                                            className="card-icon"
                                            style={{ backgroundColor: getCompanyColor(index) }}
                                        >
                                            {getCompanyIcon(application.job.company)}
                                        </div>
                                        <div
                                            className="status-badge"
                                            style={{
                                                backgroundColor: `${getStatusColor(application.status)}20`,
                                                color: getStatusColor(application.status)
                                            }}
                                        >
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </div>
                                    </div>

                                    <h3 className="card-title">{application.job.title}</h3>

                                    <div className="card-meta">
                                        <span className="meta-item">
                                            <span className="meta-icon">🏢</span>
                                            {application.job.company}
                                        </span>
                                        <span className="meta-item">
                                            <span className="meta-icon">📍</span>
                                            {application.job.location}
                                        </span>
                                    </div>

                                    <div className="card-tags">
                                        <span className="tag">{application.job.type || 'Full Time'}</span>
                                    </div>

                                    <div className="card-footer">
                                        <span className="card-date">
                                            Applied {new Date(application.createdAt).toLocaleDateString()}
                                        </span>
                                        <Link
                                            to={`/jobs/${application.job._id}`}
                                            className="view-details-btn"
                                        >
                                            View Job →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;