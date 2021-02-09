import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Flex, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { FlexPhoneInput } from "@Components/Basic/Input/FlexPhoneInput";
import { OTPInput } from "@Components/Basic/Input/OTPInput";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCallback } from "react";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { FormatString } from "src/Commons/Strings/utils";
import { ACCOUNT_UPDATE_PROFILE_PAGE_ROUTE, HOME_PAGE_ROUTE } from "src/Routes/contants";

const AccountIdxRegisterConfirm: NextPage<any, any> = () => {
    const router = useRouter();
    const { accountId, authToken } = getAuthInfo();
    const [otpCode, setOtpCode] = useState("");

    const handleRouteToNextStepPage = useCallback(
        async (account_id: string) => {
            console.log(`OTP code: ${otpCode}`);
            if (otpCode) {
                const updateAccountRoute: string = FormatString(ACCOUNT_UPDATE_PROFILE_PAGE_ROUTE, `${account_id}`);
                await router.push(`${updateAccountRoute}?next=${HOME_PAGE_ROUTE}`);
            }
        },
        [otpCode],
    )

    const handleSendSmsConfirm = useCallback(
        (phone_number: string) => {
            console.log(`Sending sms to phone: ${phone_number}.`)
        }, []
    );

    return (
        <PageContainer>
            <Container className="header" padding="20px 40px" textAlign="center" marginTop="50px">
                <Text fontWeight="bold" fontSize="30px">Confirm mobile phone</Text>
            </Container>
            <Container className="main_info" marginTop="30px">
                <Box className="phone_info_area" padding="0px 10px">
                    <FlexPhoneInput is_button_visiable={true} onSendClick={(value) => handleSendSmsConfirm(value)} />
                </Box>
                <Container className="otp_area" padding="50px 0px" >
                    <OTPInput headerTxt="Input OTP" onComplete={(value) => { setOtpCode(value) }} />
                </Container>
            </Container>
            <Container className="submit_area" padding="60px 0px" position="fixed" bottom="0px">
                <Center boxSize="100%">
                    <Button borderRadius="full" width="60%" h="50px" fontWeight="bold" color="white" bg="#8542F2" border="solid #B280D0 1px"
                        onClick={() => handleRouteToNextStepPage(accountId || "")}>Confirm</Button>
                </Center>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountIdxRegisterConfirm);

export default Extended;
