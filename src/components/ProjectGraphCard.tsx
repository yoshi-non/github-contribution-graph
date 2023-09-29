import { css } from '@emotion/react';
import ContributionGraph from './ProjectGraphCard/ContributionGraph';
import { githubUsers } from '@/types/GitHubApiType';

const styles = {
  container: css`
    width: 100%;
  `,
};

type Props = {
  githubUserList: githubUsers;
};

const ProjectGraphCard = ({ githubUserList }: Props) => {
  return (
    <div css={styles.container}>
      <ContributionGraph githubUserList={githubUserList} />
    </div>
  );
};

export default ProjectGraphCard;
