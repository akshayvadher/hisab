import { getContext, setContext } from 'svelte';
import type { User } from '$lib/dto/user';

export const getAuthContext = () => getContext('auth');
export const setAuthContext = (user: User) => setContext('auth', user);
