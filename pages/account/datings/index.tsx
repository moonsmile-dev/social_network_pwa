import NavFooter, { NavPageType } from "@Components/NavFooter";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import avatarIcon from "@Assets/images/profile.jpeg";
import matchSettingIcon from "@Assets/images/match_option.png";
import { Box, Image } from "@chakra-ui/react";
import smartChatIcon from "@Assets/images/speech-bubble.png";
import datingTraditionIcon from "@Assets/images/handshake.png";
import genderManIcon from "@Assets/images/gender_man.png";
import genderWomanIcon from "@Assets/images/gender_woman.png";
import AuthenticatePageRequired from "@Components/Auths/AuthenticatePageRequired";
import { useRouter } from "next/router";
import { DATING_RECS_PAGE_ROUTE, DATING_SMART_WAITING_PAGE_ROUTE } from "src/Routes/contants";

const styles = {
    container: {
        backgroundColor: "white",
        height: "100vh",
        position: "relative",
    },
    header: {
        backgroundColor: "white",
        height: "59px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        overflow: "hidden",
        zIndex: "2",
        border: "1px solid #38E6FE"
    },
    main: {
        backgroundColor: "white",
        height: "100%",
        paddingTop: "59px",
        paddingBottom: "94px",
        zIndex: "1"
    },
    profileIcon: {
        textAlign: "center",
        height: "40px",
        width: "40px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
    },
    avatarHeader: {
        height: "100%",
        width: "70px",
        top: "0%",
        left: "0%",
        position: "absolute",
    },
    txtHeader: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingLeft: "70px",
        paddingRight: "40px",
        lineHeight: "59px",
    },
    settingHeader: {
        height: "100%",
        width: "40px",
        top: "0%",
        right: "0%",
        position: "absolute",
    }
}

interface IOptionDatingProp {
    bg: string;
    icon: string;
    name: string;
    dTxt: string;

    onClick: () => any;
}

const OptionDating = (props: IOptionDatingProp) => {
    return (
        <Box w="100%" h="148px" borderRadius="10px" margin="10px" {...props} justifyContent="center" justifyItems="center" display="flex"
            onClick={props.onClick}>
            <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", display: "flex", justifyItems: "center", justifyContent: "center", padding: "7px" }}>
                    <Image src={props.iconSrc} h="70px" w="70px" />
                </div>
                <p style={{ fontSize: "19px", borderColor: "#FFFFFF", fontWeight: "bold", color: "white" }}>{props.name}</p>
                <p style={{ fontSize: "15px", color: "#D3D3D3" }}>{props.dTxt}</p>
            </div>
        </Box>
    );
};


enum Gender {
    MALE,
    FEMALE,
}

interface IUserDatingProps {
    name: string;
    gender: Gender;
    avtSrc: string;
    preTxt: string;
    age: number;
}

const UserDating = (props: IUserDatingProps) => {
    return (
        <div {...props} style={{ backgroundColor: "inherit", width: "100%", padding: "8px", display: "flex" }}>
            <Image
                borderRadius="full"
                boxSize="50px"
                src={props.avtSrc}
                alt="XXX"
            />
            <div style={{ paddingLeft: "15px" }}>
                <div style={{ display: "flex", height: "55%" }}>
                    <h3 style={{ fontWeight: "bold", height: "14px" }}>{props.name}</h3>
                    <Box w="60px" h="20px" bg="#9E00FF" borderRadius="10px" margin="0px 5px">
                        <div style={{ display: "flex", margin: "0px 5px", lineHeight: "20px" }}>
                            <p style={{ color: "white" }}><span>{props.age}</span>.yo</p>
                            <Image h="12px" w="12px" margin="5px" src={props.gender == Gender.MALE ? genderManIcon : genderWomanIcon} />
                        </div>
                    </Box>
                </div>
                <div>
                    <p style={{ color: "#717171", fontSize: "12px" }}>{props.preTxt}</p>
                </div>
            </div>
        </div>
    )
}

const AccountDatings: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    const handleRouteToMatchRecs = async () => {
        await router.push(DATING_RECS_PAGE_ROUTE);
    };
    const handleRouteToMatchSmartWaiting = async () => {
        await router.push(DATING_SMART_WAITING_PAGE_ROUTE)
    }

    return (
        <AuthenticatePageRequired>
            <div className="Header" style={styles.header}>
                <div style={styles.avatarHeader}>
                    <img style={styles.profileIcon} src={avatarIcon} alt="X" />
                </div>
                <div style={styles.txtHeader}>
                    <p style={{ color: "#0066FF", fontWeight: "bold", fontSize: "24px" }}>Let's start Dating</p>
                </div>
                <div style={styles.settingHeader}>
                    <img style={styles.notifyIcon} src={matchSettingIcon} />
                </div>
            </div>
            <div className="Main" style={styles.main}>
                <div className="Dating Selection" style={{ width: "100%", border: "1px solid white" }}>
                    <div style={{ display: "flex", margin: "0px 15px" }}>
                        <OptionDating bg="#7000FF" iconSrc={smartChatIcon} name="Smart Chat" dTxt="120 onlines" onClick={() => handleRouteToMatchSmartWaiting()} />
                        <OptionDating bg="#FF0000" iconSrc={datingTraditionIcon} name="Matching" dTxt="20 updated daily" onClick={() => handleRouteToMatchRecs()} />
                    </div>
                </div>
                <div className="User dating section">
                    {[...Array(10)].map((x, i) =>
                        <UserDating
                            avtSrc={avatarIcon}
                            name="Nguyen Minh Tuan"
                            preTxt="Toi muon ngam binh minh vao buoi toi.... abc =))"
                            age="21"
                            gender={Gender.MALE}
                        />
                    )}
                </div>
            </div>
            <NavFooter className="Footer" type={NavPageType.DATING} />
        </AuthenticatePageRequired>
    )
}

const Extended = withTranslation('common')(AccountDatings);

export default Extended;
