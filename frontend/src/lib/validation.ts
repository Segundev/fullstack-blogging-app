export function validateEmail(email: string): boolean {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
	return password.length >= 8;
}

export function validateUsername(username: string): boolean {
	const re = /^[a-zA-Z0-9_]{3,20}$/;
	return re.test(username);
}

export function validateFullName(fullName: string): boolean {
	return fullName.trim().length > 0;
}
