// FrontEnd/src/app/page.tsx

'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import MyMsg from '@/components/MyMsg';
import OtherMsg from '@/components/OtherMsg';

export interface IMsg {
  roomId: number;
  userId: string;
  content: string;
  timestamp: Date;
}

let socket: any;

// 랜덤 유저
const userInfo = `test`;

function Index() {
  // connected flag
  const params = useParams();
  const { roomId } = params;

  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>('');

  const socketInitializer = () => {
    socket = io('http://localhost:8000', { transports: ['websocket'] }); // 8000번의 포트에서 io를 가져온다. (websocket이라는 형태로 가져온다.)

    socket.on('connect', () => {
      console.log(userInfo, 'has connected', socket);
      socket.emit('welcome', userInfo);
      setConnected(true);
    }); // 연결될 시에, 나오게 되는 welcome이라는 이름의 함수를 작동시키게 해준다.

    socket.on('error', (error: any) => {
      console.log('error : ', error);
    }); // 에러가 나올 시에, 콘솔에 출력해준다.

    // 이전 대화목록을 받아온다

    socket.emit('joinRoom', Number(roomId));

    socket.on('previousMessages', (messages: IMsg[]) => {
      setChat(messages);
    });

    socket.on('newIncomingMessage', (message: IMsg) => {
      setChat((currentMsg) => [
        ...currentMsg,
        {
          roomId: message.roomId,
          userId: message.userId,
          content: message.content,
          timestamp: message.timestamp,
        },
      ]);

      console.log(userInfo, chat, Date());
    });
  };
  // 소켓 연결

  const scrollRef = useRef<HTMLDivElement | null>(null); // 채팅 쳤을 때 매번 맨 아래로 가도록 scroll을 위한 코드

  useEffect(() => {
    socketInitializer();
    // 브라우저가 꺼지면 소켓 연결 종료
    return () => {
      if (socket) {
        socket.disconnect();
        console.log('socket is gone');
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollIntoView({ behavior: 'smooth' }); // 메시지를 계속 보내다보면, 스크롤이 올라가는데 자동으로 맨 아래로 내려오게끔 도와준다.
  }, [chat]);

  const sendMessage = async () => {
    const message: IMsg = {
      roomId: Number(roomId),
      userId: userInfo,
      content: msg,
      timestamp: new Date(),
    };

    if (msg.trim() !== '') {
      console.log(message);
      // 공백을 메시지로 보내는 것을 방지하기 위해서 제출 전에 trim을 한 번 해줘야 한다.
      socket.emit('createdMessage', message);
      setMsg('');
    }
  };
  return (
    <div className="relative block w-96 h-96 overflow-auto">
      <div className="block border rounded-4 w-480px h-90v m-0 auto mt-32px bg-gray-200 overflow-y-scroll">
        {chat.map((chatInfo, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            {chatInfo.userId === userInfo ? (
              <MyMsg message={chatInfo.content} />
            ) : (
              <OtherMsg user={chatInfo.userId} message={chatInfo.content} />
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex w-480px h-10v m-0 auto mt-12px space-x-2">
        <input
          type="text"
          className="w-3/4 text-lg h-full text-black border"
          value={msg}
          placeholder={connected ? '메시지를 입력하세요' : '연결중입니다...'}
          disabled={!connected}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          onSubmit={sendMessage}
        />
        <button
          type="button"
          className={`w-1/4 h-full ${
            connected ? 'bg-blue-500' : 'bg-gray-300'
          } text-white`}
          onClick={sendMessage}
          disabled={!connected}
        >
          보내기
        </button>
      </div>
    </div>
  );
}

export default Index;
