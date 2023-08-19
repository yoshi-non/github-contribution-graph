import { css } from '@emotion/react';
import CreateProjectCardLayout from './CreateProjectBox/CreateProjectCardLayout';
import InsightsIcon from '@mui/icons-material/Insights';
import { createProjectHandler } from '@/lib/firebase/createProjectHandler';
import { useAuth } from '@/context/auth';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #c3cfd9;
    padding: 1.3rem;
  `,
  icon: css`
    font-size: 2rem;
  `,
};

const CreateProjectBox = () => {
  const { fbUser, isLoading } = useAuth();

  // Project作成 (Graph)
  const createGraphProjectHandler = () => {
    if (!fbUser) return;
    const project = {
      ownerId: fbUser.uid,
      name: 'New Graph Project',
      isPublic: false,
      kind: 'Graph',
      invitePassword: '',
      expiration: null,
    };
    createProjectHandler(project);
  };
  return (
    <div css={styles.container}>
      <CreateProjectCardLayout
        onClick={createGraphProjectHandler}
      >
        <InsightsIcon css={styles.icon} />
        <p>+ Graph</p>
      </CreateProjectCardLayout>
    </div>
  );
};

export default CreateProjectBox;
