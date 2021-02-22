import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import coverImg from "@Assets/images/shanghai-skyline.png";
import profileImage from "@Assets/images/profile.jpeg";
import followerImage from "@Assets/images/followers.png";
import mediaIcon from "@Assets/images/gallery.png";
import { UserPost } from "@Components/Basic";
import backImage from "@Assets/images/back.png";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ACCOUNT_TIME_LINE_QUERY } from "@Libs/Queries/getAccountTimeLineQuery";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { IArticlePost } from "@Libs/Dtos/articlePost.interface";
import { GET_ACCOUNT_PROFILE_QUERY } from "@Libs/Queries/getAccountProfileQuery";
import { IAccountProfile } from "@Libs/Dtos/accountProfile.interface";
import { Box, Button, Center, Checkbox, CheckboxGroup, Container, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState as useStateReact } from 'react';
import { useState } from "@hookstate/core";
import { useCallback } from "react";
import React from "react";
import { CloseIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import settingIcon from "@Assets/images/settings.png";
import { ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE, ACCOUNT_SETTING_PAGE_ROUTE, CHAT_PAGE_ROUTE } from "src/Routes/contants";
import flagIcon from "@Assets/images/black_flag.png";
import { useStorage } from "@Libs/Hooks";
import { v4 as uuidV4 } from 'uuid';
import { CREATE_POST_MUTATION } from "@Libs/Mutations/createPostMutation";
import { CREATE_ROOM_MUTATION } from "@Libs/Mutations/createRoomMutation";
import { FormatString } from "src/Commons/Strings/utils";
import { REPORT_USER_MUTATION } from "@Libs/Mutations/reportUserMutation";
import removeIcon from "@Assets/images/close_red.png";
import addIcon from "@Assets/images/add_white.png";
import avatarUploadIcon from "@Assets/images/cloud-computing.png";
import { GET_ACCOUNT_MEDIAS_QUERY } from "@Libs/Queries/getAccountMediasQuery";
import { IAccountMedia } from "@Libs/Dtos/accountMedia.interface";
import { UPDATE_MEDIAS_MUTATION } from "@Libs/Mutations/updateMediasMutation";
import { UPDATE_AVATAR_MUTATION } from "@Libs/Mutations/updateAvatarMutation";

const chatStyle = {
    width: "134px",
    height: "24px",
    marginRight: "10px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "#5458F7",
    border: "solid 0px",
}
const followerStyle = {
    width: "50px",
    height: "24px",
    backgroundColor: "white",
    borderRadius: "12px",
    display: "flex",
    border: "solid 1px #F2F2F2",
    justifyContent: "center",
};

const MasterDetailCnt = (props: { val: string, cnt: string }) => {
    return (
        <div style={{ margin: "5px" }}>
            <h6 style={{ marginBottom: "3px" }}>{props.val}</h6>
            <p style={{ fontSize: "10px", color: "#9597A1", marginBottom: "5px" }}>{props.cnt}</p>
        </div>
    );
};

interface IReportPopupProp {
    accountId: string | null;
    currentAccountId: string;
}

const ReportPopupFC = (props: IReportPopupProp) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { register, handleSubmit } = useForm();
    const [reportUserAction] = useMutation(REPORT_USER_MUTATION);
    const { authToken } = getAuthInfo();

    const onReportSubmit = useCallback(
        async (data: any) => {
            const reason = Object.values(data).filter(item => item !== false).join(',') || "Spam";
            await reportUserAction({
                variables: {
                    account_id: props.accountId,
                    auth_token: authToken,
                    receiver_id: props.currentAccountId,
                    reason: reason,
                    related_post_id: ""
                }
            })

            onClose()
        }, []
    );

    return (
        <>
            <Box boxSize="20px" marginRight="10px"
                onClick={onOpen}>
                <Image src={flagIcon} boxSize="100%" />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report User</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onReportSubmit)}>
                        <ModalBody>
                            <Stack direction="column">
                                <Checkbox name="spam" value="Spam information" ref={register}>Spam information.</Checkbox>
                                <Checkbox name="sex" value="Sex, 18+, FWB ..." ref={register}>Sex, 18+, FWB ...</Checkbox>
                                <Checkbox name="uncensored" value="False and uncensored information." ref={register}>False and uncensored information.</Checkbox>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
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

