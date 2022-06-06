import Form from '@components/Form';
import endPoints from '@services/api';

const AddModEquipoTecnico = () => {
  return <Form nameLabel="Nombre del personal:" descriptionLabel="Cargo:" url={endPoints.equipoData.add} redirect={'/dashboard/modequipotecnico'} />;
};

export default AddModEquipoTecnico;
