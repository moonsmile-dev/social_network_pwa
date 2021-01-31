import { Box, Button, Center, Container, Image, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import { useCallback } from "react";
import { useRef } from "react";
import backIcon from "@Assets/images/back.png";
import { useState } from "@hookstate/core";
import cameraIcon from "@Assets/images/photo-camera-interface-symbol-for-button.png";
import { useRouter } from "next/router";


const AccountVerifies: NextPage<any, any> = (props: any) => {
    const imgSrc = useState("")
    const router = useRouter()

    const handleBackPage = useCallback(() => {
        router.back()
    }, [])

    const captureImg = useCallback(
        (target: any) => {
            if (target.files) {
                if (target.files.length !== 0) {
                    const file = target.files[0];
                    const newUrl = URL.createObjectURL(file);
                    imgSrc.set(newUrl);
                }
            }
        }, []
    )

    const openCamera = useCallback(
        () => {
            document.getElementById("capture-img-id")?.click();
        }, []
    )

    const submitPassportImage = useCallback(
        () => {
            console.log(imgSrc.value)
        }, []
    )


    return (
        <PageContainer>
            <Container display="flex" className="header">
                <Box boxSize="35px" margin="10px 0px" onClick={() => handleBackPage()}>
                    <Image boxSize="100%" src={backIcon} opacity="50%" />
                </Box>
                <Center w="100%" margin="0px 10px">
                    <Text fontSize="25px" fontWeight="bold" color="#0066FF">Account Verify</Text>
                </Center>
            </Container>
            <Container padding="20px">
                {imgSrc.value === "" ? (
                    <Center h="400px">
                        <input accept="image/*" type="file" id="capture-img-id" capture="environment" onChange={(event) => captureImg(event.target)} hidden />
                        <Box bg="transparent" onClick={() => openCamera()}
                            padding="10px"
                            border="solid #E5E5E5 1px"
                            borderRadius="10px">
                            <Center bg="">
                                <Box boxSize="45px">
                                    <Image boxSize="100%" src={cameraIcon} />
                                </Box>
                                <Box margin="0px 10px">
                                    <Text>Capture password</Text>
                                </Box>
                            </Center>
                        </Box>
                    </Center>
                ) : (
                        <Box w="100%"
                            h="400px">
                            <Image boxSize="100%" src={imgSrc.value} alt="No Images" />
                        </Box>
                    )}

            </Container>
            <Container className="header" padding="50px 0px">
                <Center>
                    <Box bg="#8542F2" padding="10px 20px" w="60%" borderRadius="full"
                        onClick={() => submitPassportImage()}>
                        <Center>
                            <Text color="white" fontWeight="bold">Submit</Text>
                        </Center>
                    </Box>
                </Center>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountVerifies);

export default Extended;
