import { NextPage } from "next";
import { IMainInAppRoot } from "@Interfaces"
import { withTranslation } from "@Server/i18n";

import homeIcon from "@Assets/images/home.png";
import datingIcon from "@Assets/images/dating_icon.png";
import chatIcon from "@Assets/images/conversation.png";
import profileIcon from "@Assets/images/profile-user.png";
import avatarIcon from "@Assets/images/profile.jpeg";
import notifyIcon from "@Assets/images/alarm.png";
import { StoryHome, FollowerHome, UserPost } from "@Components/Basic";

const absoluteCenter = {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
};

const styles = {
    container: {
        backgroundColor: "yellow",
        height: "100vh",
        position: "relative",
    },

    footer: {
        backgroundColor: "#8000FF",
        height: "94px",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        zIndex: "2"
    },
    main: {
        backgroundColor: "#9597A1",
        height: "100%",
        paddingTop: "59px",
        paddingBottom: "94px",
        zIndex: "1"
    },
    header: {
        backgroundColor: "white",
        height: "59px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        overflow: "hidden",
        zIndex: "2"
    },
    iconContainer: {
        height: "100%",
        width: "25%",
        position: "relative",
    },
    icon: {
        opacity: "70%",
        textAlign: "center",
        height: "50px",
        width: "50px",
        ...absoluteCenter,
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
    notifyIcon: {
        textAlign: "center",
        height: "35px",
        width: "35px",
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
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
    notifyHeader: {
        height: "100%",
        width: "40px",
        top: "0%",
        right: "0%",
        position: "absolute",
    }
};

const MainInAppRoot: NextPage<
    IMainInAppRoot.IProps,
    IMainInAppRoot.InitialProps
> = ({ }) => {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.avatarHeader}>
                    <img style={styles.profileIcon} src={avatarIcon} alt="X" />
                </div>
                <div style={styles.txtHeader}>
                    <p style={{ color: "#0066FF", fontWeight: "bold", fontSize: "24px" }}>Good Morning</p>
                </div>
                <div style={styles.notifyHeader}>
                    <img style={styles.notifyIcon} src={notifyIcon} />
                </div>
            </div>
            <div style={styles.main}>
                <div style={{
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    <StoryHome name="Tuan" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                    <StoryHome name="Quang" />
                </div>

                <div style={{
                    display: "block",
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                    backgroundColor: "white",
                }}>
                    <FollowerHome />
                    <FollowerHome />
                    <FollowerHome />
                    <FollowerHome />
                </div>
                <UserPost />
                <UserPost />
                <UserPost />
            </div>
            <div style={styles.footer}>
                <div style={styles.iconContainer}>
                    <img style={{ ...styles.icon, opacity: "100%" }} src={homeIcon} alt="K" />
                </div>
                <div style={styles.iconContainer}>
                    <img style={styles.icon} src={chatIcon} alt="K" />
                </div>
                <div style={styles.iconContainer}>
                    <img style={styles.icon} src={datingIcon} alt="K" />
                </div>
                <div style={styles.iconContainer}>
                    <img style={styles.icon} src={profileIcon} alt="K" />
                </div>
            </div>
        </div >
    );
};


const Extended = withTranslation("common")(MainInAppRoot);

export default Extended;
