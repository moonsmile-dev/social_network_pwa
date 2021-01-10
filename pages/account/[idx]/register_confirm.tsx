import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Flex, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { FlexPhoneInput } from "@Components/Basic/Input/FlexPhoneInput";
import { OTPInput } from "@Components/Basic/Input/OTPInput";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { HOME_PAGE_ROUTE } from "src/Routes/contants";

const AccountIdxRegisterConfirm: NextPage<any, any> = () => {
    const router = useRouter();
    const handleRouteToHomePage = async () => {
        await router.push(HOME_PAGE_ROUTE);
    }

    return (
        <PageContainer>
            <Container className="header" padding="20px 40px" textAlign="center" marginTop="50px">
                <Text fontWeight="bold" fontSize="30px">Confirm mobile phone</Text>
            </Container>
            <Container className="main_info" marginTop="30px">
                <Box className="phone_info_area" padding="0px 10px">
                    <FlexPhoneInput isButtonVisible={true} />
                </Box>
                <Container className="otp_area" padding="50px 0px" >
                    <OTPInput headerTxt="Input OTP" onComplete={(value) => { console.log(value); }} />
                </Container>
            </Container>
            <Container className="submit_area" padding="60px 0px" position="fixed" bottom="0px">
                <Center boxSize="100%">
                    <Button borderRadius="full" width="60%" h="50px" fontWeight="bold" color="white" bg="#8542F2" border="solid #B280D0 1px"
                        onClick={() => handleRouteToHomePage()}>Confirm</Button>
                </Center>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountIdxRegisterConfirm);

export default Extended;
