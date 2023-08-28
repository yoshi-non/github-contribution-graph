export type ShowUserType = {
  id: string;
  projectId: string;
  githubId: string;
  color: string;
};

export type NonIdShowUserType = Omit<ShowUserType, 'id'>;
