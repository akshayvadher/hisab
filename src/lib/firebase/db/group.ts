import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { Group } from '$lib/dto/group';

const GROUP_DB = 'group';

export async function save(group: Group) {
  const groupDoc = doc(db, GROUP_DB, group.id);
  await setDoc(groupDoc, group);
  return group;
}

export async function get(id: string) {
  const groupDoc = doc(db, GROUP_DB, id);
  const groupSnap = await getDoc(groupDoc);
  if (!groupSnap.exists()) {
    throw new Error('Group not found');
  }
  return groupSnap.data() as Group;
}

export async function getAll() {
  const groupCollection = collection(db, GROUP_DB);
  const groupSnap = await getDocs(groupCollection);
  return groupSnap.docs.map((doc) => doc.data() as Group);
}

export async function deleteGroup(id: string) {
  const groupDoc = doc(db, GROUP_DB, id);
  await deleteDoc(groupDoc);
}
