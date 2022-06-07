import Form from '@components/Form';
import endPoints from '@services/api';

const AddModEquipoTecnico = () => {
  return <Form nameLabel="Nombre del Video:" descriptionLabel="Descripción del video:" urlAddMultimedia={endPoints.multimediaData.add} redirect={'/dashboard/modmultimedia'} type="video" />;
};

export default AddModEquipoTecnico;
