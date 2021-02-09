import { Box, Button, Center, Container, Text } from "@chakra-ui/react";
import { FlexPhoneInput } from "@Components/Basic/Input/FlexPhoneInput";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root"
import { NextPage } from "next"
import { useRouter } from "next/router";
import { ACCOUNT_FORGOT_PASSWORD_CONFIRM_PAGE_ROUTE } from "src/Routes/contants";

const AccountPasswordReset: NextPage<any, any> = () => {
    const router = useRouter();

    const handleRouteToConfirmPage = async () => {
        await router.push(ACCOUNT_FORGOT_PASSWORD_CONFIRM_PAGE_ROUTE);
    }

    return (
        <PageContainer>
            <Container className="main_info" marginTop="100px" padding="25px">
                <Box marginBottom="70px">
                    <Text fontWeight="bold" fontSize="30px">Password Recovery</Text>
                    <Text color="#8C8C8C">Enter your Phone number to recovery your password</Text>
                </Box>
                <FlexPhoneInput is_button_visiable={false} />
            </Container>

            <Container className="submit" padding="70px 0px">
                <Center boxSize="100%">
                    <Button w="200px"
                        h="50px"
                        borderRadius="full"
                        bg="#8542F2"
                        border="solid #B280D0 1px"

                        onClick={() => handleRouteToConfirmPage()}
                    >
                        <Text color="white" fontWeight="bold">Continue</Text>
                    </Button>
                </Center>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountPasswordReset);

export default Extended;
