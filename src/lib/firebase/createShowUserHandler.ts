import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebaseClient';
import { NonIdShowUserType } from '@/types/ShowUserType';

export const createShowUserHandler = async (
  showUser: NonIdShowUserType,
  router: ReturnType<typeof useRouter>
) => {
  try {
    // Firestoreクエリを作成して、projectIdとgithubIdの両方が一致するデータがあるか確認
    const q = query(
      collection(db, 'showUsers'),
      where('projectId', '==', showUser.projectId),
      where('githubId', '==', showUser.githubId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // 一致するデータが存在しない場合のみデータを追加
      const ref = doc(collection(db, 'showUsers'));
      await setDoc(ref, showUser);
      await router.push(
        `/project?id=${showUser.projectId}`
      );
    } else {
      // 一致するデータが存在する場合の処理をここに追加（エラーメッセージ表示など）
      console.error(
        'Data with the same projectId and githubId already exists.'
      );
    }
  } catch (error) {
    console.error('Error writing document:', error);
  }
};
