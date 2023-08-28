import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebaseClient';
import { NonIdShowUserType } from '@/types/ShowUserType';

export const createShowUserHandler = async (
  showUser: NonIdShowUserType,
  router: ReturnType<typeof useRouter>
) => {
  try {
    const ref = doc(collection(db, 'showUsers'));
    await setDoc(ref, showUser);
    await router.push(`/project?id=${showUser.projectId}`);
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
