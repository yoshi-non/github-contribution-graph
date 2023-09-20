import { logout } from '@/lib/auth';
import { css } from '@emotion/react';

const styles = {
  container: css`
    margin: 2rem;
  `,
  title: css`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `,
  buttonWrapper: css`
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  `,
  redButton: css`
    color: #f85149;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    &:hover {
      opacity: 0.8;
    }
  `,
};

const ProfileCard = () => {
  return (
    <div css={styles.container}>
      <h2 css={styles.title}>Profile</h2>
      <div css={styles.buttonWrapper}>
        <button onClick={logout} css={styles.redButton}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
