import { useAuth } from '@/context/auth';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { isOpenSidebarState } from '@/store/sidebarAtoms';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    gap: 0.5rem;
    overflow: hidden;
  `,
  iconButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: #ddd;
    }
  `,
  isOpen: css`
    transform: rotate(180deg);
  `,
  isOpenIcon: css`
    font-size: 2rem;
  `,
  userName: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 0 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ddd;
  `,
};

const SidebarTitle = () => {
  const { fbUser } = useAuth();
  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(
    isOpenSidebarState
  );

  return (
    <div css={styles.container}>
      <button
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        css={[
          styles.iconButton,
          isOpenSidebar && styles.isOpen,
        ]}
      >
        <KeyboardDoubleArrowRightIcon
          css={styles.isOpenIcon}
        />
      </button>
      <p css={styles.userName}>
        {fbUser?.displayName}'s Workspace
      </p>
    </div>
  );
};

export default SidebarTitle;
