import { writable } from 'svelte/store';
import type { Group } from '$lib/dto/group';

export const groupStore = writable<Group[]>([]);
