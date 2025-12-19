import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
