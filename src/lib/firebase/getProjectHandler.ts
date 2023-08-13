import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebaseClient';

export const getProjectHandler = async (userId: string) => {
  try {
    const docRef = query(
      collection(db, `projects`),
      where('userId', '==', userId)
    );
    getDocs(docRef).then((snapshot) => {
      let results: any[] = [];

      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      return results;
    });
  } catch (error) {
    console.log('Error getting document:', error);
  }
};
