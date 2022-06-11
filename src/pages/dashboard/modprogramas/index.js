import Data from '@components/Data';
import endPoints from '@services/api';

const ModProgramas = () => {
  return <Data place="Modificar Programas" apiURL={endPoints.programasData.api} addURL="/dashboard/modprogramas/add" editURL="/dashboard/modprogramas/edit" />;
};

export default ModProgramas;
