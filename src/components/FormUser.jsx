import { useRef, useState } from 'react'
import { useAuth } from '@hooks/use-auth';

const FormUser = () => {
  const formRef = useRef(null);

  const { signUp, error, setError } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if(!/[a-záéíóú]{3,260}/i.test(data.name)){
      setError('El nombre no puede contener menos de 3 o más de 260 caracteres');
      return
    }
    else if(!/[\w\.]{5,30}\+?\w{0,10}@[\w\.\-]{3,}\.\w{2,3}/i.test(data.email)){
      setError('Usuario de email invalido');
      return
    }
    else if(!/.{8,1024}/.test(data.password)){
      setError('La contraseña debe contener un minimo de 8 caracteres');
      return
    }
    else if(formData.get('confirm') !== data.password){
      setError('La contraseña no coincide');
      return
    }

    signUp(data)
      .then((res) => {
        if (res) {
          setError(null);
          window.location = '/dashboard'
        };
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <div className='w-full h-full flex px-2'>
      <form 
        className='m-auto md:w-min w-full flex flex-col bg-black/70 text-yellow-500 md:py-12 md:px-24 px-4 py-6 my-10 gap-3'
        ref={ formRef }
        onSubmit={ handleSubmit } >
        <h3 className='text-2xl font-bold tracking-wider text-yellow-300 mb-2'>
          Agregar Usuario
        </h3>
        <label 
          htmlFor='name' 
          className='font-bold' >Nombre:</label>
        <input 
          id='name' 
          name='name' 
          placeholder='Ingrese un nombre'
          className='w-full md:w-[390px] p-1 bg-coolGray-700 hover:bg-coolGray-600 transition-colors text-white' />
        <label 
          htmlFor='email' 
          className='font-bold' >Correo Electrónico:</label>
        <input 
          id='email' 
          name='email' 
          type='email' 
          placeholder='Ingrese un correo electronico'
          className='w-full md:w-[390px] p-1 bg-coolGray-700 hover:bg-coolGray-600 transition-colors text-white' />
        <label 
          htmlFor='password' 
          className='font-bold' >Contraseña:</label>
        <input 
          id='password' 
          name='password' 
          type='password' 
          placeholder='********'
          className='w-full md:w-[390px] p-1 bg-coolGray-700 hover:bg-coolGray-600 transition-colors text-white' />
          <label 
          htmlFor='confirm' 
          className='font-bold' >Confirmar Contraseña:</label>
        <input 
          id='confirm' 
          name='confirm' 
          type='password' 
          placeholder='********'
          className='w-full md:w-[390px] p-1 bg-coolGray-700 hover:bg-coolGray-600 transition-colors text-white' />
          {
            error  ? <span className="h-10 text-red-500 text-lg max-w-[390px]">
                            { error }
                          </span> : <span className="h-10"></span>
          }
        <button 
          type='submit'
          className='bg-gray-900 hover:bg-gray-800 transition-colors font-bold text-yellow-100 self-start py-2 px-7 mt-4' >
          Agregar
        </button>
      </form>
    </div>
  )
}

export default FormUser