import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Job Portal</h3>
                        <p className="text-gray-400 text-sm">
                            Find your dream job or hire the best talent. Connect with top companies and candidates.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="text-gray-400 hover:text-white">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-job" className="text-gray-400 hover:text-white">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-applications" className="text-gray-400 hover:text-white">
                                    My Applications
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: info@jobportal.com</li>
                            <li>Phone: +1 234 567 8900</li>
                            <li>Address: 123 Job Street, Career City</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
