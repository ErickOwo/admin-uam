import Form from '@components/Form';
import endPoints from '@services/api';

const Edit = () => {
  return <Form nameLabel="Nombre del programa:" descriptionLabel="ID del menu:" urlAPIMultimedia={endPoints.programasData.api} redirect={'/dashboard/modprogramas'} mode="Modificar" infoDiv={true} />;
};

export default Edit;
