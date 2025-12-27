import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        Job Portal
                    </Link>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                                </li>
                                {(user.role === 'recruiter' || user.role === 'admin') && (
                                    <>
                                        <li>
                                            <Link to="/recruiter" className="text-gray-700 hover:text-blue-600">Recruiter Panel</Link>
                                        </li>
                                        <li>
                                            <Link to="/add-job" className="text-gray-700 hover:text-blue-600">Post Job</Link>
                                        </li>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <li>
                                        <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin Panel</Link>
                                    </li>
                                )}
                                {user.role === 'jobseeker' && (
                                    <li>
                                        <Link to="/my-applications" className="text-gray-700 hover:text-blue-600">My Applications</Link>
                                    </li>
                                )}
                                <li>
                                    <span className="text-gray-600 text-sm">Hi, {user.name}</span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
