import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import { ProjectType } from '@/types/ProjectType';

export const getProjectHandler = async (userId: string) => {
  try {
    const results: ProjectType[] = [];
    const docRef = query(
      collection(db, `projects`),
      where('ownerId', '==', userId)
    );

    const fetchProjectsHandler = async () => {
      const snapshot = await getDocs(docRef);
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        } as ProjectType);
      });
    };
    await fetchProjectsHandler();
    return results;
  } catch (error) {
    console.log('Error getting document:', error);
  }
};
