import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import plusIcon from "@Assets/images/add.png";
import sendIcon from "@Assets/images/send.png";
import previousIcon from "@Assets/images/previous.png";
import voiceIcon from "@Assets/images/voicemail.png";
import { useRouter } from "next/router";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES_IN_ROOM_QUERY } from "@Libs/Queries/getMessagesInRoomQuery";
import { State, useState } from "@hookstate/core";
import { useEffect, useMemo, useRef, useState as useStateReact } from "react";
import { initializeApollo } from "@Libs/apolloClient";
import { IMessageChat } from "@Libs/Dtos/messageChat.interface";
import io from 'socket.io-client';
import { useCallback } from "react";
import { useSocket } from "@Services";
import { HELLO_EVENT, JOIN_ROOM_EVENT, NEW_MEM_JOINED_EVENT, NEW_MSG_EVENT, SEND_MSG_EVENT } from "@Services/Socket/contants";

interface IMessage {
    isMe?: boolean;
    msg?: string;
}

interface IShiftText {
    textAlign: undefined | any;
}

const MessageComponent = (props: IMessage) => {
    let posMsgStyle: IShiftText = {
        // left: "10px",
        textAlign: "left",
    }

    let boundedMsgBlock = {
        borderRadius: "10px 10px 10px 0px"
    }

    if (props.isMe) {
        posMsgStyle = {
            // right: "10px",
            textAlign: "right",
        }
        boundedMsgBlock = {
            borderRadius: "10px 10px 0px 10px"
        }
    }
    return (
        <div style={{ display: "block", ...posMsgStyle }}>
            <div style={{ margin: "8px" }}>
                <div className="message_area" style={{ backgroundColor: "white", ...boundedMsgBlock, padding: "10px", maxWidth: "70%", display: "inline-block" }}>
                    <p style={{ margin: "0px", textAlign: "left", wordBreak: "break-all" }}>{props.msg ? props.msg : "Nguyen Minh Tuan"}</p>
                </div>
            </div>
        </div >
    )
}

const OriginMessageListFC = (props: { roomId: string }) => {
    const { accountId, authToken } = getAuthInfo();
    const { error, loading, data } = useQuery(GET_MESSAGES_IN_ROOM_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: accountId,
            room_id: props.roomId
        }
    })

    if (error) {
        return <div>Error when get messages</div>
    }
    if (loading) {
        return null;
    }

    const roomMsgs: Array<IMessageChat> = data.userRoomMessages;
    return (
        <>
            {roomMsgs.map((msg, idx) => (
                <MessageComponent key={idx} isMe={accountId == msg.senderId} msg={msg.content} />
            ))}
        </>
    )
}

const chatInputContainer = {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    right: "0%",
    backgroundColor: "#f2f2f2",
    border: "1px solid white",
} as React.CSSProperties;

const measureInputStyle = {
    fontWeight: "bold",
    border: "none",
    opacity: "70%",
    outline: "none",
    width: "70%",
} as React.CSSProperties;

const centerDisplayStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const AccountChatIdx: NextPage<any, any> = (props: any) => {
    const [messages, setMessages] = useStateReact<Array<any>>([]);
    const typingMsgContent = useState("")
    const socket = useSocket(process.env.NEXT_PUBLIC_SN_SOCKET_API || "");

    const router = useRouter();
    const roomId: any = router.query.chat_idx || "";
    const { accountId, authToken } = getAuthInfo();

    const registerSocketListenerEvents = useCallback(
        () => {
            if (socket) {
                socket.on(NEW_MSG_EVENT, (data: any) => {
                    console.log(`New msg data: ${JSON.stringify(data)}`)
                    const msg = {
                        senderId: data.accountId,
                        content: data.message.content
                    }

                    console.log(`Messages: ${JSON.stringify(messages)}`)
                    setMessages([msg, ...messages])
                });
                socket.on(NEW_MEM_JOINED_EVENT, (data: any) => {
                    console.log(`New member joined: ${JSON.stringify(data)}`);
                });

                socket.on(HELLO_EVENT, (data: any) => {
                    console.log(`hello: ${data}`)
                });
            }
        }, [messages, socket]
    )

    useEffect(() => {
        registerSocketListenerEvents()
        // Action
        if (socket) {
            socket.emit(HELLO_EVENT, { "userId": accountId, "roomId": roomId })
            socket.emit(JOIN_ROOM_EVENT, { "userId": accountId, "roomId": roomId })
        }
    }, [socket, messages])

    const handleSendMessageAction = () => {
        if (typingMsgContent.value !== "") {
            const sendMsgData = {
                roomId: roomId,
                senderId: accountId,
                message: { content: typingMsgContent.value },
            };
            socket.emit(SEND_MSG_EVENT, sendMsgData)
            typingMsgContent.set("")
        }
    }


    return (
        <div style={{ position: "relative", height: '100vh', backgroundColor: "#cfcfcf" }}>
            <div className="chat_header" style={{
                position: "absolute",
                top: "0%",
                left: "0%", right: "0%",
                backgroundColor: "#ca00ff"
            }}>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            height: "35px",
                            width: "35px",
                            margin: "10px",
                        }}
                        onClick={() => router.back()}
                    >
                        <img alt="XXX" height="100%" width="100%" src={previousIcon} />
                    </div>
                    <div className="txtHeaderName" style={{ marginLeft: "10px" }}>
                        <h4 style={{ lineHeight: "50px", color: "white" }}>Nguyen Minh Tuan</h4>
                    </div>
                </div>
                <div className="call_button" style={{ position: "absolute", top: "0%", right: "0%", height: "100%", ...centerDisplayStyle }}>
                    <div style={{ height: "40px", width: "40px", margin: "7px" }}>
                        <img src={voiceIcon} alt="XXX" width="100%" height="100%" />
                    </div>
                </div>
            </div>
            <div className="chat_area" style={{ height: "90%", display: "flex", flexDirection: "column-reverse" }}>
                {
                    [...messages].map((msg: any, idx) => {
                        return (
                            <MessageComponent key={idx} msg={msg.content} isMe={accountId === msg.senderId} />
                        )
                    })
                }
                <OriginMessageListFC roomId={roomId} />
            </div>
            <div className="chat_input_container" style={chatInputContainer} >
                <div className="chat_input" style={{ display: "flex" }}>
                    <div className="icon_container" style={{ padding: "7px" }}>
                        <img alt="XXX" src={plusIcon} height="45px" width="45px" />
                    </div>
                    <input placeholder="Send message" id="message-chat" style={{ ...measureInputStyle, backgroundColor: "inherit" }} value={typingMsgContent.value} onChange={(event) => typingMsgContent.set(event.target.value)} />
                </div>
                <div className="send_icon" style={{ ...centerDisplayStyle, position: "absolute", right: "0%", top: "0%", height: "100%" }}
                    onClick={() => handleSendMessageAction()}>
                    <img src={sendIcon} alt="abc" height="40px" width="40px" />
                </div>
            </div>
        </div>
    )
}

const Extended = withTranslation("common")(AccountChatIdx);

export default Extended;
