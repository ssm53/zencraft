<script>
	import { getUserId } from '../../utils/auth';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';

	const userId = getUserId();

	async function checkout(id) {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/create-checkout-session', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const res = await resp.json();
		if (res.status == 'success') {
			// Payment was successful, redirect to the session URL
			goto(res.url);
			// here we do api call to increment no of prompts remaining for this user by 50
			const resp2 = await fetch(`${PUBLIC_BACKEND_BASE_URL}` + `/inc-prompts-remaining/${userId}`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
					// Authorization: getAccessTokenFromLocalStorage()
				}
			});
		} else {
			goto(res.url);
		}
	}
</script>

<body>
	<form action="/create-checkout-session" method="POST">
		<button type="submit" on:click={checkout(userId)}>Pay now</button>
	</form>
</body>
