import homeIcon from "@Assets/images/home.png";
import chatIcon from "@Assets/images/conversation.png";
import datingIcon from "@Assets/images/dating_icon.png";
import profileIcon from "@Assets/images/profile-user.png";
import {
    CHAT_PAGE_ROUTE,
    DATING_PAGE_ROUTE,
    HOME_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
} from "src/Routes/contants";
import { useRouter } from "next/router";
import { FormatString } from "src/Commons/Strings/utils";

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

    let accountId: string | null = "";
    if (typeof window !== "undefined") {
        accountId = localStorage.getItem("account_id");
    }


    const router = useRouter();
    const homeStyle = convertStyle(NavPageType.HOME, type) as React.CSSProperties;
    const datingStyle = convertStyle(NavPageType.DATING, type) as React.CSSProperties;
    const chatStyle = convertStyle(NavPageType.CHAT, type) as React.CSSProperties;
    const personalStyle = convertStyle(NavPageType.PERSONAL, type);

    const handleClickRoutePage = (nextType: number) => {
        if (nextType === type) {
            return;
        }
        let routeUrl: string = "";
        switch (nextType) {
            case NavPageType.HOME:
                routeUrl = HOME_PAGE_ROUTE;
                break;
            case NavPageType.CHAT:
                routeUrl = CHAT_PAGE_ROUTE;
                break;
            case NavPageType.DATING:
                routeUrl = DATING_PAGE_ROUTE;
                break;
            case NavPageType.PERSONAL:
                routeUrl = FormatString(PROFILE_PAGE_ROUTE, accountId || "")
                break;
            default:
                break;
        }

        if (routeUrl) {
            router.push(routeUrl);
        }
    }

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div style={styles.footer as React.CSSProperties}>
            <div style={styles.iconContainer as React.CSSProperties} onClick={() => handleClickRoutePage(NavPageType.HOME)}>
                <img style={homeStyle} src={homeIcon} alt="K" />
            </div>
            <div
                style={styles.iconContainer as React.CSSProperties}
                onClick={() => handleClickRoutePage(NavPageType.CHAT)}
            >
                <img style={chatStyle} src={chatIcon} alt="K" />
            </div>
            <div style={styles.iconContainer as React.CSSProperties} onClick={() => handleClickRoutePage(NavPageType.DATING)}>
                <img style={datingStyle} src={datingIcon} alt="K" />
            </div>
            <div style={styles.iconContainer as React.CSSProperties} onClick={() => handleClickRoutePage(NavPageType.PERSONAL)}>
                <img style={personalStyle as React.CSSProperties} src={profileIcon} alt="K" />
            </div>
        </div>
    )
}


export default NavFooter;
