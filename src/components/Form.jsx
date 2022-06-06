import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { postDataImg } from '@services/api/requests';

const Form = ({ nameLabel, descriptionLabel, url, redirect }) => {
  const router = useRouter();
  const formRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [message, setMessage] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    postDataImg(url, formData)
      .then((res) => {
        setMessage(res.message);
        router.push(redirect);
      })
      .catch((e) => {
        console.log('hay un error');
        console.log(e.response.data.error);
      });
  };

  const prevImage = (e) => {
    if (!e.target.files[0]) {
      setImgUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', (event) => {
      const url = URL.createObjectURL(e.target.files[0]);
      setImgUrl(url);
    });
  };

  return (
    <div className="mas-w-none w-full min-h-screen flex justify-center p-4 items-start">
      <div className="flex gap-3">
        <form className="flex flex-col bg-black/80 w-[500px] p-8 items-start gap-2 text-white" ref={formRef} onSubmit={handleSubmit}>
          <label className="font-bold">{ nameLabel }</label>
          <input className="bg-black/40 max-w-[400px] w-full p-1" name="title" id="title" required />
          <label className="font-bold">{ descriptionLabel }</label>
          <input className="bg-black/40 max-w-[400px] w-full p-1" name="description" id="description" required />
          <label className="py-3 my-3 w-2/5 text-center bg-yellow-200 text-black rounded-lg font-bold" htmlFor="image">
            Subir imagen
          </label>
          <input name="image" id="image" type="file" accept="image/*" hidden onChange={prevImage} required />
          {message ? <span className="text-green-500 h-6 w-full">{message}</span> : <span className="h-6 w-full"></span>}
          <button className="bg-cyan-700 font-bold py-1 px-5" type="submit">
            Enviar
          </button>
        </form>
        <div className="w-[300px] h-[380px] flex flex-col bg-black/80 p-3 gap-2">
          <h3 className="text-white font-bold">Vista Previa</h3>
          {imgUrl ? (
            <>
              <div className="self-center">
                <Image src={imgUrl} width="200px" height="300px" />
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full flex">
                <span className="m-auto text-white text-center">No se ha agregado ninguna imagen.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form