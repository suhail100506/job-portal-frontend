import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const daysAgo = Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));
    const timeAgo = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`;

    // Map job types to specific color classes for both light and dark modes
    const getTypeClasses = (type) => {
        const classes = {
            'Full-time': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
            'Part-time': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
            'Contract': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
            'Internship': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
            'Remote': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
        };
        return classes[type] || 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden border dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transform hover:-translate-y-1">
            <div className="p-6 border-b dark:border-gray-700">
                <div className="flex justify-between mb-3">
                    <div className="flex-1">
                        <Link to={`/jobs/${job._id}`}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2 transition-colors">
                                {job.title}
                            </h3>
                        </Link>
                        <p className="font-semibold text-lg text-gray-700 dark:text-gray-300">🏢 {job.company}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeClasses(job.type)}`}>
                            {job.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</span>
                    </div>
                </div>
                <div className="flex gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>📍 {job.location}</span>
                    <span>🏷️ {job.category}</span>
                </div>
                {job.salary && (
                    <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 inline-block">
                        <span className="text-green-700 dark:text-green-400 font-bold">💰 {job.salary}</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">{job.description}</p>
                {job.requirements && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                        <span className="font-semibold">Req:</span> {job.requirements}
                    </p>
                )}
                {job.postedBy && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">👤 {job.postedBy.name || 'Recruiter'}</p>
                )}
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</span>
                <Link
                    to={`/jobs/${job._id}`}
                    className="px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
