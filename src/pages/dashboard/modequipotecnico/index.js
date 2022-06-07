import Data from '@components/Data';
import endPoints from '@services/api';

const ModEquipoTecnico = () => {
  return <Data place="Modificar Equipo Técnico" apiURL={endPoints.equipoData.api} addURL="/dashboard/modequipotecnico/add" editURL="/dashboard/modequipotecnico/edit" />;
};

export default ModEquipoTecnico;
