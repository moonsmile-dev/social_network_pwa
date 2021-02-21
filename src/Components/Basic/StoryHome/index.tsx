import storyIcon from "@Assets/images/profile.jpeg";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FormatString } from "src/Commons/Strings/utils";
import { ACCOUNT_STORY_PAGE_ROUTE } from "src/Routes/contants";

const container = {
    width: "70px",
    height: "90px",
    backgroundColor: "white",
    paddingTop: "5px",
}
interface IStoryHome {
    accountId: string;
    name?: string;
    imgSrc?: string
}


export const StoryHome = (props: IStoryHome) => {
    const currentAccountId: string = props.accountId;
    const router = useRouter();
    const handleRouteToUserStoryView = useCallback(
        async () => {
            await router.push(FormatString(ACCOUNT_STORY_PAGE_ROUTE, currentAccountId))
        },
        [],
    )

    return (
        <div style={container} onClick={() => { handleRouteToUserStoryView() }}>
            <div style={{ height: "70%", display: "flex", justifyContent: "center" }}>
                <div
                    style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "solid 1px #5458F7",
                        margin: "4px"
                    }}
                >
                    <img
                        alt="K"
                        src={props.imgSrc ? props.imgSrc : storyIcon}
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <p style={{ fontWeight: "bold" }}>{props.name ? props.name.split(' ')[0] : "Alex"}</p>
            </div>
        </div>
    );
};
