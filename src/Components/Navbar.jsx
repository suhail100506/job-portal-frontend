import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="bg-white shadow-md dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        Job Portal
                    </Link>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Jobs</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Dashboard</Link>
                                </li>
                                {(user.role === 'recruiter' || user.role === 'employer' || user.role === 'admin') && (
                                    <>
                                        <li>
                                            <Link to="/recruiter" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Recruiter Panel</Link>
                                        </li>
                                        <li>
                                            <Link to="/add-job" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Post Job</Link>
                                        </li>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <li>
                                        <Link to="/admin" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Admin Panel</Link>
                                    </li>
                                )}
                                {user.role === 'jobseeker' && (
                                    <li>
                                        <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">My Applications</Link>
                                    </li>
                                )}
                                <li>
                                    <span className="text-gray-600 text-sm dark:text-gray-400">Hi, {user.name}</span>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
                                        aria-label="Toggle theme"
                                    >
                                        {theme === 'light' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 transition-all font-medium">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Register</Link>
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
