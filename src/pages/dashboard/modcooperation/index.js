import Data from '@components/Data';
import endPoints from '@services/api';

const Modcooperation = () => {
  return <Data place="Modificar Cooperación" apiURL={endPoints.cooperationData.api} addURL="/dashboard/modcooperation/add" editURL="/dashboard/modcooperation/edit" />;
};

export default Modcooperation;
