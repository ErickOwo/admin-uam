import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { getData, deleteImg } from '@services/api/requests';
import endPoints from '@services/api';
import { useRouter } from 'next/router';

const modGallery = () => {
  const { data } = useSWR(endPoints.galleryData.get, getData);
  const router = useRouter();

  const handleDelete = (id) => {
    if (confirm('¿Está seguro de que desea eliminar la imagen?')) deleteImg(id).then((res) => router.reload());
  };

  return (
    <div className="min-w-none w-full min-h-screen flex flex-col items-center text-white p-5">
      <h3 className="text-2xl">Modificar Galleria de inicio UAM</h3>
      <div className="flex flex-col w-5/6 p-6">
        <div className="bg-slate-800/80 flex p-4 ">
          <Link href="/dashboard/modgallery/add">
            <button className="bg-pink-700 py-2 px-6 ml-auto rounded-lg">Agregar</button>
          </Link>
        </div>
        <div className="my-4 flex flex-col gap-2 text-white">
          {data?.data.map((item, index) => (
            <div className="flex p-6 bg-black/70 w-full rounded-lg" key={index}>
              <div className="flex flex-col grow shrink">
                <p>
                  <span className="font-bold">Título: </span>
                  {item.title}
                </p>
                <p>
                  <span className="font-bold">Descripción: </span>
                  {item.description}
                </p>
                <button className="mt-auto bg-sky-500 p-2 w-9/12 self-center text-white font-bold">Modificar</button>
                <button className="mt-3 bg-red-600 p-2 w-9/12 self-center text-white font-bold" onClick={() => handleDelete(item._id)}>
                  Eliminar
                </button>
              </div>
              <div className="flex flex-col w-[360px]">
                <span className="font-bold">Imagen: </span>
                <Image src={item.imgURL} width="160px" height="320px" priority />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default modGallery;
