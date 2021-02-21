import { Box, Center, Container, Flex, Image, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import React, { useCallback, useState as useStateReact } from "react";

import closeIcon from "@Assets/images/cancel_white.png";
import { ClapSpinner } from "react-spinners-kit";
import monsterOneIcon from "@Assets/images/monster_1.png";
import monsterTwoIcon from "@Assets/images/monster_2.png";
import monsterThreeIcon from "@Assets/images/monster_3.png";
import monsterFourIcon from "@Assets/images/monster_4.png";
import monsterFiveIcon from "@Assets/images/monster_5.png";
import { useRouter } from "next/router";
import { FormatString } from "src/Commons/Strings/utils";
import { DATING_SMART_CHAT_PAGE_ROUTE } from "src/Routes/contants";
import { useEffect } from "react";
import { useSocket } from "@Services";
import { EXIT_SMART_CHAT_WAITING_EVENT, FIND_SMART_CHAT_EVENT, FIND_SMART_CHAT_SUCCESS_EVENT } from "@Services/Socket/contants";
import { getAuthInfo } from "src/Commons/Auths/utils";

const styles = {
    container: {
        backgroundColor: "#B56AFF",
        height: "100vh",
        position: "relative",
    },

    spacing: {
        margin: "5px",
    },
};

interface IWaiterLoadingProps {
    onWaitingTimeout: () => {}
}

const WaiterLoadingFC = (props: IWaiterLoadingProps) => {
    const [timer, setTimer] = useStateReact(0);
    useEffect(() => {
        const runner = setTimeout(() => {
            setTimer(timer + 1);

            if (timer === 5 * 60 + 1) {
                clearTimeout(runner);

                props.onWaitingTimeout();
            }
        }, 1000)
        return () => {
            clearTimeout(runner)
        }
    }, [timer])
    return (
        <Box position="relative">
            <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontWeight="bold"
                color="white"
            >
                {`${timer}s`}
            </Text>
            <ClapSpinner size={75} frontColor="white" />
        </Box>
    )
}

const AccountDatingSmartWaiting: NextPage<any, any> = () => {
    const router = useRouter();
    const socket = useSocket(process.env.NEXT_PUBLIC_SN_SOCKET_API || "");
    const { accountId, authToken } = getAuthInfo();
    const handleRouteToChatRoom = useCallback(
        async (roomId: string) => {
            await router.push(FormatString(DATING_SMART_CHAT_PAGE_ROUTE, roomId || "1"))
        }, []
    );

    const handleBackPage = useCallback(
        async () => {
            if (socket) {
                socket.emit(EXIT_SMART_CHAT_WAITING_EVENT, { accountId: accountId })
            }

            router.back();
        }, [socket]
    )

    const registerSocketListenerEvents = useCallback(() => {
        if (socket) {
            socket.on(FIND_SMART_CHAT_SUCCESS_EVENT, async (data: any) => {
                console.log(`Find smart chat success: ${JSON.stringify(data)}`);
                const { roomId } = data;

                await handleRouteToChatRoom(roomId);
            })
        }
    }, [socket])

    useEffect(() => {
        registerSocketListenerEvents();

        if (socket) {
            socket.emit(FIND_SMART_CHAT_EVENT, { accountId: accountId });
        }

    }, [socket])
    return (
        <Container bg="#B56AFF" h="100vh" position="relative">
            <Box
                position="fixed"
                boxSize="25px"
                right="20px"
                top="20px"
                onClick={() => handleBackPage()}
            >
                <Image src={closeIcon} />
            </Box>
            <Box className="main_header" h="30%">
                <Center boxSize="100%">
                    <Box maxW="250px" textAlign="center">
                        <Text fontSize="30px" fontWeight="bold" color="white">
                            Waiting for your future
                        </Text>
                    </Box>
                </Center>
            </Box>
            <Box className="waiting_main" h="40%">
                <Center boxSize="100%">
                    <Box>
                        <Flex alignItems="end" marginBottom="120px">
                            <Image
                                boxSize="40px"
                                bg="white"
                                borderRadius="full"
                                src={monsterOneIcon}
                                {...styles.spacing}
                            />
                            <Image
                                boxSize="50px"
                                borderRadius="full"
                                src={monsterTwoIcon}
                                {...styles.spacing}
                            />
                            <Image
                                boxSize="70px"
                                borderRadius="full"
                                src={monsterThreeIcon}
                                {...styles.spacing}
                            />
                            <Image
                                boxSize="50px"
                                borderRadius="full"
                                src={monsterFourIcon}
                                {...styles.spacing}
                            />
                            <Image
                                boxSize="40px"
                                borderRadius="full"
                                src={monsterFiveIcon}
                                {...styles.spacing}
                            />
                        </Flex>
                        <Center>
                            <WaiterLoadingFC />
                        </Center>
                    </Box>
                </Center>
            </Box>
            <Container
                className="footer_main"
                textAlign="center"
                paddingTop="75px"
            >
                <Text color="white">
                    You’re using the smart chat features. You may have to wait 5
                    mins for finding new parners
                </Text>
            </Container>
        </Container>
    );
};

const Extended = withTranslation("common")(AccountDatingSmartWaiting);

export default Extended;
