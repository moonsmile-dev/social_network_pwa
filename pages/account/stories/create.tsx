import { Box, Button, Center, Container, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import { useRouter } from "next/router";
import { AiFillCamera, AiOutlineArrowRight } from "react-icons/ai";
import { IoMdPhotos } from "react-icons/io";
import { useCallback, useState as useStateReact } from "react";
import { v4 as uuidV4 } from 'uuid';
import { useStorage } from "@Libs/Hooks";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useMutation } from "@apollo/client";
import { CREATE_STORY_MUTATION } from "@Libs/Mutations/createStoryMutation";

const PhotoSelectionFC = (props: any) => {
    const [imgEncode, setImgEncode] = useStateReact<any>("");
    const [preImg, setPreImg] = useStateReact<string | ArrayBuffer | null>("");
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { accountId, authToken } = getAuthInfo();
    const [createStoryAction] = useMutation(CREATE_STORY_MUTATION);

    const onImageReceiverUploadEvent = useCallback(
        (target: any) => {
            if (target.files && target.files.length > 0) {
                const _file = target.files[0];
                setImgEncode(_file);

                const reader = new FileReader();
                reader.onload = () => {
                    setPreImg(reader.result);
                    onOpen();
                }
                reader.readAsDataURL(_file);
            }
        }, [preImg, imgEncode]
    );

    const handleAddStoryEvent = useCallback(
        async () => {
            if (preImg && imgEncode) {
                const { data, error } = await useStorage("abc", `accounts/${accountId}/stories/photos/${uuidV4()}.png`, imgEncode)

                if (data) {
                    await createStoryAction({
                        variables: {
                            account_id: accountId,
                            auth_token: authToken,
                            content: "",
                            media_url: data["publicUrl"]
                        }
                    });
                }
                onClose();
            }
        }, [preImg]
    );

    const handleOnClosePopup = useCallback(
        () => {

            // remove image
            setPreImg("");
            // close popup
            onClose();
        }, [preImg]
    );

    return (
        <>
            <input type="file" accept="image/*" id="image-input-id" onChange={(event) => onImageReceiverUploadEvent(event.target)} hidden />
            <Modal isOpen={isOpen} onClose={handleOnClosePopup} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={1}>
                            <Box minH="250px">
                                <Image boxSize="100%" src={preImg as string} />
                            </Box>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit"
                            bg="transparent"
                            onClick={() => handleAddStoryEvent()}>
                            <Center boxSize="100%">
                                <Text>Add to Story</Text>
                                <Box margin="0px 5px">
                                    <Icon boxSize="25px" as={AiOutlineArrowRight} />
                                </Box>
                            </Center>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const PREVIEW_IMAGES = [
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-1.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-2.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-3.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-4.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-5.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-6.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-7.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-8.png",
    "http://localhost:1338/file_streams/abc/accounts/stories/preview/bing-wallpaper-9.png",
]

const AccountIdxStoriesCreate: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    return (
        <PageContainer>
            <Container display="flex"
                position="fixed"
                top="0%"
                className="header"
                bg="white">
                <Box boxSize="35px"
                    margin="15px 0px"
                    onClick={() => router.back()}>
                    <Image boxSize="100%" src={backIcon} />
                </Box>
                <Center w="100%">
                    <Text fontSize="24px" fontWeight="bold" color="#0066FF">Add Story</Text>
                </Center>
            </Container>
            <Container className="Main">
                <Container boxSize="100%"
                    padding="100px 0px"
                    className="options">
                    <Center>
                        <SimpleGrid columns={2} spacing={10}>
                            <Container minH="100px" minW="130px" bg="#fc5858"
                                borderRadius="15px">
                                <Center boxSize="100%">
                                    <Icon as={AiFillCamera} boxSize="35px" />
                                    <Text>Camera</Text>
                                </Center>
                            </Container>
                            <Container
                                boxSize="100px"
                                bg="#41d6ff"
                                minH="100px"
                                minW="130px"
                                borderRadius="15px"
                                onClick={() => document.getElementById("image-input-id")?.click()}
                            >
                                <Center boxSize="100%">
                                    <Icon as={IoMdPhotos} boxSize="35px" />
                                    <Text>Photos</Text>
                                </Center>
                            </Container>
                        </SimpleGrid>
                    </Center>
                </Container>
                <PhotoSelectionFC />
                <Container w="100%"
                    padding="0px">
                    <SimpleGrid columns={3} spacing={1}>
                        {
                            [...Array(9)].map((item, idx) => {
                                return (
                                    <Box key={idx} minHeight="150px" bg="gray">
                                        <Image boxSize="100%" src={PREVIEW_IMAGES[idx]} />
                                    </Box>
                                )
                            })
                        }
                    </SimpleGrid>
                </Container>
            </Container>
        </PageContainer>
    )
};

const Extended = withTranslation("common")(AccountIdxStoriesCreate);

export default Extended;