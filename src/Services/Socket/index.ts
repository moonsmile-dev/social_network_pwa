import React, { useEffect } from 'react';
import * as io from 'socket.io-client';
import { useState as useStateReact } from 'react';


export const useSocket = (url: string) => {
    console.log(url);
    const [socket, setSocket] = useStateReact<any>(null)

    useEffect(() => {
        // console.log(`Test socket!`)
        const _socket = io.io(url, { transports: ['websocket'] })

        setSocket(_socket)

        function cleanup() {
            _socket.disconnect()
        }
        return cleanup

    }, [])

    return socket
}