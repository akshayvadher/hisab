import { doc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { UserCredential } from 'firebase/auth';

export async function saveUser(result: UserCredential, photoUrl: string) {
  const user = {
    name: result.user.displayName,
    email: result.user.email,
    authUid: result.user.uid,
    providerUid: result.user.providerData[0].uid,
    photoUrl,
  };
  const userDoc = doc(db, 'user', user.authUid);
  await setDoc(userDoc, user);
}