interface IFConnectionProps {
    currentAccountId: string;
    isOwn: boolean;
}

const FConnection = (props: IFConnectionProps) => {
    const router = useRouter();
    const { accountId, authToken } = getAuthInfo();
    const [createRoomAction] = useMutation(CREATE_ROOM_MUTATION);

    const handleRouteToAccountSettingPage = useCallback(
        async () => {
            await router.push(ACCOUNT_SETTING_PAGE_ROUTE);
        }, [],
    )
    const handleRouteToAccountMessagePage = useCallback(
        async () => {
            if (props.isOwn) {
                await router.push(CHAT_PAGE_ROUTE)
            } else {
                // const {data, error} 
                const _dat = await createRoomAction({
                    variables: {
                        account_id: accountId,
                        auth_token: authToken,
                        receiver_id: props.currentAccountId
                    }
                });
                const roomId: string = _dat.data?.userCreateRoom.roomId;

                await router.push(FormatString(ACCOUNT_ROOM_MESSAGE_PAGE_ROUTE, `${roomId}`))

            }
        }, [],
    )

    return (
        <div >
            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto auto", borderSpacing: "5px", width: "100%", paddingLeft: "10px" }}>
                <MasterDetailCnt val="142" cnt="Posts" />
                <MasterDetailCnt val="7.4M" cnt="Followers" />
                <MasterDetailCnt val="117" cnt="Following" />
            </div>
            <div style={{ display: "flex" }}>
                <button style={chatStyle} onClick={() => handleRouteToAccountMessagePage()}>
                    Message
                </button>
                {
                    props.isOwn ? (
                        <Box boxSize="20px" marginRight="10px" onClick={() => handleRouteToAccountSettingPage()}>
                            <Image src={settingIcon} boxSize="100%" />
                        </Box>

                    ) : (
                            <ReportPopupFC accountId={accountId} currentAccountId={props.currentAccountId} />
                        )
                }

            </div>
        </div >
    );
};

interface IProfileInfo {
    bio: string;
    name: string;
    job?: string;
    link?: string;
}

const ProfileInformation = (props: IProfileInfo) => {
    const normalCnt = {
        marginBottom: "5px",
        color: "#9597A1",
    };
    return (
        <div style={{ marginTop: "20px", width: "250px" }}>
            <h5 style={{ marginBottom: "1px", fontWeight: "bold" }}>{props.name}</h5>
            <p style={normalCnt}>Software/Developer</p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}><span style={{ fontWeight: "bold" }}>Bio:</span> {props.bio || "This is Ho Chi Minh City, where I live and she is also here."}</p>
            <a href="http://facebook.com">{props.link || "abchub.com"}</a>
        </div>
    );
};

const AccountTimeLine = (props: any) => {
    const { accountId, authToken } = getAuthInfo();


    const currentAccountId: string = props.accountId;
    const { error, loading, data } = useQuery(GET_ACCOUNT_TIME_LINE_QUERY, {
        variables: {
            account_id: currentAccountId,
            auth_token: authToken
        }
    })

    if (error) {
        return <div>Error when get account timeline</div>
    }
    if (loading) {
        return null;
    }

    const articlePorts: Array<IArticlePost> = data.accountTimeline.articlePosts;

    return (
        <>
            {
                articlePorts.map((post, idx) => (
                    <UserPost
                        key={idx}
                        isDetail={false}
                        cnt={post.content}
                        accountId={currentAccountId}
                        medias={post.medias}
                        num_comments={post.userCommentCount}
                        num_reacts={post.userReactCount}
                        id={post.id || ""}
                        react_status={post.reactStatus}
                    />
                ))
            }
        </>
    )
}


interface IImagePreviewProps {
    imgSrc: string;
    onClose: () => any;
}
const UploadedImagePreview = (props: IImagePreviewProps) => {
    return (
        <Box position="relative" boxSize="100px" padding="10px">
            <Box position="absolute" boxSize="15px"
                top="-5px"
                right="10px" onClick={() => props.onClose()}>
                <CloseIcon boxSize="100%" color="#ff0000" />
            </Box>
            <Box overflow="hidden" boxSize="100%">
                <Image boxSize="100%" src={props.imgSrc} />
            </Box>
        </Box>
    )
}

