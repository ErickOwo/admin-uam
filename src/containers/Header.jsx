import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from "@hooks/use-auth";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const { user, logOut, auth, } = useAuth();
  const [ dropMenu, setDropMenu ] = useState(false);

  const router = useRouter();
  if(router.pathname == "/") return 

  // auth();

  return (
    <>
      <header className='w-full bg-black/90 text-yellow-400 flex fixed h-20 z-20 select-none'>
        <nav className="w-full flex relative">
          <Link href='/dashboard'>
            <button className="list-none py-1 px-2 m-4 w-28 bg-gray-900 hover:bg-gray-800 transition-colors">Inicio</button>
          </Link>
          <button  
            className="ml-auto mr-8 flex mt-auto mb-5" 
            onClick={()=> setDropMenu(!dropMenu)} >
            <FaAngleDown className="mt-auto mr-1 mb-1" />
            <p>
              {user?.email}
            </p>
          </button>
          {
            dropMenu ? <div className="absolute bg-white right-2 mt-20 w-52 p-1" >
              <Link href='/singup'>
                <button 
                  className="p-3 hover:bg-slate-300 w-full text-center transition-colors"
                  onClick={ () => setDropMenu(false) }  >
                  Agregar Usuario
                </button>
              </Link>
                <button 
                  className="p-3 hover:bg-slate-300 w-full text-center transition-colors" >
                    Editar Perfil
                </button>
              <button 
                className="p-3 hover:bg-slate-300 w-full text-center transition-colors"
                onClick={() => {
                  logOut();
                  setDropMenu(false);
                }}  >
                  Cerrar Sesión
              </button>
            </div> : null
          }
        </nav>
      </header>
    </>
  )
}

export default Header