import ProfileCard from '@/components/ProfileCard';
import Sidebar from '@/components/Sidebar';
import SidebarTitle from '@/components/Sidebar/SidebarTitle';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(
    isOpenSidebarState
  );

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);

  return (
    <div css={styles.container}>
      <div css={styles.topContent}>
        <SidebarTitle />
        <Topbar />
      </div>
      <div css={styles.mainWrapper}>
        {isOpenSidebar && <Sidebar />}
        <div css={styles.profileWrapper}>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
