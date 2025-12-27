import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import API from '../utils/api';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ keyword: '', location: '', type: '', category: '' });

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try { setLoading(true); const { data } = await API.get('/jobs'); setJobs(data); }
        catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams(Object.entries(filters).filter(([_, v]) => v));
        try { const { data } = await API.get(`/jobs/search?${params}`); setJobs(data); }
        catch (err) { console.error(err); }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-4">🔍 Find Jobs</h1>
                    <form onSubmit={handleSearch} className="grid md:grid-cols-2 gap-4">
                        <input type="text" name="keyword" placeholder="Job title..." value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} className="px-4 py-2 border rounded-lg" />
                        <input type="text" name="location" placeholder="Location..." value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="px-4 py-2 border rounded-lg" />
                        <select name="type" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="px-4 py-2 border rounded-lg"><option value="">All Types</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Internship">Internship</option><option value="Remote">Remote</option></select>
                        <select name="category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="px-4 py-2 border rounded-lg"><option value="">All Categories</option><option value="IT">IT</option><option value="Finance">Finance</option><option value="Marketing">Marketing</option><option value="Sales">Sales</option></select>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">🔍 Search</button>
                        <button type="button" onClick={() => { setFilters({ keyword: '', location: '', type: '', category: '' }); fetchJobs(); }} className="bg-gray-200 px-6 py-2 rounded-lg">↻ Reset</button>
                    </form>
                </div>
                <h2 className="text-2xl font-bold mb-4">{jobs.length} Jobs Found</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">{jobs.map(job => <JobCard key={job._id} job={job} />)}</div>
            </div>
        </div>
    );
};

export default JobListing;
