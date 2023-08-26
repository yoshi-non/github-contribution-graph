export type ProjectType = {
  expiration: null | Date;
  id: string;
  invitePassword: string;
  isPublic: boolean;
  kind: string;
  name: string;
  ownerId: string;
};

export type NonIdProjectType = Omit<ProjectType, 'id'>;
