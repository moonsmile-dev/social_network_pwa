import { Box, Button, Center, Container, Image, Input, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import passwordIcon from "@Assets/images/key.png";
import showIcon from "@Assets/images/eye.png";
import privateIcon from "@Assets/images/private.png";
import { useState } from "@hookstate/core";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface IPasswordViewFCProps {
    title: string;
    name: string;
    register: (args: any) => any
}

const PasswordViewFC = (props: IPasswordViewFCProps) => {
    const showPass = useState(false)

    return (
        <Box w="100%" margin="10px 0px">
            <Text color="#717171">{props.title}</Text>
            <Box display="flex" w="100%"
                margin="10px 0px">
                <Center w="15%">
                    <Image boxSize="35px" src={passwordIcon} />
                </Center>
                <Center w="70%">
                    <Input type={showPass.value ? "text" : "password"}
                        name={props.name}
                        ref={props.register({ required: true, minLength: 6 })}
                        border="none"
                        focusBorderColor="none" />
                </Center>
                <Center w="15%" onClick={() => showPass.set(!showPass.value)}>
                    <Image boxSize="35px" src={showPass.value ? privateIcon : showIcon} />
                </Center>
            </Box>
            <Box h="2px" borderRadius="full" w="100%" bg="#9C9C9C" />
        </Box>
    )
}

const AccountPasswordChange: NextPage<any, any> = (props: any) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onChangePasswordSubmit = (data: any) => console.log(data);
    const router = useRouter();

    const handleRouteBackPage = useCallback(
        () => {
            router.back()
        },
        [],
    )


    return (
        <PageContainer>
            <Container className="Header">
                <Box boxSize="35px"
                    margin="10px 0px"
                    className="Backbutton"
                    onClick={() => handleRouteBackPage()}>
                    <Image boxSize="100%" src={backIcon} opacity="50%" />
                </Box>
            </Container>
            <Center w="100%"
                padding="20px 0px">
                <Text fontWeight="bold"
                    fontSize="32px">Change Password</Text>
            </Center>

            <Container className="Main"
                padding="50px 20px">
                <form onSubmit={handleSubmit(onChangePasswordSubmit)}>
                    <PasswordViewFC title="Old password" name="old_password" register={register} />
                    <PasswordViewFC title="New password" name="new_password" register={register} />
                    <PasswordViewFC title="Confirm new password" name="confirm_new_password" register={register} />

                    <Center w="100%"
                        padding="50px 0px">
                        <Button w="250px"
                            h="50px"
                            color="white"
                            bg="#8542F2"
                            border="solid #B280D0 1px"
                            borderRadius="full"
                            type="submit">
                            Change password
                        </Button>
                    </Center>
                </form>
            </Container>
        </PageContainer>
    )
}



const Extended = withTranslation("common")(AccountPasswordChange);

export default Extended;

