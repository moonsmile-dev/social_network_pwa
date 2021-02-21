import NavFooter, { NavPageType } from "@Components/NavFooter";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import avatarIcon from "@Assets/images/profile.jpeg";
import matchSettingIcon from "@Assets/images/match_option.png";
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, useDisclosure } from "@chakra-ui/react";
import smartChatIcon from "@Assets/images/speech-bubble.png";
import datingTraditionIcon from "@Assets/images/handshake.png";
import genderManIcon from "@Assets/images/gender_man.png";
import genderWomanIcon from "@Assets/images/gender_woman.png";
import AuthenticatePageRequired from "@Components/Auths/AuthenticatePageRequired";
import { useRouter } from "next/router";
import { DATING_RECS_PAGE_ROUTE, DATING_SMART_WAITING_PAGE_ROUTE } from "src/Routes/contants";
import React, { useCallback, useEffect, useState as useStateReact } from "react";
import { useState } from "@hookstate/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MATCH_SETTING_QUERY } from "@Libs/Queries/getMatchSettingQuery";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { IMatchSetting } from "@Libs/Dtos/matchSetting.interface";
import { useForm } from "react-hook-form";
import { UPDATE_MATCH_SETTING_MUTATION } from "@Libs/Mutations/updateMatchSettingMutation";

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
        border: "1px solid #38E6FE"
    },
    main: {
        backgroundColor: "white",
        height: "100%",
        paddingTop: "59px",
        paddingBottom: "94px",
        zIndex: "1"
    },
    notifyIcon: {
        textAlign: "center",
        height: "35px",
        width: "35px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
    },
    profileIcon: {
        textAlign: "center",
        height: "40px",
        width: "40px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
    },
    avatarHeader: {
        height: "100%",
        width: "70px",
        top: "0%",
        left: "0%",
        position: "absolute",
    },
    txtHeader: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingLeft: "70px",
        paddingRight: "40px",
        lineHeight: "59px",
    },
    settingHeader: {
        height: "100%",
        width: "40px",
        top: "0%",
        right: "0%",
        position: "absolute",
    }
}

interface IOptionDatingProp {
    bg: string;
    name: string;
    d_txt: string;
    icon_src: string;

    onClick: () => any;
}

const OptionDating = (props: IOptionDatingProp) => {
    return (
        <Box w="100%" h="148px" borderRadius="10px" margin="10px" {...props} justifyContent="center" justifyItems="center" display="flex"
            onClick={props.onClick}>
            <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", display: "flex", justifyItems: "center", justifyContent: "center", padding: "7px" }}>
                    <Image src={props.icon_src} h="70px" w="70px" />
                </div>
                <p style={{ fontSize: "19px", borderColor: "#FFFFFF", fontWeight: "bold", color: "white" }}>{props.name}</p>
                <p style={{ fontSize: "15px", color: "#D3D3D3" }}>{props.d_txt}</p>
            </div>
        </Box>
    );
};


enum Gender {
    MALE,
    FEMALE,
}

interface IUserDatingProps {
    name: string;
    gender: Gender;
    avt_src: string;
    pre_txt: string;
    age: number;
}

const UserDating = (props: IUserDatingProps) => {
    return (
        <div {...props} style={{ backgroundColor: "inherit", width: "100%", padding: "8px", display: "flex" }}>
            <Image
                borderRadius="full"
                boxSize="50px"
                src={props.avt_src}
                alt="XXX"
            />
            <div style={{ paddingLeft: "15px" }}>
                <div style={{ display: "flex", height: "55%" }}>
                    <h3 style={{ fontWeight: "bold", height: "14px" }}>{props.name}</h3>
                    <Box w="60px" h="20px" bg="#9E00FF" borderRadius="10px" margin="0px 5px">
                        <div style={{ display: "flex", margin: "0px 5px", lineHeight: "20px" }}>
                            <p style={{ color: "white" }}><span>{props.age}</span>.yo</p>
                            <Image h="12px" w="12px" margin="5px" src={props.gender == Gender.MALE ? genderManIcon : genderWomanIcon} />
                        </div>
                    </Box>
                </div>
                <div>
                    <p style={{ color: "#717171", fontSize: "12px" }}>{props.pre_txt}</p>
                </div>
            </div>
        </div>
    )
}

