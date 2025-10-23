import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			verifyToken(savedToken);
		} else {
			setLoading(false);
		}
	}, []);

	const verifyToken = async (token) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/auth/verify`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setUser(response.data.user);
			setToken(token);
			setLoading(false);
		} catch (error) {
			console.log('Token nieważny, wylogowanie');
			logout();
		}
	};

	const login = (token, userData) => {
		localStorage.setItem('token', token);
		setToken(token);
		setLoading(true);
		verifyToken(token);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
	};

	const value = {
		user,
		token,
		login,
		logout,
		isAuthenticated: !!user,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
