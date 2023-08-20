import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import { useRouter } from 'next/router';

type Project = {
  ownerId: string;
  name: string;
  kind: string;
  isPublic: boolean;
  invitePassword: string;
  expiration: Date | null;
};

export const createProjectHandler = async (
  project: Project,
  router: ReturnType<typeof useRouter>
) => {
  try {
    const ref = doc(collection(db, 'projects'));
    await setDoc(ref, project);
    await router.push(`/project?id=${ref.id}`);
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
