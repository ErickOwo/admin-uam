import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { getData, deleteData } from '@services/api/requests';
import { useRouter } from 'next/router';

const Data = ({ place, apiURL, addURL, editURL }) => {
  const { data } = useSWR(apiURL, getData);
  const router = useRouter();

  const handleDelete = (id) => {
    if (confirm('¿Está seguro de que desea eliminar la imagen?')) deleteData(apiURL, id).then(res=> router.reload());
  };

  return (
    <div className="min-w-none w-full min-h-screen flex flex-col items-center text-white p-5">
      <h3 className="text-2xl text-yellow-400 font-bold self-center bg-black/70 py-2 px-5 rounded-lg">{ place }</h3>
      <div className="flex flex-col w-5/6 p-6">
        <div className="bg-slate-800/80 flex p-4 ">
          <Link href={addURL}>
            <button className="bg-pink-700 py-2 px-6 ml-auto rounded-lg">Agregar</button>
          </Link>
        </div>
        <div className="my-4 flex flex-col gap-2 text-white">
          {data?.data.map((item, index) => (
            <div className="flex p-6 bg-black/70 w-full rounded-lg" key={index}>
              <div className="flex flex-col grow shrink">
                <p>
                  <span className="font-bold">{item.title ? 'Título: ' : 'Nombre: '}</span>
                  {item.title || item.name}
                </p>
                <p>
                  <span className="font-bold">{item.title ? 'Descripción: ' : 'Cargo: '}</span>
                  {item.description || item.position}
                </p>
                <Link href={`${editURL}/${item._id}`}>
                  <button className="mt-auto bg-sky-500 p-2 w-9/12 self-center text-white font-bold">
                    Modificar
                  </button>
                </Link>
                <button className="mt-3 bg-red-600 p-2 w-9/12 self-center text-white font-bold" onClick={() => handleDelete(item._id)}>
                  Eliminar
                </button>
              </div>
              {
                item.imgURL ? <div className="flex flex-col w-[360px]">
                  <span className="font-bold">Imagen: </span>
                  <Image src={item.imgURL} width="160px" height="320px" priority />
                </div>      : <div className="flex flex-col gap-2 w-[460px]">
                  <span className="font-bold">Video: </span>
                  <video src={item.videoURL} controls />
                </div> 
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;