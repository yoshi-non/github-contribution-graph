import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import { ShowUserType } from '@/types/ShowUserType';

export const getShowUsersHandler = (projectId: string) => {
  try {
    const docRef = query(
      collection(db, `showUsers`),
      where('projectId', '==', projectId)
    );
    const fetchShowUsersHandler = async () => {
      const results: ShowUserType[] = [];
      const snapshot = await getDocs(docRef);
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        } as ShowUserType);
      });
      return results;
    };
    return fetchShowUsersHandler();
  } catch (error) {
    console.log('Error getting document:', error);
  }
};
