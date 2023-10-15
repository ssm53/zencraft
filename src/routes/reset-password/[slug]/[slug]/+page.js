import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/reset-password/${params.slug}`);

	const res = await resp.json();
	console.log(res.userId);

	if (resp.status == 200) {
		return {
			userId: res.userId
		};
	} else {
		return {
			error: res.error
		};
	}
}
