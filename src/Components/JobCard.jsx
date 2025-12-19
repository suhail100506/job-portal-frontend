import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const daysAgo = Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24));
    const timeAgo = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`;
    const typeColors = { 'Full-time': 'green', 'Part-time': 'blue', 'Contract': 'purple', 'Internship': 'yellow', 'Remote': 'indigo' };
    const color = typeColors[job.type] || 'indigo';

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden border hover:border-blue-400 transform hover:-translate-y-1">
            <div className="p-6 border-b">
                <div className="flex justify-between mb-3">
                    <div className="flex-1">
                        <Link to={`/jobs/${job._id}`}><h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-2">{job.title}</h3></Link>
                        <p className="font-semibold text-lg text-gray-700">🏢 {job.company}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700`}>{job.type}</span>
                        <span className="text-xs text-gray-500">{timeAgo}</span>
                    </div>
                </div>
                <div className="flex gap-3 mb-3 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    <span>🏷️ {job.category}</span>
                </div>
                {job.salary && <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200 inline-block"><span className="text-green-700 font-bold">💰 {job.salary}</span></div>}
            </div>
            <div className="p-6">
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{job.description}</p>
                {job.requirements && <p className="text-gray-600 text-xs line-clamp-2 mb-3">{job.requirements}</p>}
                {job.postedBy && <p className="text-xs text-gray-500">👤 {job.postedBy.name || 'Recruiter'}</p>}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                <span className="text-xs text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</span>
                <Link to={`/jobs/${job._id}`} className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">View Details →</Link>
            </div>
        </div>
    );
};

export default JobCard;
