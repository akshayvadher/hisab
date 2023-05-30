import type { UploadMetadata } from 'firebase/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '$lib/firebase/firebase';


async function upload(path: string, file: Blob | ArrayBuffer, metadata?: UploadMetadata) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, file, metadata);
  return uploadTask.ref.fullPath;
}

export const PROFILE_PHOTO_PATH = 'profilePhotos/';
export const uploadProfilePhoto = async (userId: string, photo: Blob) => {
  const path = PROFILE_PHOTO_PATH + userId + '.jpg';
  return await upload(path, photo);
};

export const TRANSACTION_DOC_PATH = `transactionDocs/`;
export const uploadTransactionDoc = async (transactionId: string, fileNameWithExt: string, file: Blob | ArrayBuffer, metadata?: UploadMetadata) => {
  // TODO why does files care about path? Probably caller should know this.
  const path = `${TRANSACTION_DOC_PATH}${transactionId}/${fileNameWithExt}`;
  return await upload(path, file, metadata);
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
