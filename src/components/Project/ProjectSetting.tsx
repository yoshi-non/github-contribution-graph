import DeleteProjectCard from './Setting/DeleteProjectCard';
import ChangeVisibilityProjectCard from './Setting/ChangeVisibilityProjectCard';

type Props = {
  projectId: string;
};

const ProjectSetting = ({ projectId }: Props) => {
  return (
    <div>
      <ChangeVisibilityProjectCard projectId={projectId} />
      <DeleteProjectCard projectId={projectId} />
    </div>
  );
};

export default ProjectSetting;
