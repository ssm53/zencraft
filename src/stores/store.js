import { writable } from 'svelte/store';

export const prompt = writable('');

export const answer = writable('');

export const loading = writable(false);
