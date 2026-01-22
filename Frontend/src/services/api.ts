// API Service for EmergencyHub
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: 'community' | 'volunteer' | 'agency';
    phone?: string;
    location?: {
        coordinates: number[];
        address: string;
    };
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        _id: string;
        name: string;
        email: string;
        role: string;
        token: string;
        location?: any;
        phone?: string;
        verificationStatus?: string;
    };
    error?: string;
}

// Register new user
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store token in localStorage
        if (data.data?.token) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Login user
export const loginUser = async (credentials: LoginData): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token in localStorage
        if (data.data?.token) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};
