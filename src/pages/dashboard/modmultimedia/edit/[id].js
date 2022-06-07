import Form from '@components/Form';
import endPoints from '@services/api';

const Edit = () => {
  return (
    <Form nameLabel="Nombre del video:" descriptionLabel="Descripción del video:" urlAPIMultimedia={endPoints.multimediaData.api} redirect={'/dashboard/modmultimedia'} mode="Modificar" type="video" />
  );
};

export default Edit;
