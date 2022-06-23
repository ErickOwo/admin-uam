const Propuestas = () => {
  return (
    <div className="bg-black text-yellow-400 w-full min-h-screen flex flex-col justify-center items-center pb-16 ">
      <span className="text-2xl mb-1 mt-4">Página UAM:</span>
      <a href="https://uam-page.vercel.app/" target="_blank" className="text-pink-700 mb-2 text-lg" rel="noreferrer">
        Enlace
      </a>
      <h2 className="text-2xl mb-4">Propuestas de Pago</h2>
      <div className="border border-yellow-500 p-5 flex flex-col gap-4 max-w-[860px]">
        <div>
          <h2 className="text-2xl mb-2">{'Compra del proyecto Q. 300.00 por el proyecto y Q. 150.00 por mantenimiento y host de la aplicación en la web'}</h2>
          <ul className="list-disc pl-7 flex flex-col">
            <li>Cambiar fondos e iconos de la página</li>
            <li>Navegador de página</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl mb-2">Pago por animaciones + Q. 300.00 {'(Prestamo de equipo por 5 meses. En caso de no prestar equipo + Q. 500.00)'}</h2>
          <ul className="list-disc pl-7 flex flex-col">
            <li>Animación en sección de bases</li>
            <li>Animación en sección de Cooperación</li>
            <li>Opción para cambiar de fóto en modal del equipo tecnico</li>
            <li>Botón de subir</li>
            <li>Cambio de menú movil </li>
            <li>Indicador de posición en el navegador de la página </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl mb-2">Pago por Administración + Q. 400.00 {'(Prestamo de equipo por 7 meses. En caso de no prestar equipo + Q. 500.00)'}</h2>
          <ul className="list-disc pl-7 flex flex-col">
            <li>Notificaciones de mensaje por whatsapp y gmail</li>
            <li>Mejora de interfaz de modificación en sección de Programas</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl mb-2">Propuestas de temas + Q. 250.00 </h2>
          <ul className="list-disc pl-7 flex flex-col">
            <li>Se presentaran diferentes temas para modificación de página</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Propuestas;