const AccountPostCreateFC = (props: any) => {
    const router = useRouter()
    const selectedDataFiles = useState([]);
    const [selectedFiles, setSelectedFiles] = useStateReact([]);
    const { register, handleSubmit } = useForm();
    const { accountId, authToken } = getAuthInfo();
    const [createPostAction] = useMutation(CREATE_POST_MUTATION);


    const handleOnUploadFiles = (event: any) => {
        const files: FileList = event.target.files;

        const crtDataFiles: Array<any> = [...selectedDataFiles.value];
        for (let idx = 0; idx < files.length; idx++) {
            const _file = files[idx];

            const reader = new FileReader();
            reader.onload = () => {
                crtDataFiles.push(reader.result)
                selectedDataFiles.set(crtDataFiles as Array<never>)
            }
            reader.readAsDataURL(_file)
            setSelectedFiles([...selectedFiles as never[], _file as never])
        }
    }

    const fileUploadAction = useCallback(
        () => {
            document.getElementById("fileButton")?.click();
        }, [],
    )

    const onRemoveUploadedImage = (file: string) => {
        let crtFiles: Array<any> = [...selectedDataFiles.value];
        const index = crtFiles.indexOf(file);
        if (index !== -1) {
            crtFiles.splice(index, 1)
            selectedDataFiles.set(crtFiles as Array<never>)
        }
    }
    const onPostSubmit = useCallback(
        async (formData: any) => {
            console.log(formData)
            console.log(selectedDataFiles.value)

            const mediaData: Array<any> = [];
            console.log(selectedFiles.length);
            for (let idx = 0; idx < selectedFiles.length; idx++) {
                const _file = selectedFiles[idx];
                const { data, error } = await useStorage("abc", `account/posts/${uuidV4()}.png`, _file)

                if (data) {
                    mediaData.push({ url: data.publicUrl, type: 0 })
                }
            }

            console.log(mediaData)
            const _dat = await createPostAction({
                variables: {
                    account_id: accountId,
                    auth_token: authToken,
                    content: formData['content'],
                    medias: mediaData
                }
            })

            router.reload()

        }, [selectedFiles],
    )



    return (
        <Container {...props} padding="10px 5px">
            <form onSubmit={handleSubmit(onPostSubmit)}>
                <Box w="100%" h="100px" bg="#F2F2F2" borderRadius="10px" >
                    <Textarea
                        name="content"
                        boxSize="100%"
                        placeholder="Please speak up about your feelings"
                        color="black"
                        focusBorderColor="none"
                        ref={register}
                    />
                </Box>
                <Box className="image-uploader-area" display="flex"
                >
                    {
                        selectedDataFiles.value.map(
                            (file, idx) => (
                                <UploadedImagePreview key={idx} imgSrc={file} onClose={() => onRemoveUploadedImage(file)} />
                            )
                        )
                    }
                </Box>
                <Box
                    justifyContent="end"
                    display="flex"
                    w="100%"
                    margin="10px 0px"
                >
                    <Box margin="0px 10px">
                        <input type="file" id="fileButton" multiple hidden onChange={(event) => handleOnUploadFiles(event)} />
                        <Button borderRadius="full"
                            color="#00A3FF"
                            bg="#FF5BEF"
                            fontSize="15px"
                            border="solid white 1px"
                            onClick={() => fileUploadAction()}
                        >
                            <Box display="flex">
                                <Box margin="2px">
                                    <Image boxSize="20px" src={mediaIcon} />
                                </Box>
                                <Text lineHeight="25px">
                                    Photos
                                </Text>
                            </Box>
                        </Button>
                    </Box>
                    <Button type="submit"
                        borderRadius="0px"
                        bg="#995AFF"
                        color="white"
                        w="70px"
                    >
                        Post
                    </Button>
                </Box>
            </form>
        </Container>
    )
};

interface IMediaFrameProp {
    index: number;
    img_src: string | null;
    handleCaptureImage: (target: any) => any;
    handleRemoveOrAddImageAction: () => any;
    is_own: boolean;
}
const MediaFrameFC = (props: IMediaFrameProp) => {
    const isEmpty = !props.img_src;

    return (
        <Box
            minHeight="150px"
            position="relative"

        >
            <Box boxSize="100%" bg="#e0e4e9" borderRadius="8px" overflow="hidden">
                <Image boxSize="100%" src={props.img_src || ""} />
            </Box>
            <input type="file" accept="image/*" id={`image-uploader-id-${props.index}`} onChange={(event) => props.handleCaptureImage(event.target)} hidden />
            <Box boxSize="15px" borderRadius="full"
                position="absolute"
                right="-7px"
                bottom="-7px"
                bg={isEmpty ? "red" : "white"}
                padding="2px"
                onClick={() => props.handleRemoveOrAddImageAction()}
                hidden={props.is_own === false}>
                <Image boxSize="100%" src={isEmpty ? addIcon : removeIcon} />
            </Box>
        </Box >
    );
}

