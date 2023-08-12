import { css } from '@emotion/react';
import Project from './ProjectBox/Project';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.3rem;
  `,
  showMethodNavbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
  `,
  projects: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};

const ProjectBox = () => {
  return (
    <div css={styles.container}>
      <div css={styles.showMethodNavbar}>
        <div>
          <p>Created By ↓</p>
        </div>
      </div>
      <div css={styles.projects}>
        <Project />
      </div>
    </div>
  );
};

export default ProjectBox;
