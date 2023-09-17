import { atom } from 'recoil';

type ProjectSelectView = 'graph' | 'race' | 'setting';

// グラフに渡すデータgraphセット
export const projectSelectViewState =
  atom<ProjectSelectView>({
    key: 'projectSelectViewState',
    default: 'graph',
  });
