import { useAuth } from '@/context/auth';
import { ProjectSelectView } from '@/types/ProjectSelectView';
import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
  `,
  ul: css`
    display: flex;
    width: 100%;
    list-style: none;
    border-bottom: 1px solid #ddd;
  `,
  li: css`
    flex: 1;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    border-right: 1px solid #ddd;
    &:last-child {
      border-right: none;
    }
  `,
  select: css`
    border-bottom: 5px solid #f78166;
  `,
};

type Props = {
  projectSelectView: ProjectSelectView;
  setProjectSelectView: Dispatch<
    SetStateAction<ProjectSelectView>
  >;
  ownerId?: string;
};

const ProjectNavbar = ({
  projectSelectView,
  setProjectSelectView,
  ownerId,
}: Props) => {
  const { fbUser } = useAuth();

  return (
    <div css={styles.container}>
      <ul css={styles.ul}>
        <li
          css={[
            styles.li,
            projectSelectView === 'graph' && styles.select,
          ]}
          onClick={() => setProjectSelectView('graph')}
        >
          Graph
        </li>
        <li
          css={[
            styles.li,
            projectSelectView === 'race' && styles.select,
          ]}
          onClick={() => setProjectSelectView('race')}
        >
          Race
        </li>
        {fbUser?.uid === ownerId && (
          <li
            css={[
              styles.li,
              projectSelectView === 'setting' &&
                styles.select,
            ]}
            onClick={() => setProjectSelectView('setting')}
          >
            Setting
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProjectNavbar;
