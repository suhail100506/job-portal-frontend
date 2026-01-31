import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import './JobApplications.css';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await API.get('/applications/my-applications', {
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#F59E0B';
            case 'reviewed': return '#3B82F6';
            case 'shortlisted': return '#8B5CF6';
            case 'accepted': return '#10B981';
            case 'rejected': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const getCompanyIcon = (company) => {
        return company ? company.charAt(0).toUpperCase() : '?';
    };

    const getCompanyColor = (index) => {
        const colors = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];
        return colors[index % colors.length];
    };

    const getStats = () => {
        return {
            total: applications.length,
            pending: applications.filter(app => app.status === 'pending').length,
            accepted: applications.filter(app => app.status === 'accepted').length,
            rejected: applications.filter(app => app.status === 'rejected').length
        };
    };

    const filteredApplications = filterStatus === 'all'
        ? applications
        : applications.filter(app => app.status === filterStatus);

    const stats = getStats();

    if (loading) {
        return (
            <div className="applications-container">
                <div className="loading-state">Loading applications...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="applications-container">
                <div className="error-alert">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="applications-container">
            {/* Hero Section */}
            <div className="applications-hero">
                <h1 className="applications-title">My Job Applications</h1>
                <p className="applications-subtitle">
                    Track all your job applications and their status in one place
                </p>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3 className="empty-title">No Applications Yet</h3>
                    <p className="empty-description">
                        You haven't applied to any jobs yet. Start browsing and apply to your dream job!
                    </p>
                    <Link to="/jobs" className="empty-action-btn">
                        Browse Jobs
                    </Link>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="applications-stats">
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-blue">
                                📊
                            </div>
                            <div className="stat-info">
                                <h3 className="stat-number">{stats.total}</h3>
                                <p className="stat-label">Total Applications</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-yellow">
                                ⏳
                            </div>
                            <div className="stat-info">
                                <h3 className="stat-number">{stats.pending}</h3>
                                <p className="stat-label">Pending</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-green">
                                ✅
                            </div>
                            <div className="stat-info">
                                <h3 className="stat-number">{stats.accepted}</h3>
                                <p className="stat-label">Accepted</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon stat-icon-red">
                                ❌
                            </div>
                            <div className="stat-info">
                                <h3 className="stat-number">{stats.rejected}</h3>
                                <p className="stat-label">Rejected</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button
                            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({applications.length})
                        </button>
                        <button
                            className={`filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('pending')}
                        >
                            Pending ({stats.pending})
                        </button>
                        <button
                            className={`filter-tab ${filterStatus === 'accepted' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('accepted')}
                        >
                            Accepted ({stats.accepted})
                        </button>
                        <button
                            className={`filter-tab ${filterStatus === 'rejected' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('rejected')}
                        >
                            Rejected ({stats.rejected})
                        </button>
                    </div>

                    {/* Applications Grid */}
                    <div className="applications-grid">
                        {filteredApplications.map((application, index) => (
                            <div key={application._id} className="application-card">
                                <div className="card-header">
                                    <div
                                        className="company-icon"
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

                                <h3 className="application-job-title">{application.job.title}</h3>

                                <div className="application-meta">
                                    <span className="meta-item">
                                        <span className="meta-icon">🏢</span>
                                        {application.job.company}
                                    </span>
                                    <span className="meta-item">
                                        <span className="meta-icon">📍</span>
                                        {application.job.location}
                                    </span>
                                </div>

                                <div className="application-tags">
                                    <span className="tag">{application.job.type || 'Full Time'}</span>
                                    {application.job.category && (
                                        <span className="tag">{application.job.category}</span>
                                    )}
                                </div>

                                <div className="application-footer">
                                    <span className="application-date">
                                        Applied {new Date(application.createdAt).toLocaleDateString()}
                                    </span>
                                    <Link
                                        to={`/jobs/${application.job._id}`}
                                        className="view-job-btn"
                                    >
                                        View Job →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredApplications.length === 0 && (
                        <div className="no-results">
                            <p>No applications found for this filter.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default JobApplications;
