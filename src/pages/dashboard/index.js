import Link from 'next/link';

const Dashboard = () => {
  const pages = [
    {
      link: '/dashboard/messages',
      name: 'Mensajes',
    },
    {
      link: '/dashboard/modgallery',
      name: 'Galleria de Inicio',
    },
    {
      link: '/dashboard/modgallery',
      name: 'Galleria de Inicio',
    },
    {
      link: '/dashboard/modprogramas',
      name: 'Programas',
    },
    {
      link: '/dashboard/modequipotecnico',
      name: 'Equipo Técnico',
    },
    {
      link: '/dashboard/modbases',
      name: 'Bases',
    },
    {
      link: '/dashboard/modmultimedia',
      name: 'Multimedia',
    },
    {
      link: '/dashboard/modcooperation',
      name: 'Cooperación',
    },
    {
      link: '/dashboard/propuestas',
      name: 'Propuestas',
    },
  ];

  return (
    <>
      <div className="container max-w-none w-full py-8 md:px-12 px-6">
        <span className="text-2xl mb-1 mt-4 mr-2 font-extrabold">Página UAM:</span>
        <a href="https://uam-page.vercel.app/" target="_blank" className="font-bold tracking-wide text-pink-700 mb-2 text-lg" rel="noreferrer">
          Enlace
        </a>
        <div className="flex flex-wrap gap-6 mt-6">
          {pages.map((page, index) => {
            return (
              <Link href={page.link} key={index}>
                <button className="md:w-44 h-40 w-full p-2 border border-white text-white flex bg-black/80">
                  <span className="">{page.name}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
