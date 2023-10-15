export const ssr = false;

import { isLoggedIn } from '../utils/auth';
import { getUserId } from '../utils/auth';
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
// import { totalPrompts } from '../stores/store'; // NEW
import { promptsRem } from '../stores/store';

let hasCheckedLoggedIn = false;
// export let _totalPrompts; // TESTING

export async function load() {
	if (!hasCheckedLoggedIn) {
		// Check if isLoggedIn has been called before
		await isLoggedIn();

		hasCheckedLoggedIn = true; // Set the flag to true to prevent further calls
	}

	// NEW
	const userId = getUserId();

	if (userId) {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/prompts-remaining/${userId}`, {
			method: 'GET'
		});

		const res = await resp.json();
		// NEW
		const newPromptsRem = Number(res.promptsRemaining);
		promptsRem.set(newPromptsRem); // Update the store with the new value
	} else {
		console.log('not signed up yet');
	}

	// old style which worked TESTING
	// if (resp.status === 200) {
	// 	_totalPrompts = Number(res.promptNumber);
	// } else {
	// 	console.log('cannot get no of prompts');
	// }
}

// async function getNoOfPrompts() {
// 	const userId = getUserId();

// 	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/no-of-prompts/${userId}`, {
// 		method: 'GET'
// 	});

// 	const res = await resp.json();
// 	console.log(res);
// 	console.log(typeof res);

// 	if (resp.status === 200) {
// 		_totalPrompts = Number(res.promptNumber);
// 	} else {
// 		console.log('cannot get no of prompts');
// 	}
// }

// GENCRAFT CLONE PLAN
// of course styling needs to be done

// MAIN PAGE (basic done)
// they need to be able to publish this shit into the search page
// they need to be able to download it

// VARIATION PAGE (basic done)
// need to do check for sizes for uploaded image

// EDIT PAGE (basic done)
// check why doesnt it work with our 512 images... atm, only can work with 1024 images
// need to check for uploaded image size

// HEADER (basic done)
// need to do prompts, and dropdown menu, and icons from daisyui
// for this, we need to add no of prompts done in our user table

//BACKEND PRISMA (basic done)
// need to have seperate tables for generate image, image variations and also image edits, together with the prompts

// BACKEND ENDPOINTS (basic done)
// need to check for edit images process, cause for now, we can only fo the images w 1024 1024 size.. i mean maybe not cause of sixe, but when i tried to do w new mask images, it didnt work

// MY LIBRARY PAGE (basic done)
// IMPORTANT: need to ensure how to display edit image part

// DOWNLOADS (basic done)
// need to do for edit images mylibarry part

// CALCULATE PROMPTS HEADER (basic done)
// issue is it autmatically updates only when you load it... not instantly, without loading

// PAYMENT (done)
// once prompts are expired, you cannot make anymore api requests.
// if you try to do it, it will redirect you to payment page.
// for you to pay RM100 for a 100 prompts. once that 100 prompts, finishes, you then need to pay again

// ERROR HANDLING (login, signup, and check sizes) (basic done)
// small issue with login error handling.. dk if formErrors is an object or a string, but still sorta works

// further things
// do forgot password/username
// style header
// better styling for buttons etc.
// need to ensure default option is 256x156 or size buttons and also its colour in image generation
// sendgrid email sending
// in the grid lines, make sure to say youre images wll appear here (like gencraft)
// properly try out edit images with 512 x 512 and proper mask image
// other alerts
// redirect and auth
