import AccountCard from '@/components/AccountCard';
import Sidebar from '@/components/Sidebar';
import SidebarTitle from '@/components/Sidebar/SidebarTitle';
import Topbar from '@/components/Topbar';
import AuthenticatedLayout from '@/layout/auth/AuthenticatedLayout';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';

const styles = {
  container: css`
    width: 100%;
    height: 100vh;
    background-color: rgb(237, 241, 245);
  `,
  topContent: css`
    position: sticky;
    z-index: 100;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  `,
  mainWrapper: css`
    width: 100%;
    display: flex;
    height: calc(100vh - 50px);
    overflow: hidden;
  `,
  profileWrapper: css`
    width: 100%;
    overflow-y: scroll;
  `,
};

const Profile = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(
    isOpenSidebarState
  );

  return (
    <AuthenticatedLayout>
      <div css={styles.container}>
        <div css={styles.topContent}>
          <SidebarTitle />
          <Topbar mainPath={'Account Setting'} />
        </div>
        <div css={styles.mainWrapper}>
          {isOpenSidebar && <Sidebar />}
          <div css={styles.profileWrapper}>
            <AccountCard />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Profile;
