import React from 'react';
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
      link: '/dashboard/modequipotecnico',
      name: 'Equipo Técnico',
    },
    {
      link: '/dashboard/modmultimedia',
      name: 'Multimedia',
    },
  ];

  return (
    <>
      <div className="container max-w-none w-full min-h-screen py-8 px-12">
        <div className="flex flex-wrap gap-6">
          {pages.map((page, index) => {
            return (
              <Link href={page.link} key={index}>
                <button className="w-44 h-40 p-2 border border-white text-white flex bg-black/80">
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
