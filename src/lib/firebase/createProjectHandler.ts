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

    await setDoc(ref, project);

    console.log('Document successfully written!');
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
