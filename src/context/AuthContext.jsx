import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await API.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user); // Backend returns { success: true, user: {...} }
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await API.post('/auth/login', {
                email,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return { success: true, user };
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                'Login failed';
            return {
                success: false,
                message: errorMessage
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await API.post('/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                'Registration failed';
            return {
                success: false,
                message: errorMessage
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
