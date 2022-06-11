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
  ];

  return (
    <>
      <div className="container max-w-none w-full py-8 md:px-12 px-6">
        <div className="flex flex-wrap gap-6">
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
