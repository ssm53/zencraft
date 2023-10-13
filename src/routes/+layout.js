export const ssr = false;

import { isLoggedIn } from '../utils/auth';
import { getUserId } from '../utils/auth';
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { totalPrompts } from '../stores/store'; // NEW

let hasCheckedLoggedIn = false; // Add this flag
// export let _totalPrompts; // TESTING

export async function load() {
	if (!hasCheckedLoggedIn) {
		// Check if isLoggedIn has been called before
		await isLoggedIn();

		hasCheckedLoggedIn = true; // Set the flag to true to prevent further calls
	}

	const userId = getUserId();

	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/no-of-prompts/${userId}`, {
		method: 'GET'
	});

	const res = await resp.json();
	// NEW
	const newTotalPrompts = Number(res.promptNumber);
	totalPrompts.set(newTotalPrompts); // Update the store with the new value

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

// CALCULATE PROMPTS
// need to add no of prompts in user table..
// find a way to calculate prompts

// PAYMENT
// once prompts are expired, you cannot make anymore api requests.
// if you try to do it, it will redirect you to payment page.
// for you to pay RM100 for a 100 prompts. once that 100 prompts, finishes, you then need to pay again

// STYLE HEADER

// further things
// need to allow doanloads everywhere
// need to do number of prompts
// make sure to do rediret and shit
// alerts
// need to ensure default option is 256x156 or size buttons and also its colour in image generation
