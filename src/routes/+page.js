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
// PAYMENT
// once prompts are expired, you cannot make anymore api requests.
// if you try to do it, it will redirect you to payment page w an alert
// for you to pay RM100 for a 100 prompts. once that 100 prompts, finishes, you then need to pay again

// STEPS
// for gen/var and edit, in the same function, we should do an api call to get noofprompts.
// if noofprompts >= 1, then we can do api call, else goto (payment page)

// lets try it for generate
