import { useAuth } from '@/context/auth';
import { projectSelectViewState } from '@/store/projectSelectViewAtoms';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';

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
  ownerId?: string;
};

const ProjectNavbar = ({ ownerId }: Props) => {
  const [projectSelectView, setProjectSelectView] =
    useRecoilState(projectSelectViewState);

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
