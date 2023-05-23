import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '$lib/firebase/firebase';

export const uploadProfilePhoto = async (userId: string, photo: Blob) => {
  const storageRef = ref(storage, 'profilePhotos/' + userId + '.jpg');
  const uploadTask = await uploadBytes(storageRef, photo);
  return uploadTask.ref.fullPath;
};

const map = new Map<string, string>();
export const getProfilePhotoUrl = async (photoUrl: string) => {
  if (map.has(photoUrl)) {
    return map.get(photoUrl);
  }
  const storageRef = ref(storage, photoUrl);
  const url = await getDownloadURL(storageRef);
  map.set(photoUrl, url);
  return url;
};
