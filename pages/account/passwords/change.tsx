import { Box, Button, Center, Container, Image, Input, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PasswordViewFC } from "@Components/Basic/Input/PasswordView";

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

