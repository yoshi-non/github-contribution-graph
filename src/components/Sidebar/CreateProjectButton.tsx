import { css } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1.5px solid #1f6feb;
    border-radius: 0.25rem;
    color: #1f6feb;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    width: 100%;
    transition: 0.2s;
    &:hover {
      background-color: #1f6feb;
      color: #fff;
    }
  `,
  icon: css`
    margin-right: 0.5rem;
    font-size: 1.3rem;
  `,
};

const CreateProjectButton = () => {
  return (
    <button css={styles.container}>
      <AddIcon css={styles.icon} /> Create
    </button>
  );
};

export default CreateProjectButton;
