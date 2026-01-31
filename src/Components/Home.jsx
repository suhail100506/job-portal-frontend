import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const popularCategories = ['Design', 'Project Management', 'Development'];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/jobs');
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/jobs?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="home-container">
            <div className="home-hero">
                {/* Left Illustration */}
                <div className="home-illustration-left">
                    <svg viewBox="0 0 200 300" className="illustration-svg">
                        {/* Woman sitting at desk */}
                        <g className="woman-illustration">
                            {/* Desk */}
                            <rect x="40" y="150" width="120" height="4" fill="var(--ill-primary)" />
                            <line x1="50" y1="154" x2="50" y2="220" stroke="var(--ill-primary)" strokeWidth="3" />
                            <line x1="150" y1="154" x2="150" y2="220" stroke="var(--ill-primary)" strokeWidth="3" />

                            {/* Laptop */}
                            <rect x="70" y="135" width="60" height="2" fill="var(--ill-primary)" />
                            <rect x="75" y="137" width="50" height="35" fill="var(--ill-secondary)" stroke="var(--ill-primary)" strokeWidth="2" />

                            {/* Chair */}
                            <ellipse cx="110" cy="165" rx="15" ry="8" fill="var(--ill-primary)" />
                            <line x1="110" y1="173" x2="110" y2="200" stroke="var(--ill-primary)" strokeWidth="3" />

                            {/* Person - Body */}
                            <rect x="95" y="90" width="30" height="70" fill="var(--ill-tertiary)" stroke="var(--ill-primary)" strokeWidth="2" />
                            {/* Arms */}
                            <path d="M 95 100 L 75 130" stroke="var(--ill-tertiary)" strokeWidth="8" />
                            <path d="M 125 100 L 130 140" stroke="var(--ill-tertiary)" strokeWidth="8" />
                            {/* Pants */}
                            <rect x="95" y="155" width="12" height="30" fill="var(--ill-primary)" />
                            <rect x="113" y="155" width="12" height="30" fill="var(--ill-primary)" />
                            {/* Shoes */}
                            <ellipse cx="101" cy="190" rx="8" ry="4" fill="var(--ill-primary)" />
                            <ellipse cx="119" cy="190" rx="8" ry="4" fill="var(--ill-primary)" />

                            {/* Head */}
                            <circle cx="110" cy="70" r="18" fill="var(--ill-tertiary)" stroke="var(--ill-primary)" strokeWidth="2" />
                            {/* Ponytail */}
                            <ellipse cx="95" cy="60" rx="12" ry="25" fill="var(--ill-primary)" />
                        </g>
                    </svg>
                </div>

                {/* Center Content */}
                <div className="home-content">
                    <p className="home-tagline">We are your future</p>
                    <h1 className="home-title">Get Your Desired<br />Job With Findy.</h1>
                    <p className="home-subtitle">
                        Get jobs, create trackable resumes and enrich your applications
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="home-search-form">
                        <div className="search-input-wrapper">
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input
                                type="text"
                                placeholder="Job Title, Keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <button type="submit" className="search-btn">
                            Search Job
                        </button>
                    </form>

                    {/* Popular Categories */}
                    <div className="popular-categories">
                        <span className="categories-label">Popular Categories:</span>
                        {popularCategories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className="category-link"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Illustration */}
                <div className="home-illustration-right">
                    <svg viewBox="0 0 200 300" className="illustration-svg">
                        {/* Man with documents */}
                        <g className="man-illustration">
                            {/* Documents stack */}
                            <rect x="120" y="80" width="60" height="80" fill="var(--ill-tertiary)" stroke="var(--ill-primary)" strokeWidth="2" rx="2" />
                            <rect x="125" y="100" width="50" height="60" fill="var(--ill-white)" stroke="var(--ill-primary)" strokeWidth="1" />
                            <line x1="130" y1="110" x2="150" y2="110" stroke="var(--ill-primary)" strokeWidth="2" />
                            <line x1="130" y1="120" x2="165" y2="120" stroke="var(--ill-secondary)" strokeWidth="1" />
                            <line x1="130" y1="125" x2="165" y2="125" stroke="var(--ill-secondary)" strokeWidth="1" />
                            <rect x="135" y="135" width="30" height="15" fill="var(--ill-secondary)" stroke="var(--ill-primary)" strokeWidth="1" />

                            {/* Floating papers */}
                            <rect x="140" y="180" width="40" height="50" fill="var(--ill-white)" stroke="var(--ill-primary)" strokeWidth="2" rx="2" />
                            <line x1="145" y1="190" x2="165" y2="190" stroke="var(--ill-secondary)" strokeWidth="2" />
                            <line x1="145" y1="200" x2="170" y2="200" stroke="var(--ill-secondary)" strokeWidth="1" />

                            {/* Person - Body */}
                            <rect x="60" y="120" width="35" height="80" fill="var(--ill-tertiary)" stroke="var(--ill-primary)" strokeWidth="2" />
                            {/* Arms - holding papers */}
                            <path d="M 60 135 L 115 120" stroke="var(--ill-tertiary)" strokeWidth="10" />
                            <path d="M 95 135 L 88 160" stroke="var(--ill-tertiary)" strokeWidth="10" />
                            {/* Pants */}
                            <rect x="60" y="195" width="15" height="35" fill="var(--ill-primary)" />
                            <rect x="80" y="195" width="15" height="35" fill="var(--ill-primary)" />
                            {/* Shoes */}
                            <ellipse cx="67" cy="235" rx="10" ry="5" fill="var(--ill-primary)" />
                            <ellipse cx="87" cy="235" rx="10" ry="5" fill="var(--ill-primary)" />

                            {/* Head */}
                            <circle cx="77" cy="100" r="20" fill="var(--ill-tertiary)" stroke="var(--ill-primary)" strokeWidth="2" />
                            {/* Beard/Hair */}
                            <path d="M 65 105 Q 77 115 89 105" fill="var(--ill-primary)" />
                            <ellipse cx="77" cy="85" rx="20" ry="15" fill="var(--ill-primary)" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-dot"></div>
            </div>
        </div>
    );
};

export default Home;
