import { atom } from 'recoil';
import { githubUsers } from './atoms';

export const githubUsersState = atom<githubUsers>({
  key: 'githubUsersState',
  default: [],
});
