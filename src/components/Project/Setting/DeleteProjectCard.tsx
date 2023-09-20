import { db } from '@/lib/firebaseClient';
import { css } from '@emotion/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const styles = {
  container: css`
    margin: 2rem;
  `,
  title: css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `,
  dangerWrapper: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #631c03;
    border-radius: 10px;
  `,
  deleteProjectWrapper: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  dangerButton: css`
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
    background-color: #26262d;
    color: #f85149;
    transition: all 0.2s;
    &:hover {
      background-color: #f85149;
      color: #fff;
    }
  `,
};

type Props = {
  projectId: string;
};

const DeleteProjectCard = ({ projectId }: Props) => {
  const router = useRouter();
  const deleteProjectHandler = async () => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      console.log(error);
    }
    router.push('/project-list');
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>Danger Zone</h2>
      <div css={styles.dangerWrapper}>
        <div css={styles.deleteProjectWrapper}>
          <div>
            <h3>Delete Account</h3>
            <p>
              Once you delete your account, there is no
              going back. Please be certain.
            </p>
          </div>
          <button
            onClick={deleteProjectHandler}
            css={styles.dangerButton}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectCard;
