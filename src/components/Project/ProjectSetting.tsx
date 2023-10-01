import DeleteProjectCard from './Setting/DeleteProjectCard';
import ChangeVisibilityProjectCard from './Setting/ChangeVisibilityProjectCard';
import ChangeProjectNameCard from './Setting/ChangeProjectNameCard';

type Props = {
  projectId: string;
  crrPath?: string;
};

const ProjectSetting = ({ projectId, crrPath }: Props) => {
  return (
    <div>
      <ChangeProjectNameCard
        projectId={projectId}
        crrPath={crrPath}
      />
      <ChangeVisibilityProjectCard projectId={projectId} />
      <DeleteProjectCard projectId={projectId} />
    </div>
  );
};

export default ProjectSetting;
