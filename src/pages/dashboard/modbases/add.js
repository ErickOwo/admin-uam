import Form from '@components/Form';
import endPoints from '@services/api';

const AddModBases = () => {
  return (
    <Form
      nameLabel="Nombre de la base:"
      descriptionLabel="Descripción de la base:"
      placeLabel="Lugar:"
      parrafsLabel="Información"
      urlAPIMultimedia={endPoints.basesData.api}
      redirect={'/dashboard/modbases'}
    />
  );
};

export default AddModBases;
