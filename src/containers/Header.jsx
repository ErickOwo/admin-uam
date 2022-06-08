import Link from "next/link";
import { useRouter } from 'next/router';
import jsCookie from "js-cookie";
import { useEffect } from 'react';
import { useAuth } from "@hooks/use-auth";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const { auth, user } = useAuth();
  const router = useRouter();
  if(router.pathname == "/") return 
  useEffect(()=>{
    if(!router.isReady) return
    if(!jsCookie.get('token-uam')) router.push('/');
    else {
      auth();
    };
  },[router.isReady])
  

  return (
    <>
      <header className='w-full bg-black/90 text-yellow-400 flex fixed h-20 z-20 select-none'>
        <nav className="w-full flex ">
          <Link href='/dashboard'>
            <button className="list-none py-1 px-2 m-4 w-28 bg-gray-900 hover:bg-gray-800 transition-colors">Inicio</button>
          </Link>
          <button className="ml-auto mr-8 flex mt-auto mb-5">
            <FaAngleDown className="mt-auto mr-1 mb-1" />
            <p>
              {user?.email}
            </p>
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header