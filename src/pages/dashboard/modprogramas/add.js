import Form from '@components/Form';
import endPoints from '@services/api';

const AddModprograma = () => {
  return <Form nameLabel="Nombre del programa:" descriptionLabel="Descripción de la imagen:" urlAPIMultimedia={endPoints.programasData.api} redirect={'/dashboard/modprogramas'} />;
};

export default AddModprograma;
