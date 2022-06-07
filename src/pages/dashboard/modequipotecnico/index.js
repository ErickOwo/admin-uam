import Data from '@components/Data';
import { deleteRecurso } from '@services/api/requests';
import endPoints from '@services/api';

const ModEquipoTecnico = () => {
  return <Data place="Modificar Equipo Técnico" functionDelete={deleteRecurso} urlGetData={endPoints.equipoData.get} addURL="/dashboard/modequipotecnico/add" />;
};

export default ModEquipoTecnico;
