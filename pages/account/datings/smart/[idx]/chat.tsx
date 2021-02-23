import { Box, Button, Center, Checkbox, Container, Flex, Grid, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState as useStateReact } from "react";

import goOutIcon from "@Assets/images/out.png";
import flagIcon from "@Assets/images/flag.png";
import { ClapSpinner } from "react-spinners-kit";
import loveActionIcon from "@Assets/images/heart_action.png";
import { useRouter } from "next/router";
import { ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE, DATING_PAGE_ROUTE } from "src/Routes/contants";
import { useSocket } from "@Services";
import { EXIT_SMART_ROOM_EVENT, GOTO_NORMAL_ROOM_EVENT, JOIN_SMART_ROOM_EVENT, NEW_MEM_JOINED_SMART_CHAT_EVENT, NEW_SMART_MSG_EVENT, NOTIFY_PARTNER_EXIT_ROOM_EVENT, REACT_SMART_ROOM_EVENT, REPORT_SMART_CHAT_EVENT, SEND_SMART_MSG_EVENT } from "@Services/Socket/contants";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useState } from "@hookstate/core";
import { FormatString } from "src/Commons/Strings/utils";
import { useForm } from "react-hook-form";

const styles = {
    boderTxt: {
        textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
    }
}

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

interface IReportUserSmartChatProp {
    reportCallback: (reason: string) => any;
}

const ReportUserSmartChatFC = (props: IReportUserSmartChatProp) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { register, handleSubmit } = useForm();

    const onReportUserSmartChatSubmit = (data: any) => {
        const reason = Object.values(data).filter(item => item !== false).join(',') || "Spam";

        props.reportCallback(reason);
        onClose();
    };

    return (
        <>
            <Box boxSize="60px" padding="10px" onClick={onOpen}>
                <Image src={flagIcon} />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report User</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onReportUserSmartChatSubmit)}>
                        <ModalBody>
                            <Stack direction="column">
                                <Checkbox name="spam" value="Spam information" ref={register}>Spam information.</Checkbox>
                                <Checkbox name="sex" value="Sex, 18+, FWB ..." ref={register}>Sex, 18+, FWB ...</Checkbox>
                                <Checkbox name="uncensored" value="False and uncensored information." ref={register}>False and uncensored information.</Checkbox>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                            <Button
                                border="none"
                                variant="ghost"
                                type="submit"
                            >Submit</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

interface IWaiterLoadingProps {
    onWaitingTimeout: () => {}
}

const WaiterLoadingFC = (props: IWaiterLoadingProps) => {
    const [timer, setTimer] = useStateReact(180);
    useEffect(() => {
        const runner = setTimeout(() => {
            if (timer === 0) {
                clearTimeout(runner)

                props.onWaitingTimeout();

            }

            setTimer(Math.max(timer - 1, 0));
        }, 1000)
        return () => {
            clearTimeout(runner);
        }
    }, [timer])

    return (
        <Flex>
            <ClapSpinner size={20} frontColor="white" />
            <Text marginLeft="10px" color="#D049FF" fontWeight="bold">{`${timer}s`}</Text>
        </Flex>
    )
};

interface IMessageData {
    senderId: string;
    content: string;
}

