import Form from '@components/Form';
import endPoints from '@services/api';

const Edit = () => {
  return (
    <Form
      nameLabel="Nombre de la base:"
      descriptionLabel="Descripción de la base:"
      placeLabel="Lugar:"
      parrafsLabel="Información:"
      urlAPIMultimedia={endPoints.basesData.api}
      redirect={'/dashboard/modbases'}
      mode="Modificar"
    />
  );
};

export default Edit;
