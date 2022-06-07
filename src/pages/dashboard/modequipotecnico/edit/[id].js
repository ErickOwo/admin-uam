import Form from '@components/Form';
import endPoints from '@services/api';

const Edit = () => {
  return <Form nameLabel="Nombre del personal:" descriptionLabel="Cargo:" urlAPIMultimedia={endPoints.equipoData.api} redirect={'/dashboard/modequipotecnico'} mode="Modificar" />;
};

export default Edit;