const AccountDatingMatchedSmartChat: NextPage<any, any> = () => {
    const router = useRouter();
    const roomId = router.query.idx as string || "";
    const [messages, setMessages] = useStateReact<Array<IMessageData>>([]);
    const socket = useSocket(process.env.NEXT_PUBLIC_SN_SOCKET_API || "");
    const { accountId, authToken } = getAuthInfo();
    const [showReaction, setShowReaction] = useStateReact(true);
    const [typingMsgContent, setTypingMsgContent] = useStateReact("");

    const handleGoOutSmartRoom = useCallback(
        async () => {
            if (socket) {
                console.log("Notify goout smart room.")
                socket.emit(EXIT_SMART_ROOM_EVENT, { roomId: roomId, accountId: accountId });
            }
            await router.push(DATING_PAGE_ROUTE);
        }, [socket]
    )

    const registerSocketListenerEvents = useCallback(
        () => {
            if (socket) {
                socket.on(NEW_SMART_MSG_EVENT, (data: any) => {
                    console.log(`New msg data: ${JSON.stringify(data)}`)
                    const msg: IMessageData = {
                        senderId: data.accountId,
                        content: data.message.content
                    };

                    setMessages([msg, ...messages]);
                });
                socket.on(NEW_MEM_JOINED_SMART_CHAT_EVENT, (data: any) => {
                    console.log(`New member joined: ${JSON.stringify(data)}`)
                });
                socket.on(GOTO_NORMAL_ROOM_EVENT, async (data: any) => {
                    await router.push(FormatString(ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE, `${roomId}`))
                });

                socket.on(NOTIFY_PARTNER_EXIT_ROOM_EVENT, async (data: any) => {
                    await handleGoOutSmartRoom();
                });
            }
        }, [messages, socket]
    );

    useEffect(() => {
        registerSocketListenerEvents();
        // action
        if (socket) {
            socket.emit(JOIN_SMART_ROOM_EVENT, { accountId: accountId, roomId: roomId });
        }
    }, [messages, socket])

    const handleSendMsgAction = useCallback(
        () => {
            if (typingMsgContent !== "") {
                const sendMsgData = {
                    roomId: roomId,
                    senderId: accountId,
                    message: { content: typingMsgContent }
                }

                socket.emit(SEND_SMART_MSG_EVENT, sendMsgData);
                setTypingMsgContent("");
            }
        }, [typingMsgContent, socket]
    );

    const handleReactSmartRoomAction = useCallback(
        () => {
            if (socket) {
                socket.emit(REACT_SMART_ROOM_EVENT, { accountId: accountId, roomId: roomId })

                setShowReaction(false)
            }

        }, [socket]
    );

    const handleReportSmartRoomAction = useCallback(
        async (reason: string) => {
            if (socket) {
                socket.emit(REPORT_SMART_CHAT_EVENT, { roomId: roomId, accountId: accountId, reason: reason });

                // go out room
                await handleGoOutSmartRoom();
            }
        }, [socket]
    );

    const handleTimeoutSmartChatEvent = useCallback(
        async () => {
            await handleGoOutSmartRoom();
        }, [socket]
    );

    return (
        <PageContainer>
            <Box className="header" position="fixed" h="80px" w="100%" bg="#672AB6">
                <Center boxSize="100%">
                    <Grid templateColumns="repeat(3, 1fr)" gap={20}>
                        <Box boxSize="60px" onClick={() => handleGoOutSmartRoom()}>
                            <Image src={goOutIcon} />
                        </Box>
                        <Box boxSize="60px" >
                            <Center boxSize="100%">
                                <WaiterLoadingFC onWaitingTimeout={handleTimeoutSmartChatEvent} />
                            </Center>
                        </Box>
                        <ReportUserSmartChatFC reportCallback={(reason) => handleReportSmartRoomAction(reason)} />
                    </Grid>
                </Center>
            </Box>
            <Box className="banner" position="fixed" top="95px" h="30px" w="100%" bg='#F03FFF'>
                <Center boxSize="100%">
                    <Text fontWeight="bold" fontSize="10px" color="white">180s life time, Let’s press heart to unlimited chatting</Text>
                </Center>
            </Box>
            <Box className="input_area"
                position="fixed"
                bottom="20px"
                left="20px"
                right="10px"
                h="45px"
                borderRadius="5px"
                bg="#EDD0FF"
                border="solid white 1px">
                <Flex boxSize="100%">
                    <Input h="100%" w="80%" border="none" focusBorderColor="none" outline="none" placeholder="Input your mind here" color="white"
                        value={typingMsgContent} onChange={(event) => setTypingMsgContent(event.target.value)} />
                    <Center w="20%" display="flex"
                        paddingRight="5px" justifyContent="end"
                        onClick={() => handleSendMsgAction()}>
                        <Text fontWeight="bold" color="#0085FF" {...styles.boderTxt}>SEND</Text>
                    </Center>
                </Flex>
            </Box>
            <Box className="love_action" position="fixed"
                boxSize="65px" bg="#F03FFF" top="50%" right="10px"
                borderRadius="full"
                border="solid white 1px"
                padding="10px"
                hidden={!showReaction}
                onClick={() => handleReactSmartRoomAction()}>
                <Image src={loveActionIcon} />

            </Box>
            <Box
                className="chat_area"
                boxSize="100%"
                padding="100px 0px 85px 0px"
                height="100vh"
                bg="#7F43FF"
            >
                <Box
                    boxSize="100%"
                    display="flex"
                    flexDirection="column-reverse"
                >
                    {
                        [...messages].map((msg: IMessageData, idx: number) => {
                            return (
                                <MessageComponent key={idx} msg={msg.content} isMe={accountId === msg.senderId} />
                            )
                        })
                    }
                </Box>
            </Box>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountDatingMatchedSmartChat);

export default Extended;

