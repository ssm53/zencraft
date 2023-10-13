// links to use for image variation
// 1. https://github.com/LearnWebCode/gpt-nextjs-example/blob/main/pages/api/get-painting.js
// 2. https://www.npmjs.com/package/openai
// 3. https://platform.openai.com/docs/guides/images/usage
// 4. https://platform.openai.com/docs/api-reference/images/object
// 5. https://www.youtube.com/watch?v=RA0C_Hh9g8Q&ab_channel=LearnWebCode

// links for image edit
// 1. https://medium.com/@david.richards.tech/how-to-create-openai-dall-e-mask-images-ed8feb562eba
// 2. https://ai-image-editor.netlify.app/

// GATHER EVERYTHING TOGETHER
// THINGS TO DO
// 1. sendgrid email sending for users who are signed up
// 2. better styling for navbar, hover buttons etc
// 3. should do default size (if user doesnt choose size, it will be 512 x 512)
// 4. in the grid lines, make sure to say youre images wll appear here (like gencraft)

// NEXT UP
// CALCULATE PROMPTS
// need to add no of prompts in user table..

//STEPS
// add no of prompts field to user table - DONE
// each time a prompt is successful, we do an api call to backend... in the backend, we add the noofprompts field of that user by 1 - DONE
// so in our header.svelte, we do an api request to get the no of prompts done by each user - DONE
// we then subtract that number from 5 to display the no of prompts remaining in our header.
// issue here is that when new user logs in, it doesnt automatically change the prompts remaining.. that means we need to do this in the authenticate user function... maybe we gotta do that noofprompts api request in our authenticate user function
