import { css } from '@emotion/react';
import Project from './ProjectBox/Project';
import { useRecoilState } from 'recoil';
import { fetchProjectsState } from '@/store/fetchProjectAtoms';
import { useAuth } from '@/context/auth';
import { use, useEffect, useState } from 'react';
import { getProjectHandler } from '@/lib/firebase/getProjectHandler';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { ProjectType } from '@/types/ProjectType';

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
  const [fetchProjects, setFetchProjects] = useState<
    ProjectType[]
  >([]);
  const { fbUser } = useAuth();

  useEffect(() => {
    if (fbUser) {
      const docRef = query(
        collection(db, `projects`),
        where('ownerId', '==', fbUser.uid)
      );
      getDocs(docRef).then((snapshot) => {
        let results: ProjectType[] = [];

        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          } as ProjectType);
          setFetchProjects(results);
        });
      });
    }
  }, [fbUser]);

  useEffect(() => {
    console.log(fetchProjects);
  }, [fetchProjects]);

  return (
    <div css={styles.container}>
      <div css={styles.showMethodNavbar}>
        <div>
          <p>Created By ↓</p>
        </div>
      </div>
      <div css={styles.projects}>
        {fetchProjects.map((project) => (
          <Project key={project.id} props={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectBox;
