import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { useRecoilState } from 'recoil';
import { ShowUserType } from '@/types/ShowUserType';
import { useState } from 'react';
import InputColor from 'react-input-color';
import { memberCountState } from '@/store/memberCountAtoms';
import { useUpdateColor } from '@/hooks/useUpdateColor';
import { githubUsers } from '@/types/GitHubApiType';
import { Tooltip } from '@mui/material';

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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    .css-cnfek5-Popover {
      transform: translate3d(
        -104px,
        -342px,
        0px
      ) !important;
    }
    .css-6fii2q-Arrow {
      display: none !important;
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

const userColorCSS = (color: string) => css`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${color};
  border: 2px solid #ddd;
`;

type Props = {
  props: {
    showUser: ShowUserType;
    fetchShowUsers: ShowUserType[];
    setFetchShowUsers: React.Dispatch<
      React.SetStateAction<ShowUserType[]>
    >;
    githubUserList: githubUsers;
    isPublic?: boolean;
  };
};

const ShowUser = ({ props }: Props) => {
  const {
    showUser,
    fetchShowUsers,
    setFetchShowUsers,
    githubUserList,
    isPublic,
  } = props;
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

  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);

  const changeColorShowUser = async () => {
    setFetchShowUsers(
      fetchShowUsers.map((user) => {
        if (user.id === showUser.id) {
          return {
            ...user,
            color: color?.hex || '#fff',
          };
        }
        return user;
      })
    );
    useUpdateColor(showUser, color?.hex || '#fff');
  };

  const deleteShowUser = async (showUserId: string) => {
    const ref = doc(db, `showUsers/${showUserId}`);
    await deleteDoc(ref);
    setMemberCount(memberCount - 1);
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
      {isPublic ? (
        <div css={userColorCSS(showUser.color)}>
          {/* カラー */}
        </div>
      ) : (
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
            <Tooltip title="Delete" placement="top">
              <DeleteForeverIcon />
            </Tooltip>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
