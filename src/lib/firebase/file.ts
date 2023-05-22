import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '$lib/firebase/firebase';

export const uploadProfilePhoto = async (userId: string, photo: Blob) => {
  const storageRef = ref(storage, 'profilePhotos/' + userId + '.jpg');
  const uploadTask = await uploadBytes(storageRef, photo);
  return uploadTask.ref.fullPath;
};
