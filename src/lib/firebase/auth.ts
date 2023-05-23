import { OAuthCredential, OAuthProvider, signInWithPopup, type UserCredential } from 'firebase/auth';
import { firebaseAuth } from '$lib/firebase/firebase';
import { lookupMsAzureProfilePhoto } from '$lib/firebase/azure';
import { uploadProfilePhoto } from '$lib/firebase/file';
import { saveLoginResultUser } from '$lib/firebase/db/user';

function getProvider() {
  const provider = new OAuthProvider('microsoft.com');
  provider.setCustomParameters({
    tenant: import.meta.env.VITE_MICROSOFT_TENANT_ID,
  });
  provider.addScope('https://graph.microsoft.com/User.Read');
  // add avatar scope
  provider.addScope('https://graph.microsoft.com/User.ReadBasic.All');
  return provider;
}

async function getPhoto(result: UserCredential) {
  const { accessToken } = OAuthProvider.credentialFromResult(result) as OAuthCredential;

  const photo = await lookupMsAzureProfilePhoto(accessToken as string);
  return await uploadProfilePhoto(result.user.uid, photo);
}

export async function login() {
  const provider = getProvider();
  const result = await signInWithPopup(firebaseAuth, provider);

  const photoUrl = await getPhoto(result);

  return saveLoginResultUser(result, photoUrl);
}

export async function logout() {
  await firebaseAuth.signOut();
}
