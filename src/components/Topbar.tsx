import { css } from '@emotion/react';
import Image from 'next/image';
import { useAuth } from '@/context/auth';
import SearchIcon from '@mui/icons-material/Search';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  `,
  crrPathWrapper: css`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin-left: 1rem;
  `,
  linkWrapper: css`
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ddd;
      padding: 0 0.8rem;
      &:last-child {
        border-right: none;
      }
    }
  `,
  accountButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  `,
  searchButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    &:hover svg {
      transition: all 0.2s;
      color: #a371f7;
    }
  `,
  searchIcon: css`
    color: #333;
    font-size: 2rem;
  `,
};

const Topbar = () => {
  const { fbUser } = useAuth();
  return (
    <div css={styles.container}>
      <div css={styles.crrPathWrapper}>
        <p>MY FILES / The Beginning</p>
      </div>
      <div css={styles.linkWrapper}>
        {fbUser?.photoURL && (
          <div>
            <button css={styles.accountButton}>
              <Image
                src={fbUser?.photoURL}
                alt={'githubアカウントのアイコン'}
                height={35}
                width={35}
              />
            </button>
          </div>
        )}
        <div>
          <button css={styles.searchButton}>
            <SearchIcon css={styles.searchIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
