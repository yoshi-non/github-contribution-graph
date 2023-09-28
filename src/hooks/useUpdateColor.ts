import { db } from '@/lib/firebaseClient';
import { ShowUserType } from '@/types/ShowUserType';
import { doc, updateDoc } from 'firebase/firestore';

export const useUpdateColor = async (
  user: ShowUserType,
  color: string
) => {
  const ref = doc(db, `showUsers/${user.id}`);
  await updateDoc(ref, {
    color,
  });
};
