import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postData, putData, getData } from '@services/api/requests';
import useSWR from 'swr';

const Form = ({ 
    nameLabel, 
    descriptionLabel, 
    urlAPIMultimedia, 
    redirect, 
    type='imagen', 
    mode='Agregar',
    placeLabel,
    parrafsLabel,
    linkLabel,
    infoDiv }) => {
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
  const [ defaultData, setDefaultData ] = useState({title: undefined, description: undefined, place: undefined, parrafs: [], linkcooperation: undefined, mediaURL: undefined, public_id: undefined});
  const [ typeBoder, setTypeBorder ] = useState('normal');
  const [ sections, setSections ] = useState([{subtitle: undefined, text: undefined, type: undefined}])
  const [ hiddenNum, setHiddenNum ] = useState(1);

  const { id } = router.query;
 
  const { data } = useSWR(id ?`${urlAPIMultimedia}/${router.query.id}` : null, getData);

  useEffect(()=>{
    if(mode == 'Modificar'){
      setDefaultData({
        title: data?.name || data?.title, 
        description: data?.position || data?.description, 
        place: data?.place, 
        parrafs: data?.parrafs,
        linkcooperation: data?.linkcooperation,
        mediaURL: data?.imgURL || data?.videoURL, 
        public_id: data?.public_id,
        _id: data?._id,
      });
      setMultimediaUrl(data?.imgURL || data?.videoURL);
      if(data?.textContent){
        setSections(data?.textContent.map(objectToParse=>{
          const object = JSON.parse(objectToParse);
          const info = {
            subtitle: object.subtitle,
            text: textConversor(JSON.parse(object.text).parrafs),
            type: object.type
          }
          return info;
        }));
        setHiddenNum(data?.textContent.length)
      }
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
    if(!/video\/.*/i.test(e?.dataTransfer?.files[0]?.type) && type == "video" && !e?.dataTransfer?.files[0]?.type){
      setMessage({text: "No se admiten archivos que no sean de tipo video", type: 'error'});
      setDragModal(false);
      return
    }
    if(!/image\/.*/i.test(e?.dataTransfer?.files[0]?.type) && type == "imagen" && !e?.dataTransfer?.files[0]?.type){
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

    const info = [];

    if(formData.get('num')){

      for(let i=0 ; i < formData.get('num'); i++){
        info.push(JSON.stringify({
          "subtitle": formData.get(`subtitle${i}`),
          "text": formData.get(`text${i}`),
          "type": formData.get(`type${i}`)
        }))
        formData.delete(`subtitle${i}`);
        formData.delete(`text${i}`);
        formData.delete(`type${i}`)
      } 
      formData.append("info",JSON.stringify({"data": info}))
    }
    
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
        setMessage({text: 'Fallo en la API', type: "error"})
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

  const addCamp = () =>{
    const formData = new FormData(formRef.current);
    for(let i=0 ; i <= formData.get('num'); i++){
      if(formData.get('num') != i){
        sections[i].subtitle == formData.get(`subtitle${i}`)
        sections[i].text == formData.get(`text${i}`)
        sections[i].type == formData.get(`type${i}`)
      } else{
        sections.push({subtitle: undefined, text: undefined, type: undefined})
        setSections(sections);
        setHiddenNum(++hiddenNum)
      }    
    }
  }

  const deleteCamp = () =>{
    sections.pop();
    setSections(sections);
    setHiddenNum(--hiddenNum)
  }

  const textConversor = array =>{
    let text = ``;
    for(let i = 0; i < array.length; i++){
      if(i == 0) text += array[i]
      else text += `\n\n${array[i]}`
    }
    return text;
  }

  return (
    <div className="w-full flex justify-center md:p-4 py-4 px-2 items-start">
      <div 
        className="flex gap-3 relative md:flex-row flex-col min-w-full md:min-w-fit"
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
           </div> : null
        }
        <form className="flex flex-col bg-black/80 lg:w-[500px] p-8 items-start gap-2 text-white" ref={formRef} onSubmit={handleSubmit}>
          <label 
            className="font-bold"
            htmlFor='title' >
              { nameLabel }
            </label>
          <input 
            className="bg-black/40 max-w-[400px] w-full p-1" 
            name="title" 
            id="title" 
            defaultValue= { data ? defaultData.title : undefined}
            required />
          <label 
            className="font-bold"
            htmlFor='description' >
              { descriptionLabel }
            </label>
          <input 
            className="bg-black/40 max-w-[400px] w-full p-1" 
            name="description" 
            id="description" 
            defaultValue={ data ? defaultData.description : undefined}
            required />
          {
            placeLabel ? <>
            <label 
              className="font-bold"
              htmlFor='place' >
                { placeLabel }
            </label>
            <input 
              className="bg-black/40 max-w-[400px] w-full p-1" 
              name="place" 
              id="place" 
              defaultValue={ data ? defaultData.place : undefined}
              required /> 
            <label 
              className="font-bold"
              htmlFor='parrafs' >
                { parrafsLabel }
            </label>
            <textarea 
              className="bg-black/40 max-w-[400px] w-full p-1 min-h-[150px]" 
              name="parrafs" 
              id="parrafs" 
              defaultValue={ textConversor(defaultData?.parrafs)} /> 
            </> 
            : null
          }
          {
            linkLabel ? <>
              <label 
                className="font-bold"
                htmlFor='linkcooperation' >
                  { linkLabel }
              </label>
              <input 
                className="bg-black/40 max-w-[400px] w-full p-1" 
                name="linkcooperation" 
                id="linkcooperation" 
                defaultValue={ data ? defaultData.linkcooperation : undefined}
                required />
            </> : null
          }
          {
            infoDiv ? <>
              <span className='font-bold mb-2 text-lg'>Ingresar información: </span>
              <div className='w-full flex justify-end'>
                <button 
                  type='button' 
                  className='mr-10 bg-black/70 p-2'
                  onClick={()=> deleteCamp()} >
                    Eliminar Campo 
                </button>
                <button 
                  type='button' 
                  className='mr-10 bg-black/70 p-2'
                  onClick={()=> addCamp()} >
                    Agregar Campo 
                </button>
              </div>
              <input type='hidden' id='num' name='num' value={hiddenNum} />
              <div className='overflow-auto w-full h-[430px] flex flex-col gap-2 mb-4'>
                {
                  sections.map((section, index) =>(
                    <div key={ index } className='flex flex-col gap-2'> 
                      <label 
                        className="font-bold"
                        htmlFor={`subtitle${index}`} >
                          Subtítulo:
                      </label>
                      <input 
                        className="bg-black/40 max-w-[400px] w-full p-1" 
                        name={`subtitle${index}`} 
                        id={`subtitle${index}`} 
                        defaultValue={ section.subtitle }
                        required />
                      <label 
                        className="font-bold"
                        htmlFor={`text${index}`} >
                          Texto:
                      </label>
                      <textarea 
                        className="bg-black/40 max-w-[400px] w-full min-h-[200px] p-1" 
                        name={`text${index}`} 
                        id={`text${index}`}
                        defaultValue={ section.text }
                        required />
                      <label 
                        className="font-bold"
                        htmlFor={`type${index}`} >
                          Tipo:
                      </label>
                      <select
                        className="bg-black/40 max-w-[400px] w-full p-1 mb-8" 
                        name={`type${index}`} 
                        id={`type${index}`}
                        defaultValue={ section.type } 
                        required >
                          <option value="parraf">Parrafo</option>
                          <option value="list">Lista</option>
                      </select>
                    </div>
                  ))
                }
              </div>
            </> : null
          }
          <label 
            className="py-3 my-3 md:w-2/5 w-max text-center bg-yellow-200 text-black rounded-lg font-bold" 
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
              defaultValue={ data ? defaultData._id : undefined} />
              : null
          }
          {message?.text  
                          ? <span 
                              className="md:h-6 h-12 w-full mb-2"
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
                      : <span className="md:h-6 h-12 w-full mb-2"></span>}
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
          className="w- max-w-[400px] min-h-[380px] flex flex-col bg-black/80 p-3 gap-2" >
          <h3 className="text-white font-bold">Vista Previa</h3>
          {multimediaUrl ? (
            <>
              {
                type == 'imagen' 
                  ? <div className="self-center m-auto">
                      <Image src={multimediaUrl} width="400px" height="300px" />
                    </div>
                  : <div className="self-center m-auto w-full h-[250px] flex justify-center">
                      <video className='h-[250px]' src={multimediaUrl} controls></video>
                    </div>
              }
            </>
          ) : (
            <>
              <div className="md:w-[400px] md:h-full h-[300px] flex">
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