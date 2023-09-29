import { db } from '@/lib/firebaseClient';
import { doc, updateDoc } from 'firebase/firestore';

export const useUpdateIsPublic = async (
  projectId: string,
  isPublic: boolean
) => {
  const ref = doc(db, `projects/${projectId}`);
  await updateDoc(ref, {
    isPublic,
  });
};
