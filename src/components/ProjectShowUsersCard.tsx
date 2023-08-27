import { css } from '@emotion/react';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import { createShowUserHandler } from '@/lib/firebase/createShowUserHandler';

const styles = {
  container: css`
    width: 100%;
    padding: 1rem;
    background-color: rgb(237, 241, 245);
  `,
  topbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  memberSearchInput: css`
    padding: 0.5rem 1rem;
    border-radius: 10px;
    outline: 1px solid transparent;
    &:hover {
      outline: 1px solid #ddd;
    }
    &:focus {
      outline: 1px solid #ddd;
    }
  `,
  buttonBox: css`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    button {
      padding: 0.5rem 1rem;
      border-radius: 10px;
      transition: all 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
  `,
  exportButton: css`
    background-color: #fff;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-weight: bold;
    svg {
      font-weight: bold;
      margin-right: 0.5rem;
      font-size: 1rem;
    }
  `,
  addMemberButton: css`
    font-weight: bold;
    background-color: #26a641;
    color: #fff;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  modal: css`
    position: absolute;
    top: 40%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: 50%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    border: 1px solid #ddd;
  `,
  modalContent: css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h2 {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }
  `,
  addMemberInputBox: css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  addMemberInput: css`
    width: 100%;
    padding: 0.5rem 1rem;
    outline: 1px solid #ddd;
    border-radius: 10px;
  `,
  closeButton: css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  memberWrapper: css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  `,
  memberHead: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 1px solid #ddd;
    font-weight: bold;
  `,
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
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: red;
    border: 1px solid #ddd;
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

const ProjectShowUsersCard = () => {
  const router = useRouter();
  const { id } = router.query;
  const { fbUser, isLoading } = useAuth();

  const [addMemberModalIsOpen, setAddMemberModalIsOpen] =
    useState<boolean>(false);
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [githubUserId, setGithubUserId] =
    useState<string>('');
  const addMemberHandler = () => {
    if (!fbUser) return;
    if (id === undefined) return;
    if (githubUserId === '') return;
    const showUser = {
      projectId: id as string,
      githubUserId: githubUserId,
      color: '#fff',
    };
    createShowUserHandler(showUser, router);
    setAddMemberModalIsOpen(false);
  };

  const closeAddMemberModal = () => {
    setAddMemberModalIsOpen(false);
    setGithubUserId('');
  };

  return (
    <div css={styles.container}>
      <div css={styles.topbar}>
        <div css={styles.memberSearchInput}>
          {/* <input
            type="text"
            placeholder="Find a member..."
          /> */}
        </div>
        <div css={styles.buttonBox}>
          <button css={styles.exportButton}>
            <SystemUpdateAltIcon />
            <span>Export</span>
          </button>
          <button
            css={styles.addMemberButton}
            onClick={() => setAddMemberModalIsOpen(true)}
          >
            Add Member
          </button>
          <Modal
            isOpen={addMemberModalIsOpen}
            onRequestClose={closeAddMemberModal}
            appElement={
              typeof window !== 'undefined'
                ? (document.getElementById(
                    '__next'
                  ) as HTMLElement)
                : undefined
            }
            css={styles.modal}
          >
            <div css={styles.modalContent}>
              <h2>Add Member to {fetchProject?.name}</h2>
              <div css={styles.addMemberInputBox}>
                <input
                  css={styles.addMemberInput}
                  placeholder="GitHub User Id"
                  type="text"
                  onChange={(e) =>
                    setGithubUserId(e.target.value)
                  }
                  value={githubUserId}
                />
                <button
                  css={styles.addMemberButton}
                  onClick={addMemberHandler}
                >
                  Add
                </button>
              </div>
              <button
                onClick={closeAddMemberModal}
                css={styles.closeButton}
              >
                <CloseIcon />
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <div css={styles.memberWrapper}>
        <div css={styles.memberHead}>
          <span>Members</span>
        </div>
        <div css={styles.memberBody}>
          <div css={styles.userInfo}>
            <Image
              src={
                'https://avatars.githubusercontent.com/u/83369665?s=96&v=4'
              }
              alt={'github user icon'}
              height={48}
              width={48}
            />
            <div>
              <Link href={'/'} css={styles.githubUserLink}>
                Kagari
              </Link>
              <p css={styles.githubUserName}>yoshi-non</p>
            </div>
          </div>
          <div css={styles.memberSettingButtonBox}>
            <button css={styles.changeColorButton}></button>
            <button css={styles.deleteButton}>
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowUsersCard;
