import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
//SHAUNS CODE
import { goto } from '$app/navigation';
import { loggedIn } from '../stores/store';

const emptyAuth = {
	token: '',
	user: ''
};

export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	//SHAUNS CODE
	loggedIn.update((value) => {
		return false;
	});
	goto('/users/new');

	//SHAUNS CODE

	return true;
}

// original authenticate uer function
export async function authenticateUser(email, password) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	const res = await resp.json();

	if (resp.status == 200) {
		// const res = await resp.json();
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.accessToken, // here i put access token
				// refreshToken: res.refreshToken,
				user: res.userId
			})
		);
		//shauns code
		loggedIn.update((value) => {
			return true;
		});
		goto('/');
		// shaun's code
		return {
			success: true,
			res: res
		};
	} else {
		return {
			success: false,
			res: res // so when our user has correct format, but wrong email, res is object with the error
		};
	}
}

export function getAccessTokenFromLocalStorage() {
	let auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}
