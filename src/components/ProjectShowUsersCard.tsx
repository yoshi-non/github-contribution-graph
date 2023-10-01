import { css } from '@emotion/react';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useState } from 'react';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import { createShowUserHandler } from '@/lib/firebase/createShowUserHandler';
import ShowUser from './ProjectShowUsersCard/ShowUser';
import { ShowUserType } from '@/types/ShowUserType';
import { memberCountState } from '@/store/memberCountAtoms';
import { useGithubOrgMembers } from '@/hooks/useGithubOrgMembers';
import { useCheckGithubId } from '@/hooks/useCheckGithubId';
import { useGithubRepoMembers } from '@/hooks/useGithubRepoMembers';
import ModalInput from './ProjectShowUsersCard/ModalInput';
import ModalLayout from '@/layout/ModalLayout';
import { useUpdateColor } from '@/hooks/useUpdateColor';
import { githubUsers } from '@/types/GitHubApiType';

const styles = {
  container: css`
    width: 90%;
    max-width: 1200px;
    margin: 0 auto 50px auto;
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
  changeAllButton: css`
    color: #fff;
    background-color: #333;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-weight: bold;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
};

type Props = {
  fetchShowUsers: ShowUserType[];
  setFetchShowUsers: React.Dispatch<
    React.SetStateAction<ShowUserType[]>
  >;
  githubUserList: githubUsers;
  isPublic?: boolean;
};

