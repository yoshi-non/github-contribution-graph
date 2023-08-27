import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebaseClient';

type ShowUser = {
  projectId: string;
  githubUserId: string;
  color: string;
};

export const createShowUserHandler = async (
  showUser: ShowUser,
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
