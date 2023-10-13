import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getUserId } from '../../utils/auth';
import { redirect } from '@sveltejs/kit';

// here our main aim is to get generated images by userid to display their images in the mylibrary page
let userId;
let genImages = [];

export async function load({ fetch }) {
	userId = getUserId();

	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/my-gen-images/${userId}`, {
		method: 'GET'
	});

	const res = await resp.json();

	// added this for redirect
	if (res.userId != userId) {
		throw redirect(307, `/`);
	}

	if (resp.status === 200) {
		console.log(res);
		const resp2 = await fetch(PUBLIC_BACKEND_BASE_URL + `/my-var-images/${userId}`, {
			method: 'GET'
		});

		const res2 = await resp2.json();
		console.log(res2);

		return {
			genImages: res.myGenImages,
			varImages: res2.myVarImages
		};
	} else {
		return {
			genImages: [],
			varImages: []
		};
	}
}
