import { ProjectType } from '@/types/ProjectType';
import { atom } from 'recoil';

export const fetchProjectsState = atom<ProjectType[]>({
  key: 'fetchProjectsState',
  default: [],
});

export const fetchProjectState = atom<ProjectType | null>({
  key: 'fetchProjectState',
  default: null,
});
