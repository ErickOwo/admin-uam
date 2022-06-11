import Form from '@components/Form';
import endPoints from '@services/api';

const AddModprograma = () => {
  return <Form nameLabel="Nombre del programa:" descriptionLabel="ID del menu:" urlAPIMultimedia={endPoints.programasData.api} redirect={'/dashboard/modprogramas'} infoDiv={true} />;
};

export default AddModprograma;
