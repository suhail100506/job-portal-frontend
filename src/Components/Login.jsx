import { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-content-wrapper">
                {/* Left Side - Login Form */}
                <div className="auth-card">
                    <h2 className="auth-title">Sign in</h2>

                    {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-form-group">
                            <label className="auth-label">Your email</label>
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Your password</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Submit
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </div>

                {/* Right Side - Branding/Text */}
                <div className="auth-text-section">
                    <h1 className="auth-heading">Build your dream team with our Job Portal</h1>
                    <p className="auth-description">
                        Connect with top talent and streamline your recruitment process efficiently.
                    </p>

                    <div className="auth-brand-pill">
                        Recruiter Platform
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;