import React from 'react'

const Propuestas = () => {
  return (
    <div className='bg-black text-yellow-400 w-full h-screen flex flex-col justify-center items-center pb-16 '>
      <h2 className='text-2xl'>Propuestas de Pago</h2>
      <div className='border border-yellow-500 min-w-[450px] p-5 flex flex-col gap-4'>
        <div>
          <h2 className='text-2xl mb-2'>Gratis</h2>
          <ul className='list-disc pl-7 flex flex-col'>
            <li>Cambiar fondos e iconos de la página</li>
            <li>Navegador de página</li>
          </ul>
        </div>
        <div>
          <h2 className='text-2xl mb-2'>Pago por animaciones + Q. 300.00 {"(Prestamo de equipo por 5 meses)"}</h2>
          <ul className='list-disc pl-7 flex flex-col'>
            <li>Animación en sección de bases</li>
            <li>Animación en sección de Cooperación</li>
            <li>Opción para cambiar de fóto en modal del equipo tecnico</li>
            <li>Botón de subir</li>
            <li>Cambio de menú movil </li>
            <li>Indicador de posición en el navegador de la página </li>
          </ul>
        </div>
        <div>
          <h2 className='text-2xl mb-2'>Pago por Administración + Q. 400.00 {"(Prestamo de equipo por 7 meses)"}</h2>
          <ul className='list-disc pl-7 flex flex-col'>
            <li>Notificaciones de mensaje por whatsapp y gmail</li>
            <li>Mejora de interfaz de modificación en sección de Programas</li>
          </ul>
        </div>
        <div>
          <h2 className='text-2xl mb-2'>Propuestas de temas + Q. 250.00 </h2>
          <ul className='list-disc pl-7 flex flex-col'>
            <li>Se presentaran diferentes temas para modificación de página</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Propuestas