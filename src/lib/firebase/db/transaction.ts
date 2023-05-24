import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { Transaction } from '$lib/dto/transaction';

const TRANSACTION_DB = 'transaction';

export async function save(transaction: Transaction) {
  const transactionDoc = doc(db, TRANSACTION_DB, transaction.id);
  await setDoc(transactionDoc, transaction);
  return transaction;
}

export async function get(id: string) {
  const transactionDoc = doc(db, TRANSACTION_DB, id);
  const transactionSnap = await getDoc(transactionDoc);
  if (!transactionSnap.exists()) {
    throw new Error('Transaction not found');
  }
  return transactionSnap.data() as Transaction;
}

export async function getAll(groupId: string) {
  const transactionCollection = collection(db, TRANSACTION_DB);
  const transactionSnap = await getDocs(transactionCollection);
  const transactions = transactionSnap.docs.map((doc) => doc.data() as Transaction);
  return transactions.filter(transaction => transaction.groupId === groupId); // TODO you know what
}

export async function deleteGroup(id: string) {
  const transactionDoc = doc(db, TRANSACTION_DB, id);
  await deleteDoc(transactionDoc);
}
