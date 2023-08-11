import { atom } from 'recoil';

// グラフに渡すデータセット
export const isOpenSidebarState = atom<boolean>({
  key: 'isOpenSidebarState',
  default: true,
});
