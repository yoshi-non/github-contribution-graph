import { css } from '@emotion/react';
import ContributionGraph from './ProjectGraphCard/ContributionGraph';

const styles = {
  container: css`
    width: 100%;
  `,
};

const ProjectGraphCard = () => {
  return (
    <div css={styles.container}>
      <ContributionGraph />
    </div>
  );
};

export default ProjectGraphCard;
