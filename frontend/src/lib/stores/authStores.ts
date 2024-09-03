import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { api } from '$lib/api';

const storedUser = browser ? JSON.parse(localStorage.getItem('user') || 'null') : null;
export const user = writable(storedUser);
export const isLoading = writable(false);

export async function login(email: string, password: string) {
	isLoading.set(true);
	try {
		const userData = await api.login(email, password);
		user.set(userData);
		if (browser) {
			localStorage.setItem('user', JSON.stringify(userData));
		}
	} finally {
		isLoading.set(false);
	}
}

export const signup = async ({ fullName, username, email, password }: {
	fullName: string;
	username: string;
	email: string;
	password: string;
}) => {
	isLoading.set(true);
	try {
		const newUser = await api.signup({ email, password, username, fullName });
		user.set(newUser);
		if (browser) {
			localStorage.setItem('user', JSON.stringify(newUser));
		}
	} finally {
		isLoading.set(false);
	}
}

export async function logout() {
	isLoading.set(true);
	try {
		await api.logout();
		user.set(null);
		if (browser) {
			localStorage.removeItem('user');
		}
	} catch {
		user.set(null);
		localStorage.removeItem('user');
	} finally {
		isLoading.set(false);
	}
}

export async function checkAuth() {
	if (!browser) return;

	isLoading.set(true);
	try {
		const userData = await api.getCurrentUser();
		user.set(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	} catch {
		user.set(null);
		localStorage.removeItem('user');
	} finally {
		isLoading.set(false);
	}
}
