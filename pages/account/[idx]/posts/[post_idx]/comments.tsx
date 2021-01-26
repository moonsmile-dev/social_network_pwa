import { Box, Button, Center, Container, Image, Input, Text, Textarea } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import defaultAvatarIcon from "@Assets/images/monster_1.png";
import defaultAvt2Icon from "@Assets/images/monster_3.png";
import sendIcon from "@Assets/images/send.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback } from "react";

const UserCommentFC = (props: any) => {
    return (
        <Container w="100%"
            padding="0px"
            display="flex"
        >
            <Box boxSize="45px"
                margin="5px"
                borderRadius="full"
                overflow="hidden">
                <Image boxSize="100%" src={defaultAvatarIcon} />
            </Box>
            <Box
                maxW="80%">
                <Container className="TextArea"
                    borderRadius="20px"
                    bg="#D3D3D3"
                    padding="10px 20px"
                >
                    <Text fontWeight="bold">Nguyen Minh Tuan</Text>
                    <Box marginTop="10px">
                        <Text>
                            What are some challenges of real world Kubernetes app? How do you automate Kubernetes? How to cost optimize Kubernetes? These are some of the questions asked in Kubernetes interview.
                        </Text>
                    </Box>
                </Container>

                <Container className="action" display="flex"
                    padding="0px">
                    <Button bg="transparent">
                        Reply
                    </Button>
                    <Button bg="transparent">
                        React
                    </Button>
                </Container>
                <Container className="ThreadArea" w="100%">
                    <Box display="flex">
                        <Box boxSize="30px"
                            borderRadius="full"
                            overflow="hidden"
                            margin="5px">
                            <Image boxSize="100%" src={defaultAvt2Icon} />
                        </Box>
                        <Center>
                            <Text fontWeight="bold"
                                fontSize="15px" marginRight="5px">Eron Mask</Text>
                            <Text fontSize="12px">Calm down, thanks</Text>
                        </Center>
                    </Box>
                </Container>
            </Box>

        </Container>
    )
}

const SendMessageFC = (props: any) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSendMsgSubmit = (data: any) => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSendMsgSubmit)}>
            <Box display="flex" w="100%"
                border="solid #d2d2d2 1px"
                paddingLeft="15px">
                <Center w="80%">
                    <Input name="message"
                        placeholder="send message"
                        borderRadius="full"
                        focusBorderColor="none"
                        ref={register}
                        border="solid black 1px" />
                </Center>
                <Box w="20%" display="flex" justifyContent="end">
                    <Button boxSize="35px"
                        bg="transparent"
                        margin="10px" padding="0px"
                        type="submit">
                        <Image boxSize="100%" src={sendIcon} />
                    </Button>
                </Box>
            </Box>
        </form>
    )
}

const AccountIdxPostComments: NextPage<any, any> = (props: any) => {
    const router = useRouter();
    const handleRouteBackPage = useCallback(
        () => {
            router.back()
        },
        [],
    )


    return (
        <PageContainer>
            <Container className="header"
                display="flex"
                position="fixed"
                top="0px"
                bg="white">
                <Box boxSize="35px"
                    margin="10px 0px"
                    onClick={() => handleRouteBackPage()}>
                    <Image boxSize="100%" src={backIcon} opacity="50%" />
                </Box>
                <Center w="80%" h="55px">
                    <Text fontWeight="bold"
                        color="#0066FF"
                        fontSize="25px">Post comments</Text>
                </Center>
            </Container>
            <Container className="main"
                w="100%"
                bg="#F5F5F5"
                minH="100vh"
                marginTop="55px"
            >
                <UserCommentFC />
            </Container>
            <Container position="fixed"
                bottom="0px"
                left="0px"
                padding="0px"
                w="100%">
                <SendMessageFC />
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountIdxPostComments);

export default Extended;

