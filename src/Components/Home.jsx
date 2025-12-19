import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <section className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Find Your Dream Job Today
                    </h1>
                    <p className="text-xl text-gray-600 mb-10">
                        Discover thousands of job opportunities with all the information you need.
                        Connect with top companies and take the next step in your career.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link
                                to="/jobs"
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Browse Jobs
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Why Choose Our Platform?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-3">Easy Job Search</h3>
                        <p className="text-gray-600">
                            Find jobs that match your skills and interests quickly and easily with our advanced search filters.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-5xl mb-4">💼</div>
                        <h3 className="text-xl font-semibold mb-3">Top Companies</h3>
                        <p className="text-gray-600">
                            Connect with leading employers and innovative startups across various industries.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-5xl mb-4">📈</div>
                        <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
                        <p className="text-gray-600">
                            Access opportunities that help you advance your professional career to the next level.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-5xl mb-4">🔔</div>
                        <h3 className="text-xl font-semibold mb-3">Job Alerts</h3>
                        <p className="text-gray-600">
                            Get notified about new job postings that match your profile and preferences.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">10,000+</div>
                            <div className="text-blue-100">Active Jobs</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">5,000+</div>
                            <div className="text-blue-100">Companies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50,000+</div>
                            <div className="text-blue-100">Happy Candidates</div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Join thousands of job seekers and employers today. Create your free account and start your journey!
                </p>
                {!user && (
                    <Link
                        to="/register"
                        className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Create Free Account
                    </Link>
                )}
            </section>
        </div>
    );
};

export default Home;
