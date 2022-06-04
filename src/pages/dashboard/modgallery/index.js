import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { getDataGallery } from '@services/api/requests';
import endPoints from '@services/api';

const modGallery = () => {

  const { data } = useSWR(endPoints.galleryData.get, getDataGallery);

  return (
    <div className='min-w-none w-full min-h-screen flex flex-col items-center bg-gray-900 text-white p-5'>
      <h3 className='text-2xl'>Modificar Galleria de inicio UAM</h3>
      <div className='flex flex-col w-5/6 p-6'> 
        <div className='bg-slate-800 flex p-4 '>
          <Link href='/dashboard/modgallery/add'>
            <button className='bg-pink-700 py-2 px-6 ml-auto rounded-lg'>
              Agregar
            </button>
          </Link>
        </div>
        <div className='my-4 flex flex-col gap-2 text-black'>
          {
            data?.data.map(item =>(
              <div className='flex p-6 bg-white/40 w-full rounded-lg'>
                <div className='flex flex-col grow shrink'>
                  <p><span className='font-bold'>Título: </span>{item.title}</p>
                  <p><span className='font-bold'>Descripción: </span>{item.description}  </p>
                </div>
                <div className='flex flex-col w-[360px]'>
                  <span className='font-bold'>Imagen: </span>
                  <Image src={item.imgURL} width='160px' height='320px' />
                  
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default modGallery