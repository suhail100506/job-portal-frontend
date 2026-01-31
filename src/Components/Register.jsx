import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

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
        <div className="auth-page-container">
            <div className="auth-content-wrapper">
                {/* Left Side - Register Form */}
                <div className="auth-card">
                    <h2 className="auth-title">Sign up for free</h2>

                    {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-form-group">
                            <label className="auth-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Your email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Your password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                className="auth-input"
                                required
                                minLength="6"
                            />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">I am a</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="auth-input"
                            >
                                <option value="jobseeker">Job Seeker</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="employer">Company/Employer</option>
                            </select>
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Submit
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </div>
                </div>

                {/* Right Side - Branding/Text */}
                <div className="auth-text-section">
                    <h1 className="auth-heading">Build your own job portal with Jooba</h1>
                    <p className="auth-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <div className="auth-brand-pill">
                        Get on Webflow
                    </div>

                    <div className="auth-testimonial">
                        <div className="auth-testimonial-logo">
                            <span>✨ Sitemark</span>
                        </div>
                        <p className="auth-quote">
                            "Working with the Jooba template has been a breeze from start to finish."
                        </p>
                        <div className="auth-user-info">
                            <div className="auth-avatar" style={{ backgroundColor: '#ccc' }}></div>
                            <span>Gianna Johnson @Sitemark</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;