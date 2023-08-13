import { css } from '@emotion/react';

const styles = {
  container: css`
    border-bottom: 1px solid #ddd;
  `,
  titleWrapper: css`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
  `,
  projectName: css`
    font-size: 1.2rem;
    font-weight: bold;
    color: #1f6feb;
  `,
  isPrivate: css`
    font-size: 0.8rem;
    color: #999;
    border: 1px solid #999;
    border-radius: 10rem;
    padding: 0.2rem 0.5rem;
  `,
  kindWrapper: css`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
  `,
  kindColor: css`
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #39d353;
  `,
  kindText: css`
    color: #666;
    margin-left: 0.5rem;
  `,
};

const Project = () => {
  return (
    <div css={styles.container}>
      <div css={styles.titleWrapper}>
        <h2 css={styles.projectName}>Project Name</h2>
        <p css={styles.isPrivate}>Private</p>
      </div>
      <p css={styles.kindWrapper}>
        <span css={styles.kindColor}></span>
        <span css={styles.kindText}>Graph</span>
      </p>
    </div>
  );
};

export default Project;
