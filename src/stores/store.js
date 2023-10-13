import { writable } from 'svelte/store';

export const loading = writable(false);

export const loggedIn = writable(false);

export const generateFormSubmitted = writable(false);

export const variationFormSubmitted = writable(false);

export const editFormSubmitted = writable(false);

export const genImages = writable(true);

export const varImages = writable(false);

export const editImages = writable(false);

