import Form from '@components/Form';
import endPoints from '@services/api';

const AddModgallery = () => {
  return <Form nameLabel="Nombre de la imagen:" descriptionLabel="Descripción de la imagen:" urlAddMultimedia={endPoints.galleryData.add} redirect={'/dashboard/modgallery'} />;
};

export default AddModgallery;
