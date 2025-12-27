import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Register</h2>
                {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                        minLength="6" 
                    />
                    <select 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="jobseeker">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                    <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 font-semibold transition-colors">Register</button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;