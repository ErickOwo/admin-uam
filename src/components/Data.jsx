import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { getData, deleteData } from '@services/api/requests';
import { useRouter } from 'next/router';

const Data = ({ place, apiURL, addURL, editURL, firstTitle, secondTitle }) => {
  const { data } = useSWR(apiURL, getData);
  const router = useRouter();

  const handleDelete = (id) => {
    if (confirm('¿Está seguro de que desea eliminar el objeto?')) deleteData(apiURL, id).then(res=> router.reload());
    else return
  };

  return (
    <div className="min-w-none w-full min-h-screen flex flex-col items-center text-white p-5">
      <h3 className="md:text-2xl text-lg text-center text-yellow-400 font-bold self-center bg-black/70 py-2 px-5 rounded-lg">{ place }</h3>
      <div className="flex flex-col md:w-5/6 w-full md:p-6 py-4">
        <div className="bg-slate-800/80 flex p-4">
          <Link href={addURL}>
            <button className="bg-pink-700 py-2 px-6 ml-auto rounded-lg">Agregar</button>
          </Link>
        </div>
        <div className="my-4 flex flex-col text-white gap-4">
          {data?.data?.map((item, index) => (
            <div className="flex p-6 bg-black/70 w-full rounded-lg md:flex-row flex-col md:gap-0 gap-3" key={index}>
              <div className="flex flex-col grow shrink gap-4 h-[310px]">
                <p>
                  <span className="font-bold">{ firstTitle || 'Título: ' }</span>
                  {item.title || item.name}
                </p>
                <p>
                  <span className="font-bold">{ secondTitle || 'Descripción: ' }</span>
                  {item.description || item.position}
                </p>
                {
                  item.linkcooperation ? <>
                    <p className='max-w-min h-full max-h-none overflow-auto'>
                      <span>
                        Enlace: 
                      </span>
                      <a 
                        target='_blank' 
                        href={ item.linkcooperation } 
                        className='text-pink-700 font-bold ml-4 -mb-2'>
                        { item.linkcooperation }
                      </a>
                    </p>
                  </> : null
                }
                { 
                  item?.place ? <>
                    <p>
                      <span className="font-bold">Lugar: </span>
                        { item.place }
                    </p>
                    <span className="font-bold">Información: </span>
                    <div className='max-h-[210px] max-w-[550px] overflow-auto mb-6 flex flex-col gap-4'>
                      {
                        item.parrafs.map(parraf =>(
                          <p>{ parraf }</p>
                        ))
                      }
                    </div>
                  </> : null
                }
                <Link href={`${editURL}/${item._id}`}>
                  <button className="mt-auto bg-sky-500 p-2 md:w-9/12 w-full self-center md:mr-12 text-white font-bold">
                    Modificar
                  </button>
                </Link>
                <button className=" bg-red-600 p-2 md:w-9/12 w-full self-center md:mr-12 text-white font-bold" onClick={() => handleDelete(item._id)}>
                  Eliminar
                </button>
              </div>
              {
                item.imgURL ? <div className="flex flex-col md:w-[360px]">
                  <span className="font-bold">Imagen: </span>
                  <Image src={item.imgURL} width="160px" height="320px" priority />
                </div>      : <div className="flex flex-col gap-2 md:w-[460px]">
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