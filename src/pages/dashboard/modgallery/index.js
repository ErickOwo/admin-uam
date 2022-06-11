import Data from '@components/Data';
import endPoints from '@services/api';

const ModGallery = () => {
  return (
    <Data place="Modificar Galleria de inicio UAM" apiURL={endPoints.galleryData.api} addURL="/dashboard/modgallery/add" editURL="/dashboard/modgallery/edit" firstTitle="Título de la imágen: " />
  );
};

export default ModGallery;
