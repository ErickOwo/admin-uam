import Data from '@components/Data';
import { deleteMultimedia } from '@services/api/requests';
import endPoints from '@services/api';

const ModMultimedia = () => {
  return <Data place="Modificar Multimedia" functionDelete={deleteMultimedia} urlGetData={endPoints.multimediaData.get} addURL="/dashboard/modmultimedia/add" />;
};

export default ModMultimedia;
