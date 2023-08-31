import { atom } from 'recoil';

export const memberCountState = atom<number>({
  key: 'memberCountState',
  default: 0,
});
