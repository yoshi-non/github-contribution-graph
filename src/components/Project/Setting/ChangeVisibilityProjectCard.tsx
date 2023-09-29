import { useUpdateIsPublic } from '@/hooks/useUpdateIsPublic';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { NonIdProjectType } from '@/types/ProjectType';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

const styles = {
  container: css`
    margin: 2rem;
  `,
  title: css`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `,
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
  `,
  updateVisibilityWrapper: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  updateVisibilityButton: css`
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
    background-color: #39d353;
    color: #fff;
    transition: all 0.2s;
    &:hover {
      background-color: #39d353;
      color: #fff;
    }
  `,
};

type Props = {
  projectId: string;
};

const ChangeVisibilityProjectCard = ({
  projectId,
}: Props) => {
  const router = useRouter();
  const pathName = router.asPath;
  const [fetchProject, setFetchProject] =
    useRecoilState<NonIdProjectType | null>(
      fetchProjectState
    );

  // projectのisPublicを変更する
  const updateVisibilityProjectHandler = (
    isPublic: boolean
  ) => {
    useUpdateIsPublic(projectId, isPublic);
    setFetchProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        isPublic,
      };
    });
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(pathName);
  };

  if (!fetchProject) return null;

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>Visibility Setting</h2>
      <div css={styles.wrapper}>
        {fetchProject.isPublic ? (
          <div css={styles.updateVisibilityWrapper}>
            <div>
              <div>
                <h3>Change Visibility Project</h3>
                <p>This project is currently public.</p>
              </div>
              <button
                onClick={() =>
                  updateVisibilityProjectHandler(false)
                }
                css={styles.updateVisibilityButton}
              >
                Change Visibility
              </button>
            </div>
            <div>
              <p>
                This project is currently public to anyone
                with the link:
              </p>
              <p>
                <span>{pathName}</span>
                <button onClick={copyHandler}>Copy</button>
              </p>
            </div>
          </div>
        ) : (
          <div css={styles.updateVisibilityWrapper}>
            <div>
              <h3>Change Visibility Project</h3>
              <p>This project is currently private.</p>
            </div>
            <button
              onClick={() =>
                updateVisibilityProjectHandler(true)
              }
              css={styles.updateVisibilityButton}
            >
              Change Visibility
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeVisibilityProjectCard;