interface IMediaGalleryProp {
    currentAccountId: string;
}

const MediaGalleryFC = (props: IMediaGalleryProp) => {
    const { authToken, accountId } = getAuthInfo();
    const isOwn = accountId === props.currentAccountId;
    const [medias, setMedias] = useStateReact<Array<string>>([]);
    const [startIdx, setStartIdx] = useStateReact(0);
    const [updateMediasAction] = useMutation(UPDATE_MEDIAS_MUTATION);


    const handleRemoveOrAddImageEvent = useCallback(
        async (idx: number) => {
            console.log(`Remove or add item at ${idx}`);

            if (idx <= medias.length - 1) {
                const crtMedias = medias;
                crtMedias.splice(idx, 1)
                setMedias(crtMedias)
                setStartIdx(startIdx + 9)

                await updateMediasAction(
                    {
                        variables: {
                            account_id: props.currentAccountId,
                            auth_token: authToken,
                            medias: crtMedias.map(
                                _m => {
                                    return {
                                        url: _m,
                                        type: "PHOTO"
                                    }
                                }
                            )
                        }
                    }
                )

            } else {
                document.getElementById(`image-uploader-id-${idx}`)?.click();
            }
        }, [medias, startIdx]);

    const captureAndUploadImg = async (target: any) => {
        if (target.files && target.files.length !== 0) {
            const file = target.files[0];

            const { error, data } = await useStorage("abc", `accont/medias/photos/${uuidV4()}.png`, file);

            if (data) {
                const upCommingMedias: Array<string> = [...medias, data["publicUrl"]]
                setMedias(upCommingMedias)
                await updateMediasAction({
                    variables: {
                        auth_token: authToken,
                        account_id: props.currentAccountId,
                        medias: upCommingMedias.map(
                            _m => {
                                return {
                                    url: _m,
                                    type: "PHOTO"
                                }
                            }
                        )
                    }
                })
            }
            if (error) {
                console.log(`Can't upload image: ${error.message}`)
            }
        }
    }

    const { error, loading, data } = useQuery(GET_ACCOUNT_MEDIAS_QUERY, {
        variables: {
            account_id: props.currentAccountId,
            auth_token: authToken
        }
    });

    useEffect(
        () => {
            if (data) {
                const fetchedMedias: Array<IAccountMedia> = data.accountMedias || [];

                setMedias(fetchedMedias.filter(_m => _m.type === "PHOTO").map(_m => _m.url))
            }
        }, [data]
    )

    if (error) {
        return <div>Error when loading medias.</div>
    }
    if (loading) {
        return null;
    }


    return (
        <>
            <SimpleGrid minChildWidth="80px" columns={3} spacing="10px">
                {
                    [...Array(9)].map((item, idx) => {
                        return (
                            <MediaFrameFC key={idx + startIdx} index={idx} img_src={medias[idx]} handleRemoveOrAddImageAction={() => handleRemoveOrAddImageEvent(idx)} handleCaptureImage={captureAndUploadImg} is_own={isOwn} />
                        )
                    })
                }
            </SimpleGrid>
        </>
    )
};


interface IAvatarFCProp {
    avatarUrl: string;
    currentAccountId: string;
}

