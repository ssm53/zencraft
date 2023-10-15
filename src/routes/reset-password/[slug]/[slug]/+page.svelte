<script>
	import Spinner from '../../../../spinner/spinner.svelte';
	import { loading } from '../../../../stores/store';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { recoveryPassSuc, noUserAlert, errorResettingPassword } from '../../../../utils/alert';
	import { goto } from '$app/navigation';

	export let data;
	const userId = data.userId;

	let password = '';

	export async function handleSubmit(event) {
		event.preventDefault();
		// spinner shit
		loading.update((value) => {
			return true;
		});

		password = event.target.password.value;

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/reset-password/${userId}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ newPassword: password })
		});

		const res = await resp.json();
		// have to change below
		if (resp.status == 200) {
			// spinner shits
			loading.update((value) => {
				return false;
			});
			recoveryPassSuc();
			goto('/sign-in');
		} else if (resp.status == 400) {
			// spinner shits
			loading.update((value) => {
				return false;
			});
			noUserAlert();
		} else {
			// spinner shits
			loading.update((value) => {
				return false;
			});
			errorResettingPassword();
			// if (res.error) {
			// 	formErrors = res.error; // Update formErrors with validation errors
			// }
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<Spinner />
	<div class="max-w-md w-full space-y-8">
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png"
				alt="Logo"
			/>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit={handleSubmit}>
			<input type="hidden" name="remember" value="true" />
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="password" class="sr-only">New Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="New password"
					/>
					<!-- {#if 'email' in formErrors}
						<p class="text-red-500 text-sm mt-1">{formErrors['email']}</p>
					{/if} -->
				</div>
			</div>
			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M12 2a2 2 0 012 2v5.586l1.293-1.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 7.586V2a2 2 0 012-2zM4 9v9a2 2 0 002 2h8a2 2 0 002-2V9H4z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Set your new password
				</button>
			</div>
		</form>
	</div>
</div>
