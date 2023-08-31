import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import {
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { useRecoilState } from 'recoil';
import { githubUsers } from '@/store/atoms';
import { githubUsersState } from '@/store/githubUsersAtom';
import { ShowUserType } from '@/types/ShowUserType';
import { useState } from 'react';
import InputColor from 'react-input-color';

const styles = {
  memberBody: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-top: none;
    background-color: #f2f2f2;
  `,
  userInfo: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      border-radius: 50%;
    }
  `,
  githubUserLink: css`
    font-weight: bold;
    font-size: 1.1rem;
    color: #1f6feb;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  githubUserName: css`
    font-size: 0.9rem;
    color: #7d8590;
  `,
  memberSettingButtonBox: css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  changeColorButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  deleteButton: css`
    width: 35px;
    height: 35px;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
};

type Props = {
  props: {
    showUser: ShowUserType;
  };
};

const ShowUser = ({ props }: Props) => {
  const { showUser } = props;
  const [githubUserList, setGitHubUserList] =
    useRecoilState<githubUsers>(githubUsersState);

  type Color = {
    a: number;
    b: number;
    g: number;
    h: number;
    hex: string;
    r: number;
    rgba: string;
    s: number;
    v: number;
  };

  const [color, setColor] = useState<Color>();

  const changeColorShowUser = async () => {
    const ref = doc(db, `showUsers/${showUser.id}`);
    await updateDoc(ref, {
      color: color?.hex,
    });
  };

  const deleteShowUser = async (showUserId: string) => {
    const ref = doc(db, `showUsers/${showUserId}`);
    await deleteDoc(ref);
  };
  return (
    <div css={styles.memberBody}>
      <div css={styles.userInfo}>
        <Image
          src={
            githubUserList.find(
              (user) => user.id == showUser.githubId
            )?.avatarUrl || '/images/defaultUserIcon.png'
          }
          alt={'github user icon'}
          height={48}
          width={48}
        />
        <div>
          <Link
            href={`https://github.com/${showUser.githubId}`}
            css={styles.githubUserLink}
          >
            {githubUserList.find(
              (user) => user.id == showUser.githubId
            )?.name || showUser.githubId}
          </Link>
          <p css={styles.githubUserName}>
            {showUser.githubId}
          </p>
        </div>
      </div>
      <div css={styles.memberSettingButtonBox}>
        <button
          css={[styles.changeColorButton]}
          onBlur={() => changeColorShowUser()}
        >
          <InputColor
            initialValue={showUser.color}
            onChange={setColor}
          />
        </button>
        <button
          css={styles.deleteButton}
          onClick={() => deleteShowUser(showUser.id)}
        >
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};

export default ShowUser;