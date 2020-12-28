import homeIcon from "@Assets/images/home.png";
import chatIcon from "@Assets/images/conversation.png";
import datingIcon from "@Assets/images/dating_icon.png";
import profileIcon from "@Assets/images/profile-user.png";

export enum NavPageType {
    HOME = 0,
    CHAT,
    DATING,
    PERSONAL,
}

const absoluteCenter = {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
};

const styles = {
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
};

const convertStyle = (refType: number, realType: number) => {
    if (refType == realType) {
        return {
            ...styles.icon,
            opacity: "100%",
        };
    }

    return styles.icon;
};

interface INavFooterProp {
    type: number;
}

const NavFooter = (props: INavFooterProp) => {
    const { type } = props;

    const homeStyle = convertStyle(NavPageType.HOME, type);
    const datingStyle = convertStyle(NavPageType.DATING, type);
    const chatStyle = convertStyle(NavPageType.CHAT, type);
    const personalStyle = convertStyle(NavPageType.PERSONAL, type);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div style={styles.footer}>
            <div style={styles.iconContainer}>
                <img
                    style={homeStyle}
                    src={homeIcon}
                    alt="K"
                />
            </div>
            <div style={styles.iconContainer}>
                <img style={chatStyle} src={chatIcon} alt="K" />
            </div>
            <div style={styles.iconContainer}>
                <img style={datingStyle} src={datingIcon} alt="K" />
            </div>
            <div style={styles.iconContainer}>
                <img style={personalStyle} src={profileIcon} alt="K" />
            </div>
        </div>
    )
}


export default NavFooter;
