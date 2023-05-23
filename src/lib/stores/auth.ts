import { writable } from 'svelte/store';
import type { User } from '$lib/dto/user';

export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}

export const authStore = writable<Auth>({
  user: null,
  isAuthenticated: false,
});
