import Form from '@components/Form';
import endPoints from '@services/api';

const AddCooperation = () => {
  return (
    <Form
      nameLabel="Nombre de la Cooperación:"
      descriptionLabel="Descripción de la Cooperación:"
      urlAPIMultimedia={endPoints.cooperationData.api}
      redirect="/dashboard/modcooperation"
      linkLabel="Enlace de la cooperación:"
    />
  );
};

export default AddCooperation;