const UserDatingSetupFC = (props: any) => {
    const { accountId, authToken } = getAuthInfo();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [minAge, setMinAge] = useStateReact(18);
    const [maxAge, setMaxAge] = useStateReact(21);
    const [gender, setGender] = useStateReact("UN_KNOWN");
    const [maxDistance, setMaxDistance] = useStateReact(1);
    const { register, handleSubmit } = useForm();
    const [updateMatchSettingAction] = useMutation(UPDATE_MATCH_SETTING_MUTATION);

    const handleUpdateMatchSettingAction = useCallback(
        async (data) => {
            await updateMatchSettingAction(
                {
                    variables: {
                        account_id: accountId,
                        auth_token: authToken,

                        min_age: parseInt(data.min_age),
                        max_age: parseInt(data.max_age),
                        max_distance: parseInt(data.max_distance),
                        target_gender: data.gender
                    }
                }
            );

            onClose();
        }, []
    );

    const { data, error, loading, refetch } = useQuery(GET_MATCH_SETTING_QUERY, {
        variables: {
            account_id: accountId,
            auth_token: authToken
        }
    });

    useEffect(
        () => {
            if (data) {
                const matchSetting: IMatchSetting = data.userMatchSetting;
                setMinAge(matchSetting.minAge);
                setMaxAge(matchSetting.maxAge);
                setMaxDistance(matchSetting.maxDistance);
                setGender(matchSetting.targetGender)
            }
        }, [data]
    );

    if (error) {
        return <div>Error when get match setting.</div>
    }
    if (loading) {
        return null;
    }

    return (
        <>
            <div style={styles.settingHeader as React.CSSProperties} onClick={onOpen}>
                <img style={styles.notifyIcon as React.CSSProperties} src={matchSettingIcon} />
            </div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleUpdateMatchSettingAction)}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Min Age</FormLabel>
                                <Box display="flex">
                                    <Slider aria-label="slider-ex-2"
                                        ref={register}
                                        name="min_age"
                                        colorScheme="purple"
                                        defaultValue={minAge} min={18} max={maxAge} onChange={(value) => setMinAge(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Box margin="0px 5px">
                                        <Text>{minAge}</Text>
                                    </Box>
                                </Box>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Max Age</FormLabel>
                                <Box display="flex">
                                    <Slider aria-label="slider-ex-2"
                                        ref={register}
                                        name="max_age"
                                        colorScheme="purple"
                                        defaultValue={maxAge} min={minAge} max={100} onChange={(value) => setMaxAge(value)}>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <SliderThumb />
                                    </Slider>
                                    <Box margin="0px 5px">
                                        <Text>{maxAge}</Text>
                                    </Box>
                                </Box>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <Select defaultValue={gender}
                                    ref={register}
                                    name="gender">
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="UN_KNOWN">Unknown</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Max distance (km)</FormLabel>
                                <FormControl>
                                    <Box display="flex">
                                        <Slider aria-label="slider-ex-1"
                                            ref={register}
                                            name="max_distance"
                                            defaultValue={maxDistance} max={1000} min={1}
                                            onChange={(value) => setMaxDistance(value)}>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                        <Box margin="0px 5px">
                                            <Text>{maxDistance}</Text>
                                        </Box>
                                    </Box>
                                </FormControl>

                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="purple" mr={3} type="submit">
                                Save
                        </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

const AccountDatings: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    const handleRouteToMatchRecs = async () => {
        await router.push(DATING_RECS_PAGE_ROUTE);
    };
    const handleRouteToMatchSmartWaiting = async () => {
        await router.push(DATING_SMART_WAITING_PAGE_ROUTE)
    }

    return (
        <AuthenticatePageRequired>
            <div className="Header" style={styles.header as React.CSSProperties}>
                <div style={styles.avatarHeader as React.CSSProperties}>
                    <img style={styles.profileIcon as React.CSSProperties} src={avatarIcon} alt="X" />
                </div>
                <div style={styles.txtHeader as React.CSSProperties}>
                    <p style={{ color: "#0066FF", fontWeight: "bold", fontSize: "24px" }}>Let's start Dating</p>
                </div>
                <UserDatingSetupFC />
            </div>
            <div className="Main" style={styles.main as React.CSSProperties}>
                <div className="Dating Selection" style={{ width: "100%", border: "1px solid white" }}>
                    <div style={{ display: "flex", margin: "0px 15px" }}>
                        <OptionDating bg="#7000FF" icon_src={smartChatIcon} name="Smart Chat" d_txt="120 onlines" onClick={() => handleRouteToMatchSmartWaiting()} />
                        <OptionDating bg="#FF0000" icon_src={datingTraditionIcon} name="Matching" d_txt="20 updated daily" onClick={() => handleRouteToMatchRecs()} />
                    </div>
                </div>
                <div className="User dating section">
                    {[...Array(10)].map((x, i) =>
                        <UserDating
                            avt_src={avatarIcon}
                            name="Nguyen Minh Tuan"
                            pre_txt="Toi muon ngam binh minh vao buoi toi.... abc =))"
                            age={21}
                            key={i}
                            gender={Gender.MALE}
                        />
                    )}
                </div>
            </div>
            <NavFooter type={NavPageType.DATING} />
        </AuthenticatePageRequired>
    )
}

const Extended = withTranslation('common')(AccountDatings);

export default Extended;
