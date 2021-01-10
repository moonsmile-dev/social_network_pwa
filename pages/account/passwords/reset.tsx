import { Box, Center, Container, Image, Text, Button } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import React from "react";

import backIcon from "@Assets/images/back.png";
import FlexInput from "@Components/Basic/FlexInput";
import passwordIcon from "@Assets/images/key.png";
import passwordExpandIcon from "@Assets/images/eye.png";
import { useRouter } from "next/router";
import { ACCOUNT_SIGN_IN_PAGE_ROUTE } from "src/Routes/contants";

const AccountPasswordReset: NextPage<any, any> = () => {
    const router = useRouter();

    const handleResetPasswordAction = async () => {
        await router.push(ACCOUNT_SIGN_IN_PAGE_ROUTE)
    }


    return (
        <PageContainer>
            <Box position="fixed"
                top="10px"
                left="10px"
                boxSize="30px" onClick={() => router.back()}>
                <Image src={backIcon} opacity="60%" />
            </Box>
            <Container h="180px" className="header">
                <Center boxSize="100%">
                    <Text fontWeight="bold" fontSize="30px">Reset password</Text>
                </Center>
            </Container>
            <Container className="password_inputs">
                <FlexInput
                    name="New password"
                    placeHolder="Input your new password"
                    iconUrl={passwordIcon}
                    iconExpand={passwordExpandIcon}
                    hideContent={true}
                />
                <FlexInput
                    name="Confirm new password"
                    placeHolder="Input your confirm new password"
                    iconUrl={passwordIcon}
                    iconExpand={passwordExpandIcon}
                    hideContent={true}
                />
            </Container>

            <Container
                position="fixed"
                bottom="10px"
                h="20%"
            >
                <Center boxSize="100%">
                    <Button w="250px"
                        h="50px"
                        borderRadius="full"
                        border="solid #B280D0 1px"
                        bg="#8542F2"
                        onClick={() => handleResetPasswordAction()}
                    >
                        <Text fontWeight="bold" color="white">
                            Reset password
                        </Text>
                    </Button>
                </Center>
            </Container>
        </PageContainer>
    )
}
const Extended = withTranslation("common")(AccountPasswordReset);

export default Extended;
