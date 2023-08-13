import {
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebaseClient';

type Project = {
  ownerId: string;
  name: string;
  kind: string;
  isPublic: boolean;
  invitePassword: string;
  expiration: Date | null;
};

export const createProjectHandler = async (
  project: Project
) => {
  try {
    const ref = doc(collection(db, 'projects'));
    const id = ref.id;

    await setDoc(ref, {
      id,
      ...project,
    });

    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
