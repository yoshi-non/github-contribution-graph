import { ShowUserType } from '@/types/ShowUserType';
import { atom } from 'recoil';

export const fetchShowUsersState = atom<ShowUserType[]>({
  key: 'fetchShowUsersState',
  default: [],
});
