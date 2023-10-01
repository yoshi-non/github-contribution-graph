import { useAuth } from '@/context/auth';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import Link from 'next/link';

const styles = {
  container: css`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    overflow-x: hidden;
    border-bottom: 1px solid #ddd;
  `,
  iconButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 50px;
    background-color: #fff;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
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
    width: 250px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #ddd;
  `,
};

type Props = {
  isPublic?: boolean;
};

const SidebarTitle = ({ isPublic }: Props) => {
  if (isPublic) return null;
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
      {isOpenSidebar && (
        <Link href={'/project-list'} css={styles.userName}>
          {fbUser?.displayName}'s Workspace
        </Link>
      )}
    </div>
  );
};

export default SidebarTitle;
