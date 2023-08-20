import { css } from '@emotion/react';
import Project from './ProjectBox/Project';
import { useState } from 'react';
import { ProjectType } from '@/types/ProjectType';
import Link from 'next/link';
import { fetchProjectsState } from '@/store/fetchProjectAtoms';
import { useRecoilState } from 'recoil';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.3rem;
  `,
  showMethodNavbar: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
  `,
  projects: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};

const ProjectBox = () => {
  const [fetchProjects, setFetchProjects] = useRecoilState<
    ProjectType[]
  >(fetchProjectsState);

  return (
    <div css={styles.container}>
      <div css={styles.showMethodNavbar}>
        <div>
          <p>Created By ↓</p>
        </div>
      </div>
      <div css={styles.projects}>
        {fetchProjects.map((project) => (
          <Link href={`/project?id=${project.id}`}>
            <Project key={project.id} props={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectBox;
