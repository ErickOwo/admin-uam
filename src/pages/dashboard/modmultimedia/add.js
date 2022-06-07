import Form from '@components/Form';
import endPoints from '@services/api';

const AddModEquipoTecnico = () => {
  return <Form nameLabel="Nombre del Video:" descriptionLabel="Descripción del video:" urlAPIMultimedia={endPoints.multimediaData.api} redirect={'/dashboard/modmultimedia'} type="video" />;
};

export default AddModEquipoTecnico;
