import { useRef } from 'react';
import { useAuth } from '@hooks/use-auth';

export default function Home() {
  const formRef = useRef(null);
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    auth.signIn(data);
  };

  return (
    <div className='bg-[url("../assets/images/background-login.png")] bg-[length:100%_100%] w-full min-h-screen max-w-none flex'>
      <div className="bg-black/40 w-full flex">
        <form
          className="w-[400px] flex flex-col border border-white px-5 py-12 bg-black/80 gap-8 my-auto ml-16 text-white shadow-[0_35px_30px_-15px_rgba(240,240,240,0.3)]"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h3 className="font-bold text-xl">Ingresa a tu cuenta</h3>
          <input className="border border-white bg-black/80 p-1" placeholder="Correo Electrónico" type="email" id="email" name="email" />
          <input className="border border-white bg-black/80 p-1" placeholder="Contraseña" type="password" id="password" name="password" />
          <button type="submit" className="self-center py-1 px-3 border border-white bg-black/50 hover:text-white/80 hover:border-white/80">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
