import { Button, Center, Container, Text } from "@chakra-ui/react";
import { OTPInput } from "@Components/Basic/Input/OTPInput";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root"
import { NextPage } from "next"
import { useRouter } from "next/router";
import { ACCOUNT_RESET_PASSWORD_PAGE_ROUTE } from "src/Routes/contants";

const AccountPasswordForgotConfirm: NextPage<any, any> = () => {
    const router = useRouter();

    const handleRouteToResetPage = async () => {
        await router.push(ACCOUNT_RESET_PASSWORD_PAGE_ROUTE);
    }



    return (
        <PageContainer>
            <Container className="header_info" padding="50px 30px">
                <Text fontSize="30px" fontWeight="bold">OTP Authentication</Text>
                <Text color="#777777" w="300px">An authentication code was sent to (+84) 776468833</Text>
            </Container>
            <Container className="otp_input" marginTop="30px">
                <OTPInput onComplete={(value) => { console.log(value) }} headerTxt="" />
            </Container>

            <Container className="submit"
                position="fixed"
                bottom="100px"
            >
                <Center boxSize="100%">
                    <Button
                        w="250px"
                        h="50px"
                        borderRadius="full"
                        bg="#8542F2"
                        borderColor="#B280D0"

                        onClick={() => handleRouteToResetPage()}>
                        <Text fontWeight="bold" color="white">Continue</Text>
                    </Button>
                </Center>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountPasswordForgotConfirm);

export default Extended;
