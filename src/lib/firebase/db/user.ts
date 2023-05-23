import type { UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { User } from '$lib/dto/user';

const USER_DB = 'user';

export async function saveUser(result: UserCredential, photoUrl: string) {
  if (!result.user.displayName || !result.user.email || !result.user.uid) throw new Error('Invalid user data');
  const user: User = {
    name: result.user.displayName,
    email: result.user.email,
    authUid: result.user.uid,
    providerUid: result.user.providerData[0]?.uid,
    photoUrl,
  };
  const userDoc = doc(db, USER_DB, user.authUid);
  await setDoc(userDoc, user);
  return user;
}

export async function getUser(authUid: string) {
  const userDoc = doc(db, USER_DB, authUid);
  const userSnap = await getDoc(userDoc);
  if (!userSnap.exists()) {
    throw new Error('User not found');
  }
  return userSnap.data() as User;
}
