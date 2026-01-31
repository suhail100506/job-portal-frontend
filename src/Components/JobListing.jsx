import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './JobListing.css';

const JobListing = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const navigate = useNavigate();

    const categories = [
        { name: 'Customer Services', icon: '🎧' },
        { name: 'Project Management', icon: '📊' },
        { name: 'Development', icon: '⚙️' },
        { name: 'Design', icon: '🎨' },
        { name: 'Marketing', icon: '📈' },
        { name: 'Accounting / Finance', icon: '💼' }
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [activeCategory, allJobs]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/jobs');
            setAllJobs(data);
            setFilteredJobs(data);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...allJobs];

        if (activeCategory !== 'All') {
            filtered = filtered.filter(job =>
                job.category && job.category.toLowerCase().includes(activeCategory.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
    };

    const handleJobClick = (jobId) => {
        navigate(`/jobs/${jobId}`);
    };

    const toggleBookmark = (e, jobId) => {
        e.stopPropagation();
        setBookmarkedJobs(prev =>
            prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const getCompanyIcon = (company) => {
        return company ? company.charAt(0).toUpperCase() : '?';
    };

    const getCompanyColor = (index) => {
        const colors = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <div className="jobs-page-container">
                <div className="loading-state">Loading jobs...</div>
            </div>
        );
    }

    return (
        <div className="jobs-page-container">
            <div className="jobs-page-header">
                <h1 className="jobs-page-title">Find Your Favorite Job</h1>

                {/* Category Filters */}
                <div className="category-filter-pills">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            className={`category-pill ${activeCategory === category.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.name)}
                        >
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* View Controls */}
            <div className="jobs-controls">
                <button
                    className="view-all-link"
                    onClick={() => setActiveCategory('All')}
                >
                    View All Jobs →
                </button>
                <div className="view-mode-toggles">
                    <button
                        className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <button
                        className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Job Cards Grid */}
            <div className={`jobs-grid ${viewMode}`}>
                {filteredJobs.length === 0 ? (
                    <div className="no-jobs-message">No jobs found for this category.</div>
                ) : (
                    filteredJobs.map((job, index) => (
                        <div
                            key={job._id}
                            className="job-card-modern"
                            onClick={() => handleJobClick(job._id)}
                        >
                            {/* Bookmark */}
                            <button
                                className={`bookmark-btn ${bookmarkedJobs.includes(job._id) ? 'active' : ''}`}
                                onClick={(e) => toggleBookmark(e, job._id)}
                            >
                                {bookmarkedJobs.includes(job._id) ? '⭐' : '☆'}
                            </button>

                            {/* Job Type and Location Tags */}
                            <div className="job-meta-tags">
                                {job.type && <span className="meta-tag">{job.type}</span>}
                                {job.location && <span className="meta-tag">{job.location}</span>}
                            </div>

                            {/* Company Icon */}
                            <div
                                className="company-logo-modern"
                                style={{ backgroundColor: getCompanyColor(index) }}
                            >
                                {getCompanyIcon(job.company)}
                            </div>

                            {/* Job Title */}
                            <h3 className="job-title-modern">{job.title}</h3>

                            {/* Job Info */}
                            <div className="job-info-modern">
                                <span className="job-category-badge">{job.category || 'General'}</span>
                                <span className="job-salary">{job.salary || 'Competitive'}</span>
                            </div>

                            {/* Apply Button */}
                            <button className="apply-now-btn">
                                Apply Now
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListing;
