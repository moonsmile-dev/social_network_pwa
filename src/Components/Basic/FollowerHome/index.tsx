import followerIcon from "@Assets/images/profile.jpeg";
import { useRouter } from "next/router";
import { FormatString } from "src/Commons/Strings/utils";
import { PROFILE_PAGE_ROUTE } from "src/Routes/contants";

const absoluteCenter = {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
} as React.CSSProperties;

const containerStyle = {
    height: "160px",
    width: "136px",
    backgroundColor: "white",
    borderRadius: "12px",
    display: "inline-block",
    position: "relative",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.15)",
    margin: "3px 2px",
} as React.CSSProperties;

const buttonStyle = {
    width: "80px",
    height: "24px",
    borderRadius: "48px",
    backgroundColor: "#5458F7",
    border: "solid 0px",
    margin: "0px",
};

const iconContainer = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
} as React.CSSProperties;

interface IFollowerHome {
    id?: string;
    srcImg?: string;
    name?: string;

}

export const FollowerHome = (props: IFollowerHome) => {
    const router = useRouter();
    const handleRouteToParnerProfile = async () => {
        await router.push(FormatString(PROFILE_PAGE_ROUTE, `${props.id}`))
    }

    return (
        <div style={containerStyle}>
            <div
                style={absoluteCenter}
            >
                <div className="avt-area" onClick={() => { handleRouteToParnerProfile() }}>
                    <div style={iconContainer}>
                        <div style={{ overflow: "hidden", width: "60px", height: "60px", borderRadius: "50%" }}>
                            <img alt="X" style={{ width: "100%", height: "100%" }} src={props.srcImg ? props.srcImg : followerIcon} />
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}><p style={{ margin: "7px 0px" }}>{props.name ? props.name : "XXX"}</p></div>
                </div>
                <button style={buttonStyle}>
                    <p style={{ color: "white" }}>Follow</p>
                </button>
            </div>
        </div >
    );
};