const ProjectShowUsersCard = ({
  fetchShowUsers,
  setFetchShowUsers,
  githubUserList,
  isPublic,
}: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { fbUser } = useAuth();

  const [addMemberModalIsOpen, setAddMemberModalIsOpen] =
    useState<boolean>(false);
  const [
    exportMemberModalIsOpen,
    setExportMemberModalIsOpen,
  ] = useState<boolean>(false);
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);

  const [githubId, setGithubId] = useState<string>('');
  const [githubOrgId, setGithubOrgId] =
    useState<string>('');
  const [githubRepoId, setGithubRepoId] =
    useState<string>('');

  type ExportSelectText = 'Orgs' | 'Repos';

  const [exportSelectText, setExportSelectText] =
    useState<ExportSelectText>('Orgs');
  const addMemberHandler = async () => {
    if (!fbUser) return;
    if (id === undefined) return;
    const shapeGithubId = githubId.trim();
    if (shapeGithubId === '') return;
    const isExist = await useCheckGithubId(shapeGithubId);
    if (!isExist) {
      alert('このGitHub Idは存在しないです');
      return;
    }
    const showUser = {
      projectId: id as string,
      githubId: shapeGithubId,
      color: '#fff',
    };
    await createShowUserHandler(showUser, router);
    setMemberCount(memberCount + 1);
    setAddMemberModalIsOpen(false);
    setGithubId('');
  };

  const exportOrgMembersHandler = async () => {
    if (!fbUser) return;
    if (id === undefined) return;
    const shapeGithubOrgId = githubOrgId.trim();
    if (shapeGithubOrgId === '') return;
    // githubOrgIdのメンバーを一括で追加する
    const githubIds = await useGithubOrgMembers(
      shapeGithubOrgId
    );

    if (githubIds === null) {
      alert(
        'このOrganization Idは存在しないかPublicユーザーがいません'
      );
      return;
    }

    githubIds.map(async (githubId: string) => {
      const showUser = {
        projectId: id as string,
        githubId: githubId,
        color: '#fff',
      };
      await createShowUserHandler(showUser, router);
    });
    setMemberCount(memberCount + 1);
    setExportMemberModalIsOpen(false);
    setGithubOrgId('');
    setGithubRepoId('');
  };

  const exportRepoMembersHandler = async () => {
    if (!fbUser) return;
    if (id === undefined) return;
    const shapeGithubRepoId = githubRepoId.trim();
    if (shapeGithubRepoId === '') return;
    // githubRepoIdのメンバーを一括で追加する
    const githubIds = await useGithubRepoMembers(
      shapeGithubRepoId
    );

    if (githubIds === null) {
      alert(
        'このOrganization Idは存在しないかPublicユーザーがいません'
      );
      return;
    }

    githubIds.map(async (githubId: string) => {
      const showUser = {
        projectId: id as string,
        githubId: githubId,
        color: '#fff',
      };
      await createShowUserHandler(showUser, router);
    });
    setMemberCount(memberCount + 1);
    setExportMemberModalIsOpen(false);
    setGithubOrgId('');
    setGithubRepoId('');
  };

  const closeExportMemberModal = () => {
    setExportMemberModalIsOpen(false);
    setGithubOrgId('');
    setGithubRepoId('');
  };

  const closeAddMemberModal = () => {
    setAddMemberModalIsOpen(false);
    setGithubId('');
  };

  const changeAllColorsHandler = () => {
    const updateFetchShowUsers = fetchShowUsers.map(
      (user) => {
        const randomColor = Math.floor(
          Math.random() * 16777215
        ).toString(16);
        useUpdateColor(user, `#${randomColor}`);
        return {
          ...user,
          color: `#${randomColor}`,
        };
      }
    );
    setFetchShowUsers(updateFetchShowUsers);
  };

  return (
    <div css={styles.container}>
      {!isPublic && (
        <div css={styles.topbar}>
          <div></div>
          <div css={styles.buttonBox}>
            <button
              css={styles.exportButton}
              onClick={() =>
                setExportMemberModalIsOpen(true)
              }
            >
              <SystemUpdateAltIcon />
              <span>Export</span>
            </button>
            <ModalLayout
              isOpen={exportMemberModalIsOpen}
              onRequestClose={closeExportMemberModal}
            >
              <h2>Export Member to {fetchProject?.name}</h2>
              {exportSelectText === 'Orgs' && (
                <ModalInput
                  title="オーガニゼーションから一括エクスポート"
                  placeholder="GitHub Organization Id (ex: laravel)"
                  setExportSelectTextHandler={() =>
                    setExportSelectText('Repos')
                  }
                  value={githubOrgId}
                  setGithubId={setGithubOrgId}
                  addMemberHandler={exportOrgMembersHandler}
                  closeModalHandler={closeExportMemberModal}
                  linkText="レポジトリから一括で追加する"
                />
              )}
              {exportSelectText === 'Repos' && (
                <ModalInput
                  title="レポジトリから一括エクスポート"
                  placeholder="GitHub Repository Id (ex: laravel/breeze)"
                  setExportSelectTextHandler={() =>
                    setExportSelectText('Orgs')
                  }
                  value={githubRepoId}
                  setGithubId={setGithubRepoId}
                  addMemberHandler={
                    exportRepoMembersHandler
                  }
                  closeModalHandler={closeExportMemberModal}
                  linkText="オーガニゼーションから一括で追加する"
                />
              )}
            </ModalLayout>
            <button
              css={styles.addMemberButton}
              onClick={() => setAddMemberModalIsOpen(true)}
            >
              Add Member
            </button>
            <ModalLayout
              isOpen={addMemberModalIsOpen}
              onRequestClose={closeAddMemberModal}
            >
              <h2>Add Member to {fetchProject?.name}</h2>
              <ModalInput
                title="GitHub Idから追加"
                placeholder="GitHub User Id"
                value={githubId}
                setGithubId={setGithubId}
                addMemberHandler={addMemberHandler}
                closeModalHandler={closeAddMemberModal}
              />
            </ModalLayout>
          </div>
        </div>
      )}
      <div css={styles.memberWrapper}>
        <div css={styles.memberHead}>
          <span>Members</span>
          {!isPublic && (
            <button
              css={styles.changeAllButton}
              onClick={changeAllColorsHandler}
            >
              Change All Colors
            </button>
          )}
        </div>
        {fetchShowUsers?.map((showUser) => (
          <ShowUser
            key={showUser.id}
            props={{
              showUser,
              fetchShowUsers,
              setFetchShowUsers,
              githubUserList,
              isPublic,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectShowUsersCard;
