import { useEffect, useRef, useState } from 'react';

type IWebSocket = (url: string, verify: boolean)=>any

const useWebSocket:IWebSocket = (url, verify) => {
  const ws = useRef<WebSocket | null>();
  // 默认为json格式
  const [wsData, setData] = useState<string>('');
  const [readyState, setReadyState] = useState({ key: 0, value: '正在连接中' });

  useEffect(() => {
    if (verify) { webSocketInit(); }
    return () => {
      ws.current?.close();
    };
  }, [url, verify]);

  const createSocket = () => {
    const readyStateArr = [
      { key: 0, value: '正在连接中' },
      { key: 1, value: '已连接' },
      { key: 2, value: '连接已关闭' },
      { key: 3, value: '连接已关闭或未连接成功' },
    ];

    try {
      // 把ws的实例赋值给 wsRef
      ws.current = new WebSocket(url);

      ws.current!.onopen = () => {
        setReadyState(readyStateArr[ws.current!.readyState ?? 0]);
      };
      ws.current!.onclose = () => {
        setReadyState(readyStateArr[ws.current!.readyState ?? 0]);
      };
      ws.current!.onerror = () => {
        setReadyState(readyStateArr[ws.current!.readyState ?? 0]);
      };

      ws.current!.onmessage = (e) => {
        setData(e.data);
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  // 初始化socket
  const webSocketInit = () => {
    if (!ws || ws.current?.readyState === 3) {
      createSocket();
    }
  };
  // 关闭socket
  const closeSocket = () => {
    ws.current?.close();
  };
  // 重新连接
  const reconnect = () => {
    try {
      closeSocket();
      ws.current = null;
      createSocket();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const send = (data:any) => {
    if (data) {
      const newData = JSON.stringify(data);
      ws.current?.send(newData);
    } else {
      // eslint-disable-next-line no-console
      console.log('发送数据为空');
    }
  };
  // wsData : onMessage得到的数据
  // send: 给服务端发送数据
  // readyState: 当前连接的状态
  // closeSocket: 关闭链接
  // reconnect: 重连
  return [wsData, send, readyState, closeSocket, reconnect];
};

export default useWebSocket;
