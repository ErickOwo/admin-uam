import Form from '@components/Form';
import endPoints from '@services/api';

const AddModEquipoTecnico = () => {
  return <Form nameLabel="Nombre del personal:" descriptionLabel="Cargo:" urlAddMultimedia={endPoints.equipoData.add} redirect={'/dashboard/modequipotecnico'} />;
};

export default AddModEquipoTecnico;