const AvatarFC = (props: IAvatarFCProp) => {
    const router = useRouter();
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { accountId, authToken } = getAuthInfo();
    const isOwn = accountId === props.currentAccountId;
    const { register, handleSubmit } = useForm();
    const [updateAvatarAction] = useMutation(UPDATE_AVATAR_MUTATION);
    const [preAvt, setPreAvt] = useStateReact<string | ArrayBuffer | null>("");


    const handleUploadAvatarAction = useCallback(
        async (_dat: any) => {
            const avatarFile = _dat.avatar[0]

            const { data, error } = await useStorage("abc", `accounts/${props.currentAccountId}/avatars/${uuidV4()}.png`, avatarFile)

            if (data) {
                await updateAvatarAction({
                    variables: {
                        account_id: props.currentAccountId,
                        auth_token: authToken,
                        data: {
                            mediaUrl: data["publicUrl"],
                            type: "PHOTO"
                        }
                    }
                });
            }

            // Clear data and close popup
            setPreAvt("");
            onClose();
            // Reload page
            router.reload();
        }, [preAvt]
    );

    const handleShowUpPreviewAvatar = useCallback(
        (target: any) => {
            if (target.files && target.files.length > 0) {
                const _file = target.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    setPreAvt(reader.result)
                }
                reader.readAsDataURL(_file);
            }
        }, [preAvt]
    );

    const handleOnClocsePopup = useCallback(
        () => {
            setPreAvt("");
            onClose();
        }, [preAvt]
    );

    const onAvatarClick = useCallback(
        () => {
            if (isOwn) {
                onOpen();
            }
        }, []
    )



    return (
        <>
            <Box boxSize="80px" overflow="hidden" borderRadius="full"
                onClick={onAvatarClick}>
                <Image alt="Profile" boxSize="100%" src={props.avatarUrl} />
            </Box>
            <Modal isOpen={isOpen} onClose={handleOnClocsePopup} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Avatar</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(handleUploadAvatarAction)}>
                        <ModalBody>
                            <Center>
                                {preAvt === "" ? (
                                    <Box boxSize="50px" onClick={() => document.getElementById("avatar-upload-id")?.click()}>
                                        <Image boxSize="100%" src={avatarUploadIcon} />
                                    </Box>
                                ) : (
                                        <Box boxSize="200px">
                                            <Image boxSize="100%" src={preAvt as string} />
                                        </Box>
                                    )}
                            </Center>
                            <input ref={register} name="avatar" type="file" id="avatar-upload-id" onChange={(event) => handleShowUpPreviewAvatar(event.target)} hidden />
                        </ModalBody>
                        <ModalFooter>
                            <Center w="100%">
                                <Button type="submit">Update</Button>
                            </Center>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

interface IAccountProfileProp {
    accountId: string;
}

const AccountProfile: NextPage<any, any> = (props: IAccountProfileProp) => {
    const router = useRouter();

    const currentAccountId: string = props.accountId;
    const { accountId, authToken } = getAuthInfo();
    const isOwn = useState(accountId === currentAccountId)

    const { error, data, loading } = useQuery(GET_ACCOUNT_PROFILE_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: currentAccountId
        }
    })

    if (error) {
        return <div>Error when get account profile</div>
    }
    if (loading) {
        return null
    }
    const accountProfile: IAccountProfile = data.accountProfile;

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <div style={{ position: "fixed", height: "35px", width: "35px", top: "15px", left: "15px", zIndex: 1 }} onClick={() => router.back()}>
                <img src={backImage} alt="X" height="100%" width="100%" />
            </div>
            <div style={{ height: "58%" }}>
                <div style={{ height: "218px" }}>
                    <img src={coverImg} alt="Cover" height="100%" width="100%" />
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: "0%", top: "10px" }}>
                        <FConnection isOwn={isOwn.value} currentAccountId={currentAccountId} />
                    </div>
                    <div style={{ marginLeft: "15px", marginTop: "15px" }}>
                        <AvatarFC avatarUrl={accountProfile.avatarUrl ? accountProfile.avatarUrl : profileImage} currentAccountId={currentAccountId} />
                        <ProfileInformation
                            bio={accountProfile.bio}
                            name={`${accountProfile.firstName} ${accountProfile.lastName}`} job={accountProfile.school} />
                    </div>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <Tabs isFitted colorScheme="purple">
                    <TabList focusBorderColor="none" border="none" outline="none">
                        <Tab>Timeline</Tab>
                        <Tab>Photos</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel padding="0px">
                            <>
                                {
                                    isOwn.value && (
                                        <AccountPostCreateFC w="100%" bg="#F8F8F8" />
                                    )
                                }
                                <AccountTimeLine accountId={currentAccountId} />
                            </>
                        </TabPanel>
                        <TabPanel>
                            <MediaGalleryFC currentAccountId={currentAccountId} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div >
    )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            accountId: context.params.idx
        },
    }
}


const Extended = withTranslation("common")(AccountProfile);

export default Extended;
