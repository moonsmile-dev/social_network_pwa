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
import { Box, Button, Center, Checkbox, CheckboxGroup, Container, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useState as useStateReact } from 'react';
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
    accountId: string;
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
}

const scrollTabStyle = {
    height: "40px",
    width: "100%",
    backgroundColor: "#FAFAFA",
    display: "inline-grid",
    gridTemplateColumns: "auto auto"
};
interface IAccountProfileProp {
    cover: string;
    avtImg: string;
}

const AccountProfile: NextPage<any, any> = (props: any) => {
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
                        <div style={{ height: "80px", width: "80px", overflow: "hidden", borderRadius: "50%" }}>
                            <img alt="Profile" height="100%" width="100%" src={accountProfile.avatarUrl ? accountProfile.avatarUrl : profileImage} />
                        </div>
                        <ProfileInformation
                            bio={accountProfile.bio}
                            name={`${accountProfile.firstName} ${accountProfile.lastName}`} job={accountProfile.school} />
                    </div>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <div style={scrollTabStyle}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ lineHeight: "40px", color: "#8987FF" }}>Timeline</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ lineHeight: "40px", color: "#CFCFCF" }}>Photos</h5>
                    </div>
                </div>

                <div>
                    {
                        isOwn.value && (
                            <AccountPostCreateFC w="100%" bg="#F8F8F8" />
                        )
                    }
                    <AccountTimeLine accountId={currentAccountId} />
                </div>
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
