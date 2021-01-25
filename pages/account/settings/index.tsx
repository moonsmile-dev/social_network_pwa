import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Center, Container, IconButton, Image, Text } from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { PageContainer } from "@Styled/Root";
import { NextPage } from "next";
import backIcon from "@Assets/images/back.png";
import updateProfileIcon from "@Assets/images/update-profile-user.png";
import verifyAccountIcon from "@Assets/images/check.png";
import changePasswordIcon from "@Assets/images/door-key.png";
import translateIcon from "@Assets/images/translate.png";
import themeIcon from "@Assets/images/theme.png";
import notificationIcon from "@Assets/images/notification.png";
import devicesIcon from "@Assets/images/devices.png";
import switchAccountIcon from "@Assets/images/swap.png";
import logoutIcon from "@Assets/images/logout.png";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { getAuthInfo, removeAuthInfo } from "src/Commons/Auths/utils";
import { ACCOUNT_UPDATE_PROFILE_PAGE_ROUTE, GET_STARTED_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "src/Routes/contants";
import { FormatString } from "src/Commons/Strings/utils";

interface IBasicSettingFCProps {
    iconSrc: string;
    title: string;
    status?: string;
    statusColor?: string;
    hideBarTab?: boolean;
    onClick?: () => any;
}

const BasicSettingFC = (props: IBasicSettingFCProps) => {
    return (
        <Box w="100%"
            display="flex"
            bg="white"
            {...props}>
            <Box boxSize="40px"
                margin="20px">
                <Image boxSize="100%" src={props.iconSrc} />
            </Box>
            <Box className="Info" w="70%" lineHeight={!props.hideBarTab ? "60px" : "80px"}>
                <Box display="flex">
                    <Box w="80%">
                        <Text fontSize="25px" marginRight="10px">{props.title}</Text>
                    </Box>
                    {
                        props.status && (
                            <Box w="20%" justifyContent="end" display="flex">
                                <Text color={props.statusColor}>{props.status}</Text>
                            </Box>
                        )
                    }
                </Box>
                {!props.hideBarTab && (
                    <Box w="100%" h="2px" bg="#B5B5B5" />
                )}
            </Box>
        </Box>
    )
}

const AccountSettings: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    const handleBackButtonOnClick = useCallback(
        () => {
            router.back()
        },
        [],
    )

    const { accountId, authToken } = getAuthInfo();

    const handleRouteToUpdateProfilePage = useCallback(
        async () => {
            await router.push(FormatString(ACCOUNT_UPDATE_PROFILE_PAGE_ROUTE, `${accountId}`))
        }, [],
    )

    const handleLogoutAccount = useCallback(
        async () => {
            removeAuthInfo()
            await router.push(GET_STARTED_PAGE_ROUTE)
        }, [],
    )



    return (
        <PageContainer>
            <Container
                className="header"
                w="100%"
                position="fixed"
                display="flex"
                top="0px"
                bg="#F8F8F8">
                <Box boxSize="35px"
                    margin="10px 0px"
                    onClick={() => handleBackButtonOnClick()}>
                    <Image boxSize="100%" src={backIcon} />
                </Box>
                <Center w="100%"
                    fontWeight="bold"
                    fontSize="27px"
                >
                    <Text color="#0085FF">User Settings</Text>
                </Center>
            </Container>
            <Container w="100%"
                marginTop="55px"
                padding="0px"
                h="100px"
                className="main"
            >
                <Box w="100%"
                    bg="#B5B5B5"
                    padding="10px 0px"
                >
                    <BasicSettingFC title="Update profile" iconSrc={updateProfileIcon} onClick={() => handleRouteToUpdateProfilePage()} />
                    <BasicSettingFC title="Verify Account" status="Pending" statusColor="#FF0000" iconSrc={verifyAccountIcon} />
                    <BasicSettingFC title="Change password" iconSrc={changePasswordIcon} />
                </Box>
                <Box w="100%"
                    padding="10px 0px"
                    bg="#B5B5B5">
                    <BasicSettingFC title="Languages" iconSrc={translateIcon} />
                    <BasicSettingFC title="Themes" iconSrc={themeIcon} />
                    <BasicSettingFC title="Notifications" iconSrc={notificationIcon} />
                    <BasicSettingFC title="Devices" iconSrc={devicesIcon} />
                </Box>
                <Box w="100%"
                    padding="10px 0px"
                    bg="#B5B5B5">
                    <BasicSettingFC title="Switch account" iconSrc={switchAccountIcon} hideBarTab={true} />
                    <BasicSettingFC title="Log out" iconSrc={logoutIcon} hideBarTab={true} onClick={() => handleLogoutAccount()} />
                </Box>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountSettings);

export default Extended;

