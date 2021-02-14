import {
    Text,
    Center,
    Grid,
    GridItem,
    Image,
    Box,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState as useStateReact } from "react";
import { InfoIcon } from "@chakra-ui/icons";

import backIcon from "@Assets/images/back.png";
import matchOptionIcon from "@Assets/images/match_option.png";
import demoImg from "@Assets/images/abcde.png";
import demo2Img from "@Assets/images/abc.png";
import demo3Img from "@Assets/images/story_image_old.jpeg";
import heartDatingIcon from "@Assets/images/heart-dating.png";
import closeDatingIcon from "@Assets/images/dating_close.png";
import starDatingIcon from "@Assets/images/dating_star.png";
import { useRouter } from "next/router";
import { FormatString } from "src/Commons/Strings/utils";
import { DATING_RECS_DETAIL_PAGE_ROUTE } from "src/Routes/contants";
import { useState } from "@hookstate/core";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useQuery } from "@apollo/client";
import { GET_MATCHER_LIST_QUERY } from "@Libs/Queries/getMatcherListQuery";
import { initializeApollo } from "@Libs/apolloClient";

const styles = {
    container: {
        backgroundColor: "white",
        height: "100vh",
        position: "relative",
    },
    header: {
        backgroundColor: "white",
        height: "59px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        overflow: "hidden",
        zIndex: "2",
        border: "1px solid #38E6FE",
    },
    main: {
        backgroundColor: "white",
        height: "100%",
        paddingTop: "59px",
        // paddingBottom: "94px",
        zIndex: "1",
    },
};

const DatingRecsHeader = (props: any) => {
    const router = useRouter();
    return (
        <div className="Header" style={styles.header as React.CSSProperties}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4} h="100%">
                <GridItem colSpan={1} h="100%">
                    <Center boxSize="100%" onClick={() => router.back()}>
                        <Image src={backIcon} boxSize="35px" />
                    </Center>
                </GridItem>
                <GridItem colStart={2} colEnd={5}>
                    <Center h="100%">
                        <Text
                            fontSize="24px"
                            fontWeight="bold"
                            color="#0066FF"
                        >
                            Let's feel happy
                            </Text>
                    </Center>
                </GridItem>
            </Grid>
        </div>
    )
};

interface IMediaProp {
    url: string;
    type: number;
}
interface IMatcherProp {
    matcherId: string;
    name: string;
    age: number;
    bio: string;
    status: number;
    medias: Array<IMediaProp>;
}

const MatcherFC = (props: IMatcherProp) => {
    const router = useRouter();
    const matcherId: string = props.matcherId;
    const images = props.medias && props.medias.length > 0 && props.medias.filter(_m => _m.type === 0).map(_m => _m.url) || [demoImg, demo2Img, demo3Img];
    const crtPos = useState(0)

    const handleRouteToMatchRecsDetail = async () => {
        await router.push(FormatString(DATING_RECS_DETAIL_PAGE_ROUTE, `${matcherId}`))
    }

    return (
        <>
            <Box
                height="90%"
                width="100%"
                bg="white"
                position="relative"
                borderRadius="10px"
                marginTop="5px"
                overflow="hidden"
                border="solid #7000FF 1px"
            >
                <Image boxSize="100%" src={images[crtPos.value]} fit="cover" />
                <Box className="leftArea"
                    position="absolute"
                    w="50%"
                    h="100%"
                    top="0px"
                    left="0px"
                    bg="transparent"
                    onClick={() => crtPos.set(Math.max(0, crtPos.value - 1))} />
                <Box className="rightArea"
                    position="absolute"
                    w="50%"
                    h="100%"
                    top="0px"
                    right="0px"
                    bg="transparent"
                    onClick={() => crtPos.set(Math.min(images.length - 1, crtPos.value + 1))} />
                <Box
                    position="absolute"
                    top="10px"
                    height="4px"
                    width="100%"
                    paddingLeft="20px"
                    paddingRight="20px"
                >
                    <Grid
                        templateColumns={`repeat(${images.length}, 1fr)`}
                        boxSize="100%"
                    >
                        {[...Array(images.length)].map((_, idx) => (
                            <GridItem key={idx} h="100%" padding="0px 2px">
                                <Box
                                    bg={crtPos.value === idx ? "white" : "#C4C4C4"}
                                    boxSize="100%"
                                    borderRadius="2px"
                                />
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
                <Box
                    position="absolute"
                    bottom="0px"
                    left="10px"
                    height="20%"
                    width="65%"
                    bg="transparent"
                >
                    <Text fontSize="24px" fontWeight="bold" color="white">
                        {`${props.name} * ${props.age}.yo`}
                    </Text>
                    {props.status === 1 ? (
                        <Flex>
                            <Center margin="5px">
                                <Box
                                    h="10px"
                                    w="10px"
                                    bg="#04D832"
                                    borderRadius="100%"
                                    border="solid white 1px"
                                />
                            </Center>
                            <Text fontWeight="bold" color="white" opacity="70%">
                                Recently Active
                            </Text>
                        </Flex>
                    ) : null}
                    <Text opacity="80%" color="white" marginTop="5px">
                        {props.bio || "Hãy làm cánh hoa bay trong bầu trời lặng gió....:)))"}
                    </Text>
                </Box>
                <Box
                    position="absolute"
                    right="20px"
                    bottom="20px"
                    w="30px"
                    h="30px"
                >
                    <InfoIcon
                        h="100%"
                        w="100%"
                        color="white"
                        onClick={() => handleRouteToMatchRecsDetail()}
                    />
                </Box>
            </Box>
        </>
    )
}

const AccountDatingReacs: NextPage<any, any> = () => {
    const router = useRouter()
    const [crtPos, setCrtPos] = useStateReact<number>(0);
    const { accountId, authToken } = getAuthInfo();
    let matchers: Array<IMatcherProp> = []
    const handleReactMatcherAction = async (type: number) => {
        if (crtPos === matchers.length - 1) {
            router.reload()
        } else {
            setCrtPos(Math.min(crtPos + 1, matchers.length - 1));
        }
    }

    const { error, loading, data } = useQuery(GET_MATCHER_LIST_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: accountId
        }
    });

    if (error) {
        return <div>Error when loading list of matchers</div>
    }
    if (loading) {
        return null
    }

    matchers = data.matchers;

    return (
        <div style={styles.container as React.CSSProperties}>
            <DatingRecsHeader />
            <div
                className="Main"
                style={{ ...styles.main as React.CSSProperties, backgroundColor: "#E5E5E5" }}
            >
                {matchers.length > 0 && (<MatcherFC matcherId={matchers[crtPos].matcherId} age={matchers[crtPos].age} name={matchers[crtPos].name} status={matchers[crtPos].status} medias={matchers[crtPos].medias} bio={matchers[crtPos].bio} />)}

                <Box height="10%" width="100%">
                    <Center boxSize="100%">
                        <Grid templateColumns="repeat(3, 1fr)">
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    overflow="hidden"
                                    padding="10px"
                                    onClick={() => handleReactMatcherAction(-1)}
                                >
                                    <Image
                                        boxSize="100%"
                                        src={closeDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    padding="10px"
                                    onClick={() => handleReactMatcherAction(0)}
                                >
                                    <Image
                                        boxSize="100%"
                                        src={starDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    padding="10px"
                                    onClick={() => handleReactMatcherAction(1)}
                                >
                                    <Image
                                        boxSize="100%"
                                        src={heartDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                        </Grid>
                    </Center>
                </Box>
            </div>
        </div>
    );
};

const Extended = withTranslation("common")(AccountDatingReacs);

export default Extended;
