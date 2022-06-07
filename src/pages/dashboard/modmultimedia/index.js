import Data from '@components/Data';
import endPoints from '@services/api';

const ModMultimedia = () => {
  return <Data place="Modificar Multimedia" apiURL={endPoints.multimediaData.api} addURL="/dashboard/modmultimedia/add" editURL="/dashboard/modmultimedia/edit" />;
};

export default ModMultimedia;
