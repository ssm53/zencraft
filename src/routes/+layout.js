export const ssr = false;

import { isLoggedIn } from '../utils/auth';

let hasCheckedLoggedIn = false; // Add this flag

export async function load() {
	if (!hasCheckedLoggedIn) {
		// Check if isLoggedIn has been called before
		await isLoggedIn();

		hasCheckedLoggedIn = true; // Set the flag to true to prevent further calls
	}
}

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

// MY IMAGES PAGE
// need to start creating this page

// SEARCH PAGE
// need to start creating this page

// further things
// need to allow doanloads everywhere
