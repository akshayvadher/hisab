import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '$lib/firebase/firebase';


async function upload(path: string, photo: Blob) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, photo);
  return uploadTask.ref.fullPath;
}

export const uploadProfilePhoto = async (userId: string, photo: Blob) => {
  const path = 'profilePhotos/' + userId + '.jpg';
  return await upload(path, photo);
};

export const uploadTransactionDoc = async (transactionId: string, fileNameWithExt: string, file: Blob) => {
  // TODO why does files care about path? Probably caller should know this.
  const path = `transactionDocs/${transactionId}/${fileNameWithExt}`;
  return await upload(path, file);
};

const map = new Map<string, string>();
export const getDoc = async (photoUrl: string) => {
  if (map.has(photoUrl)) {
    return map.get(photoUrl);
  }
  const storageRef = ref(storage, photoUrl);
  const url = await getDownloadURL(storageRef);
  map.set(photoUrl, url);
  return url;
};
