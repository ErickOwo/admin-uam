import { useEffect, useState } from 'react';
import useSWR from 'swr';
import endPoints from '@services/api';
import { getData } from '@services/api/requests';
import { useRouter } from 'next/router';

const Messages = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { data: messages, error } = useSWR(endPoints.messagesData.get, getData);

  useEffect(() => {
    setData(messages?.messages);
  }, [messages]);

  return (
    <div className="max-w-none w-full min-h-screen text-white p-6">
      <h3 className="font-bold text-2xl">Mensajes</h3>
      <div className="my-5 flex flex-wrap gap-4">
        {data?.map((message, index) => {
          return (
            <div className="flex flex-col bg-black/90 border border-white w-[350px] p-4" key={index}>
              <p>
                <span className="font-bold">Nombre: </span>
                {message.name}
              </p>
              <p>
                <span className="font-bold">Email: </span>
                {message.email}
              </p>
              <p>
                <span className="font-bold">Teléfono: </span>
                {message.phone}
              </p>
              <p className="font-bold">Mensaje: </p>
              <p className="p-2 mt-2 border border-white h-32 overflow-auto">{message.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
