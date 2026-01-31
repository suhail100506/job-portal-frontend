import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import './AddJob.css';

const AddJob = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        salary: '',
        type: 'Full Time',
        category: 'Development'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            await API.post('/jobs', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Job posted successfully!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
            console.error('Error posting job:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-job-container">
            {/* Hero Section */}
            <div className="add-job-hero">
                <h1 className="add-job-title">Post a New Job</h1>
                <p className="add-job-subtitle">
                    Fill in the details below to create a new job posting and attract top talent
                </p>
            </div>

            {/* Form Card */}
            <div className="add-job-form-wrapper">
                {error && (
                    <div className="error-alert">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="add-job-form">
                    {/* Basic Information Section */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">📝</span>
                            Basic Information
                        </h2>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="title" className="form-label">
                                    Job Title <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="e.g., Senior Software Engineer"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company" className="form-label">
                                    Company Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="e.g., Tech Corporation"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location" className="form-label">
                                    Location <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="e.g., New York, NY or Remote"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">💼</span>
                            Job Details
                        </h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="type" className="form-label">
                                    Job Type <span className="required">*</span>
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category" className="form-label">
                                    Category <span className="required">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Project Management">Project Management</option>
                                    <option value="Customer Services">Customer Services</option>
                                    <option value="Accounting / Finance">Accounting / Finance</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="salary" className="form-label">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., $80,000 - $120,000/year"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="form-section">
                        <h2 className="section-title">
                            <span className="section-icon">📄</span>
                            Job Description
                        </h2>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Description <span className="required">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="form-textarea"
                                placeholder="Describe the role, responsibilities, and what the candidate will do..."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="requirements" className="form-label">
                                Requirements <span className="required">*</span>
                            </label>
                            <textarea
                                id="requirements"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                required
                                rows="6"
                                className="form-textarea"
                                placeholder="List required skills, qualifications, and experience..."
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="btn-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-submit"
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <span>✓</span>
                                    Post Job
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
