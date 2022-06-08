import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postData, putData, getData } from '@services/api/requests';
import useSWR from 'swr';

const Form = ({ nameLabel, descriptionLabel, urlAPIMultimedia, redirect, type='imagen', mode='Agregar' }) => {
  const router = useRouter();
  const formRef = useRef(null);
  const [ multimediaUrl, setMultimediaUrl ] = useState(null);
  const [ message, setMessage ] = useState({ text: null, type: null });
  const [ dragModal, setDragModal ] = useState(false);
  const [ mensajeModal, setMensajeModal ] = useState({
    text: 'Arrastre aquí un archivo',
    type: 'informative' 
  })
  const [ dragData, setDragData ] = useState(null);
  const [ defaultData, setDefaultData ] = useState({title: null, description: null, mediaURL: null, public_id: null});
  const [ typeBoder, setTypeBorder ] = useState('normal');

  const { id } = router.query;
 
  const { data } = useSWR(id ?`${urlAPIMultimedia}/${router.query.id}` : null, getData);

  useEffect(()=>{
    if(mode == 'Modificar'){
      setDefaultData({
        title: data?.name || data?.title, 
        description: data?.position || data?.description, 
        mediaURL: data?.imgURL || data?.videoURL, 
        public_id: data?.public_id,
        _id: data?._id
      });
      setMultimediaUrl(data?.imgURL || data?.videoURL);
    }
  },[data]);

  const handleDragEnter = e => {
    setDragModal(true);
  };
  const handleDragLeave = e => {
    setDragModal(false);
  };
  const handleDrop = e => {
    e.preventDefault()
    if(!/video\/.*/i.test(e.dataTransfer.files[0].type) && type == "video"){
      setMessage({text: "No se admiten archivos que no sean de tipo video", type: 'error'});
      setDragModal(false);
      return
    }
    if(!/image\/.*/i.test(e.dataTransfer.files[0].type) && type == "imagen"){
      setMessage({text: "No se admiten archivos que no sean de tipo imagen", type: 'error'});
      setDragModal(false);
      return
    }
    dragData = e.dataTransfer.files[0];
    setDragData(dragData)
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.dataTransfer.files[0])
    const sizeData = e.dataTransfer.files[0].size
    reader.addEventListener("progress", event =>{
      setTypeBorder('loading')
      const carga = Math.round(event.loaded / sizeData * 100);
      setMensajeModal({type: 'loading', text: `${carga}% subido`})
    })
    reader.addEventListener('load', event =>{
      const video = new Blob([new Uint8Array(event.currentTarget.result)])
      const url = URL.createObjectURL(video);
      setMultimediaUrl(url);
      setMensajeModal({type: 'loaded', text: `¡Completado!`})
      setTypeBorder('loaded');
      setMessage({text: 'Archivo listo para ser enviado', type: 'readed' })
      setTimeout(()=>{
        setDragModal(false);
        setMensajeModal({
          text: 'Arrastre aquí un archivo',
          type: 'informative' 
        });
      },400)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(formRef.current);
    
    if(mode == 'Agregar' && formData.get('media').size == 0 && !dragData){
      setMessage({
        text: 'Agregue un archivo de imagen o video',
         type: 'error'
      });
      return
    }

    if(dragData) {
      formData.delete('media')
      formData.append('media', dragData);
    }

    if(formData.get('media').size > 100000000){
      setMessage({text: 'archivo demasiado grande para ser enviado', type: 'error'});
      alert('No se pueden agregar archivos que pesen más de 100mb')
      return;
    }

    if(mode == 'Agregar') postData(urlAPIMultimedia, formData)
      .then((res) => {
        setMessage({text: res.message, type: res.type});
        router.push(redirect);
      })
      .catch((e) => {
        console.log('hay un error');
        console.log(e);
      });
    else putData(urlAPIMultimedia, formData)
    .then((res) => {
      setMessage({text: res.message, type: res.type});
      router.push(redirect);
    })
    .catch((e) => {
      setMessage({type: 'error', text: 'Fallo en la API'})
      console.log('hay un error');
      console.log(e);
    });
  };

  const prevMultimedia = (e) => {
    setDragData(null);
    if (!e.target.files[0]) {
      setMessage({text: 'Ningun archivo seleccionado', type: 'error'})
      setMultimediaUrl(null);
      return;
    }
    if(type == 'imagen'){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', (event) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setMultimediaUrl(url);
        setMessage({text: 'Archivo listo para ser enviado', type: 'readed' })
      });
    } else{
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.addEventListener("load",(e)=>{
        const video = new Blob([new Uint8Array(e.currentTarget.result)])
        const url = URL.createObjectURL(video);
        setMultimediaUrl(url);
        setMessage({text: 'Archivo listo para ser enviado', type: 'readed' })
    })
    }
  };

  return (
    <div className="mas-w-none w-full flex justify-center p-4 items-start">
      <div 
        className="flex gap-3 relative"
        onDragEnter={ handleDragEnter } >
        {
          dragModal ? <div 
            className='absolute w-full h-full bg-black/50 z-30 flex text-3xl tracking-widest font-bold' 
            style={
              typeBoder == 'normal' ? {border: '6px dashed #aaa'} :
              typeBoder == 'loading' ? {border: '6px solid #ff6'} : 
              {border: '6px solid #0f0'}
            }
            onDragOver={ e=> e.preventDefault() }
            onDragLeave={ handleDragLeave }
            onDrop={ handleDrop } >
            <span 
              className='m-auto'
              style={ mensajeModal.type == 'informative' ? {color: "#afafaf"} 
                : mensajeModal.type == 'loading' ? {color: "#ff6"}
                : {color: "#0f0"} } >
                { mensajeModal.text }
              </span>
           </div> :null
        }
        <form className="flex flex-col bg-black/80 w-[500px] p-8 items-start gap-2 text-white" ref={formRef} onSubmit={handleSubmit}>
          <label className="font-bold">{ nameLabel }</label>
          <input 
            className="bg-black/40 max-w-[400px] w-full p-1" 
            name="title" 
            id="title" 
            defaultValue= { data ? defaultData.title : null}
            required />
          <label className="font-bold">{ descriptionLabel }</label>
          <input 
            className="bg-black/40 max-w-[400px] w-full p-1" 
            name="description" 
            id="description" 
            defaultValue={ data ? defaultData.description : null}
            required />
          <label 
            className="py-3 my-3 w-2/5 text-center bg-yellow-200 text-black rounded-lg font-bold" 
            htmlFor="media">
            Subir {type}
          </label>
          <input 
            name="media" 
            id="media" 
            type="file" 
            accept={ type == 'imagen' ? 'image/*' : 'video/*' } 
            hidden 
            onChange={prevMultimedia} />

          {
            mode == "Modificar" ? <input
              name="id" 
              id="id" 
              hidden
              defaultValue={ data ? defaultData._id : null} />
              : null
          }
          {message?.text  
                          ? <span 
                              className="h-6 w-full mb-2"
                              style={
                                message.type == 'success' 
                                  ? { color: '#0f0' } 
                                  : message.type == 'readed'
                                    ? {color: '#88f'}
                                    : message.type == 'reading' 
                                      ? {color: '#ff5'}
                                      : {color: '#f00'}  } >
                                { message.text }
                            </span> 
                      : <span className="h-6 w-full mb-2"></span>}
          <button 
            className="font-bold py-1 px-5 text-black" 
            style={ mode == 'Agregar' 
                    ? { backgroundColor: '#2d5' } 
                    : { backgroundColor: '#4aF' }
                  } 
            type="submit"
            onClick={() =>{ 
              const formData = new FormData(formRef.current);
              
              if( formData.get('title') == ""
                  || formData.get('description') == "" ) setMessage({
                    text: 'Llene los campos correspondientes',
                     type: 'error'
                  });
              else if( formData.get('media').size == 0 && mode == "Agregar" && !dragData ) setMessage({
                    text: 'Agregue un archivo de imagen o video',
                     type: 'error'
                  });
              else setMessage({text: 'Enviando Archivo', type: 'reading'});
            }} >
            { mode }
          </button>
        </form>
        <div 
          className="w-[300px] min-h-[380px] flex flex-col bg-black/80 p-3 gap-2"
          style={type == 'imagen' ? {width: '300px'} : {width: '470px'}} >
          <h3 className="text-white font-bold">Vista Previa</h3>
          {multimediaUrl ? (
            <>
              {
                type == 'imagen' 
                  ? <div className="self-center">
                      <Image src={multimediaUrl} width="200px" height="300px" />
                    </div>
                  : <div className="self-center m-auto w-full h-[220px] flex justify-center">
                      <video className='h-[250px]' src={multimediaUrl} controls></video>
                    </div>
              }
            </>
          ) : (
            <>
              <div className="w-full h-full flex">
                <span className="m-auto text-white text-center">{
                  type == 'imagen' ? 'No se ha agregado ninguna imagen.' 
                  : 'No se ha agregado ningun video.'
                }</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form