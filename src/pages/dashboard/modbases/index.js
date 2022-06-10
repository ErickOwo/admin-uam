import Data from '@components/Data';
import endPoints from '@services/api';

const ModBases = () => {
  return <Data place="Modificar Bases" apiURL={endPoints.basesData.api} addURL="/dashboard/modbases/add" editURL="/dashboard/modbases/edit" />;
};

export default ModBases;
