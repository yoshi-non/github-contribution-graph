import { db } from '@/lib/firebaseClient';
import { css } from '@emotion/react';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const styles = {
  container: css`
    margin: 2rem;
  `,
  title: css`
    padding: 0 0 16px 0;
    border-bottom: 1px solid #c9d1d9;
  `,
  subTitle: css`
    font-size: 1.2rem;
    margin: 1rem 1rem 1rem 0rem;
  `,
  inputWrapper: css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  projectNameInput: css`
    width: 300px;
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
    outline: none;
    &:focus {
      border: 2px solid #1f6feb;
    }
  `,
  button: css`
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
    background-color: #39d353;
    color: #fff;
    transition: all 0.2s;
    &:hover {
      border: 2px solid #006d32;
    }
  `,
};

type Props = {
  projectId: string;
  crrPath?: string;
};

const ChangeProjectNameCard = ({
  projectId,
  crrPath,
}: Props) => {
  const router = useRouter();

  const [projectName, setProjectName] =
    useState<string>('');

  useEffect(() => {
    if (crrPath == undefined) {
      crrPath = '';
    }
    setProjectName(crrPath);
  }, [router, crrPath]);

  const updateProjectNameHandler = async (
    newProjectName: string
  ) => {
    if (!projectId) return;
    if (!newProjectName || newProjectName == '') return;
    const ref = doc(db, `projects/${projectId}`);
    await updateDoc(ref, { name: newProjectName });
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>General</h2>
      <div>
        <h3 css={styles.subTitle}>Project Name</h3>
        <div css={styles.inputWrapper}>
          <input
            css={styles.projectNameInput}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="プロジェクト名"
          />
          <button
            css={styles.button}
            onClick={() =>
              updateProjectNameHandler(projectName)
            }
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProjectNameCard;
