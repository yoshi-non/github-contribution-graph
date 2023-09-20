import { css } from '@emotion/react';
import Image from 'next/image';
import { useAuth } from '@/context/auth';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { useRouter } from 'next/router';

const styles = {
  container: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  `,
  crrPathWrapper: css`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-left: 1rem;
    display: flex;
  `,

  homeLink: css`
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  projectNameInput: css`
    color: #7d8590;
    min-width: 100px;
    max-width: 300px;
    overflow: hidden;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.2s;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    outline: 1px solid transparent;
    &:hover {
      outline: 1px solid #ddd;
    }
    &:focus {
      outline: 1px solid #ddd;
    }
    &::placeholder {
      color: #c6c6c6;
    }
  `,
  linkWrapper: css`
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ddd;
      padding: 0 0.8rem;
      &:last-child {
        border-right: none;
      }
    }
  `,
  accountButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  searchButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    &:hover svg {
      transition: all 0.2s;
      color: #a371f7;
    }
  `,
  searchIcon: css`
    color: #333;
    font-size: 2rem;
  `,
};

type Props = {
  crrPath?: string;
};

const Topbar = ({ crrPath }: Props) => {
  const { fbUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [projectName, setProjectName] =
    useState<string>('');

  useEffect(() => {
    if (crrPath == undefined) {
      crrPath = '';
    }
    setProjectName(crrPath);
  }, [fbUser, router, crrPath]);

  const updateProjectName = async (
    newProjectName: string
  ) => {
    if (!id) return;
    if (!newProjectName || newProjectName == '') return;
    const ref = doc(db, `projects/${id}`);
    await updateDoc(ref, { name: newProjectName });
  };

  return (
    <div css={styles.container}>
      <div css={styles.crrPathWrapper}>
        <Link href={'/project-list'}>
          <p css={styles.homeLink}>MY FILES</p>
        </Link>
        {id && (
          <div>
            <span>&nbsp;/&nbsp;</span>
            <input
              css={styles.projectNameInput}
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
              onBlur={(e) => {
                updateProjectName(e.target.value);
              }}
              placeholder="プロジェクト名"
            />
          </div>
        )}
      </div>
      <div css={styles.linkWrapper}>
        {fbUser?.photoURL && (
          <div>
            <Link
              href={'/profile'}
              css={styles.accountButton}
            >
              <Image
                src={fbUser?.photoURL}
                alt={'githubアカウントのアイコン'}
                height={35}
                width={35}
              />
            </Link>
          </div>
        )}
        <div>
          <button css={styles.searchButton}>
            <SearchIcon css={styles.searchIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
