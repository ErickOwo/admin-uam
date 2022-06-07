import Data from '@components/Data';
import { deleteImg } from '@services/api/requests';
import endPoints from '@services/api';

const modGallery = () => {
  return <Data place="Modificar Galleria de inicio UAM" functionDelete={deleteImg} urlGetData={endPoints.galleryData.get} addURL="/dashboard/modgallery/add" />;
};

export default modGallery;
