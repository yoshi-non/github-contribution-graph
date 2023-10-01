import CreateProjectButton from './Sidebar/CreateProjectButton';
import { css } from '@emotion/react';

const styles = {
  container: css`
    width: 300px;
    border-right: 1px solid #eaeaea;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  `,
  createButtonWrapper: css`
    width: 90%;
    margin: 15px auto;
  `,
};

type Props = {
  isPublic?: boolean;
};

const Sidebar = ({ isPublic }: Props) => {
  if (isPublic) return null;
  return (
    <div css={styles.container}>
      <div css={styles.createButtonWrapper}>
        <CreateProjectButton />
      </div>
    </div>
  );
};

export default Sidebar;
