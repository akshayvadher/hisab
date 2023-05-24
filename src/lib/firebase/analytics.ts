import { getAnalytics } from 'firebase/analytics';
import { app } from '$lib/firebase/firebase';

export const analytics = getAnalytics(app); // this creates issue saying windows is not defined
