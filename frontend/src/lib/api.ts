import { browser } from '$app/environment';

const BASE_URL = 'http://api.jayesegun.tech'; // Replace with your actual API URL

async function sendRequest<T = unknown>(endpoint: string, method: string = 'GET', data?: T) {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'X-CSRF-Token': browser ? document.cookie.split('=')[1] : '' // Assuming CSRF token is in a cookie
		},
		credentials: 'include' // This is important for handling cookies
	};

	if (data) {
		options.body = JSON.stringify(data);
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, options);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'An error occurred');
	}

	return response.json();
}

interface SignupData {
	email: string;
	password: string;
	fullName?: string;
	// Add other relevant fields
	username: string; // Add this line
}

export const api = {
	login: (email: string, password: string) => sendRequest('/auth/login', 'POST', { email, password }),
	signup: (userData: SignupData) => sendRequest('/auth/signup', 'POST', userData),
	logout: () => sendRequest('/auth/logout', 'POST'),
	getCurrentUser: () => sendRequest('/auth/me')
};
