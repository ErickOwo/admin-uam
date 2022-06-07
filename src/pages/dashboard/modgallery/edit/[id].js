import Form from '@components/Form';
import endPoints from '@services/api';

const Edit = () => {
  return <Form nameLabel="Titulo:" descriptionLabel="Descripción:" urlAPIMultimedia={endPoints.galleryData.api} redirect={'/dashboard/modgallery'} mode="Modificar" />;
};

export default Edit;
