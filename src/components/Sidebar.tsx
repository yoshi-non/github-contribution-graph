import CreateProjectButton from './Sidebar/CreateProjectButton';
import SidebarTitle from './Sidebar/SidebarTitle';
import { css } from '@emotion/react';

const styles = {
  container: css`
    max-width: 17rem;
    border-right: 1px solid #eaeaea;
    height: 100vh;
    position: sticky;
  `,
  createButtonWrapper: css`
    width: 90%;
    margin: 15px auto;
  `,
};

const Sidebar = () => {
  return (
    <div css={styles.container}>
      <div>
        <div>
          <SidebarTitle />
          <div css={styles.createButtonWrapper}>
            <CreateProjectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
