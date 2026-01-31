import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Job Portal</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Find your dream job or hire the best talent. Your career journey starts here.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Browse Jobs</a></li>
                            <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
                            <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Email: info@jobportal.com<br />
                            Phone: +1 234 567 890
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-sm">
                    <p>&copy; 2024 Job Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
