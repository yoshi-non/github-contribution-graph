import { ProjectType } from '@/types/ProjectType';
import { atom } from 'recoil';

export const fetchProjectsState = atom<ProjectType[]>({
  key: 'fetchProjectsState',
  default: [],
});
