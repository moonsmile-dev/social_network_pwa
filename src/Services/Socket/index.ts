import React, { useEffect } from 'react';
import * as io from 'socket.io-client';
import { useState as useStateReact } from 'react';


export const useSocket = (url: string): io.Socket => {
    const [socket, setSocket] = useStateReact<any>(null)

    useEffect(() => {
        const _socket = io.io(url, { transports: ['websocket', 'polling'], rejectUnauthorized: false, secure: true })
        _socket.on("connect", () => {
            console.log("Connect to socketio server.")
        })

        setSocket(_socket)
        function cleanup() {
            _socket.disconnect()
        }
        return cleanup
    }, [])
    return socket
}