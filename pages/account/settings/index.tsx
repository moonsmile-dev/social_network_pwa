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
import { ACCOUNT_CHANGE_PASSWORD_PAGE_ROUTE, ACCOUNT_UPDATE_PROFILE_PAGE_ROUTE, ACCOUNT_VERIFIES_PAGE_ROUTE, GET_STARTED_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "src/Routes/contants";
import { FormatString } from "src/Commons/Strings/utils";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_INFO_DATA_QUERY } from "@Libs/Queries/getAccountInfoDataQuery";
import { IAccountInfo } from "@Libs/Dtos/accountInfo.interface";

interface IBasicSettingFCProps {
    icon_src: string;
    title: string;
    status?: string;
    status_color?: string;
    hide_bar_tab?: boolean;
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
                <Image boxSize="100%" src={props.icon_src} />
            </Box>
            <Box className="Info" w="70%" lineHeight={!props.hide_bar_tab ? "60px" : "80px"}>
                <Box display="flex">
                    <Box w="80%">
                        <Text fontSize="25px" marginRight="10px">{props.title}</Text>
                    </Box>
                    {
                        props.status && (
                            <Box w="20%" justifyContent="end" display="flex">
                                <Text color={props.status_color} fontWeight="bold">{props.status}</Text>
                            </Box>
                        )
                    }
                </Box>
                {!props.hide_bar_tab && (
                    <Box w="100%" h="2px" bg="#B5B5B5" />
                )}
            </Box>
        </Box>
    )
}


interface IVerifyAccountProp {
    onClick: () => any;
}

interface RichStatus {
    status: string;
    status_color: string;
}

const VerifyAccountFC = (props: IVerifyAccountProp) => {
    const { accountId, authToken } = getAuthInfo();
    const { data, loading, error } = useQuery(GET_ACCOUNT_INFO_DATA_QUERY, {
        variables: {
            account_id: accountId,
            auth_token: authToken
        }
    });

    if (loading) {
        return null;
    }
    if (error) {
        return <div>Error when connect to system.</div>
    }


    let statusStyle: RichStatus = {
        status: "Pending",
        status_color: "#FF0000"
    }

    const accountInfo: IAccountInfo = data.accountInfo;
    if (accountInfo.verifyStatus === 0) {
        statusStyle = {
            status: "Pending",
            status_color: "#FF0000"
        }
    } else if (accountInfo.verifyStatus === 1) {
        statusStyle = {
            status: "Verifed",
            status_color: "#27be00"
        }
    } else if (accountInfo.verifyStatus === -1) {
        statusStyle = {
            status: "Rejected",
            status_color: "#ca0000"
        }
    } else if (accountInfo.verifyStatus === -2) {
        statusStyle = {
            status: "Unknown",
            status_color: "#c0c0c0"
        }
    }



    return (
        <BasicSettingFC title="Verify Account" {...statusStyle} icon_src={verifyAccountIcon} {...props} />
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
    const handleRouteToChangePasswordPage = useCallback(
        async () => {
            await router.push(ACCOUNT_CHANGE_PASSWORD_PAGE_ROUTE)
        }, [],
    )
    const handleRouteToAccountVerifiesPage = useCallback(
        async () => {
            await router.push(ACCOUNT_VERIFIES_PAGE_ROUTE)
        }, []
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
                    <BasicSettingFC title="Update profile" icon_src={updateProfileIcon} onClick={() => handleRouteToUpdateProfilePage()} />
                    <VerifyAccountFC onClick={() => handleRouteToAccountVerifiesPage()} />
                    <BasicSettingFC title="Change password" icon_src={changePasswordIcon} onClick={() => handleRouteToChangePasswordPage()} />
                </Box>
                <Box w="100%"
                    padding="10px 0px"
                    bg="#B5B5B5">
                    <BasicSettingFC title="Languages" icon_src={translateIcon} />
                    <BasicSettingFC title="Themes" icon_src={themeIcon} />
                    <BasicSettingFC title="Notifications" icon_src={notificationIcon} />
                    <BasicSettingFC title="Devices" icon_src={devicesIcon} />
                </Box>
                <Box w="100%"
                    padding="10px 0px"
                    bg="#B5B5B5">
                    <BasicSettingFC title="Switch account" icon_src={switchAccountIcon} hide_bar_tab={true} />
                    <BasicSettingFC title="Log out" icon_src={logoutIcon} hide_bar_tab={true} onClick={() => handleLogoutAccount()} />
                </Box>
            </Container>
        </PageContainer>
    )
}

const Extended = withTranslation("common")(AccountSettings);

export default Extended;

