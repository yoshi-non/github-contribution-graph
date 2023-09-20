import { css } from '@emotion/react';

const styles = {
  container: css`
    margin: 2rem;
  `,
  title: css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `,
  dangerWrapper: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #631c03;
    border-radius: 10px;
  `,
  deleteAccountWrapper: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  dangerButton: css`
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
    background-color: #26262d;
    color: #f85149;
    transition: all 0.2s;
    &:hover {
      background-color: #f85149;
      color: #fff;
    }
  `,
};

const DeleteAccountCard = () => {
  return (
    <div css={styles.container}>
      <h2 css={styles.title}>Danger Zone</h2>
      <div css={styles.dangerWrapper}>
        <div css={styles.deleteAccountWrapper}>
          <div>
            <h3>Delete Account</h3>
            <p>
              Once you delete your account, there is no
              going back. Please be certain.
            </p>
          </div>
          <button css={styles.dangerButton}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountCard;
