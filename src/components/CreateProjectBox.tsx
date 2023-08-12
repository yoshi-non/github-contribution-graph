import { css } from '@emotion/react';
import CreateProjectCardLayout from './CreateProjectBox/CreateProjectCardLayout';
import InsightsIcon from '@mui/icons-material/Insights';

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
  return (
    <div css={styles.container}>
      <CreateProjectCardLayout>
        <InsightsIcon css={styles.icon} />
        <p>+ Graph</p>
      </CreateProjectCardLayout>
    </div>
  );
};

export default CreateProjectBox;
