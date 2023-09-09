import { css } from '@emotion/react';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useState } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import { createShowUserHandler } from '@/lib/firebase/createShowUserHandler';
import { fetchShowUsersState } from '@/store/fetchShowUsersAtoms';
import ShowUser from './ProjectShowUsersCard/ShowUser';
import { ShowUserType } from '@/types/ShowUserType';
import { memberCountState } from '@/store/memberCountAtoms';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/framerMotion/variants';

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
  `,
  modalContent: css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    border: 1px solid #ddd;
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
};

const ProjectShowUsersCard = () => {
  const router = useRouter();
  const { id } = router.query;
  const { fbUser, isLoading } = useAuth();

  const [addMemberModalIsOpen, setAddMemberModalIsOpen] =
    useState<boolean>(false);
  const [
    exportMemberModalIsOpen,
    setExportMemberModalIsOpen,
  ] = useState<boolean>(false);
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [fetchShowUsers, setFetchShowUsers] =
    useRecoilState<ShowUserType[]>(fetchShowUsersState);

  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);

  const [githubId, setGithubId] = useState<string>('');
  const addMemberHandler = () => {
    if (!fbUser) return;
    if (id === undefined) return;
    if (githubId === '') return;
    const showUser = {
      projectId: id as string,
      githubId: githubId,
      color: '#fff',
    };
    createShowUserHandler(showUser, router);
    setMemberCount(memberCount + 1);
    setAddMemberModalIsOpen(false);
  };

  const closeExportMemberModal = () => {
    setExportMemberModalIsOpen(false);
  };

  const closeAddMemberModal = () => {
    setAddMemberModalIsOpen(false);
    setGithubId('');
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
          <button
            css={styles.exportButton}
            onClick={() => setExportMemberModalIsOpen(true)}
          >
            <SystemUpdateAltIcon />
            <span>Export</span>
          </button>
          <Modal
            isOpen={exportMemberModalIsOpen}
            onRequestClose={closeExportMemberModal}
            appElement={
              typeof window !== 'undefined'
                ? (document.getElementById(
                    '__next'
                  ) as HTMLElement)
                : undefined
            }
            css={styles.modal}
          >
            <motion.div
              css={styles.modalContent}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h2>Export Member to {fetchProject?.name}</h2>
              <div>
                <p>グループから一括エクスポート</p>
                <div>
                  <div>
                    <input type="checkbox" />
                    <span>グループ名</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeExportMemberModal}
                css={styles.closeButton}
              >
                <CloseIcon />
              </button>
            </motion.div>
          </Modal>
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
            <motion.div
              css={styles.modalContent}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h2>Add Member to {fetchProject?.name}</h2>
              <div css={styles.addMemberInputBox}>
                <input
                  css={styles.addMemberInput}
                  placeholder="GitHub User Id"
                  type="text"
                  onChange={(e) =>
                    setGithubId(e.target.value)
                  }
                  value={githubId}
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
            </motion.div>
          </Modal>
        </div>
      </div>
      <div css={styles.memberWrapper}>
        <div css={styles.memberHead}>
          <span>Members</span>
        </div>
        {fetchShowUsers?.map((showUser) => (
          <ShowUser
            key={showUser.id}
            props={{ showUser }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowUsersCard;
