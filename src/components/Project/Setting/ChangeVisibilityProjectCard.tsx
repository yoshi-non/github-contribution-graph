import { useUpdateIsPublic } from '@/hooks/useUpdateIsPublic';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { NonIdProjectType } from '@/types/ProjectType';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from '@mui/material';

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
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid #c9d1d9;
    border-radius: 10px;
  `,
  publicWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
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
      border: 2px solid #006d32;
    }
  `,
  copyWrapper: css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
    background-color: #c9d1d9;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: #333;
    button {
      border: none;
      padding: 0.5rem;
    }
  `,
};

type Props = {
  projectId: string;
};

const ChangeVisibilityProjectCard = ({
  projectId,
}: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const pathName = window.location.href;
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
    setIsCopied(true);
    navigator.clipboard.writeText(pathName);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (!fetchProject) return null;

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>Visibility Setting</h2>
      <div css={styles.wrapper}>
        {fetchProject.isPublic ? (
          <div css={styles.publicWrapper}>
            <div css={styles.updateVisibilityWrapper}>
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
            <div css={styles.copyWrapper}>
              <p>{pathName}</p>
              <button onClick={copyHandler}>
                {isCopied ? (
                  <Tooltip title="Copied" placement="top">
                    <DoneIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Copy" placement="top">
                    <ContentCopyIcon />
                  </Tooltip>
                )}
              </button>
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
