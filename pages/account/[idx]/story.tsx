import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import imageExampleIcon from "@Assets/images/story_image.png";
import sendIcon from "@Assets/images/paper-plane.png";
import avatarIcon from "@Assets/images/profile.jpeg";
import closeIcon from "@Assets/images/close.png";
import { Box, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState as useStateReact } from "react";
import { useState } from "@hookstate/core";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { useQuery } from "@apollo/client";
import { GET_USER_STORY_QUERY } from "@Libs/Queries/getUserStoryQuery";
import { UserStoryDto } from "@Libs/Dtos/userStory.interface";
interface ISlicingItem {
    isVisible?: boolean;
}

const SlicingItemComponent = (props: ISlicingItem) => {
    const normalStickStyle = {
        height: "4px",
        borderRadius: "2px",
        width: "100%",
        margin: "2px",
        backgroundColor: "white",
        opacity: "60%"
    }

    const lightStickStyle = {
        height: "4px",
        borderRadius: "2px",
        width: "0%",
        margin: "2px",
        backgroundColor: "white",
    }
    // eslint-disable-next-line react/destructuring-assignment
    const slicingVisibleStyling = props.isVisible ? { transition: "width 8s", width: "100%", } : {}
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
        <div style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "absolute", ...normalStickStyle }} />
            <div style={{ position: "absolute", ...lightStickStyle, ...slicingVisibleStyling }} />
        </div>
    );
};

const sendMessageStyle = {
    outline: "none",
    height: "46px",
    borderRadius: "23px",
    opacity: "50%",
    backgroundColor: "black",
    color: "white",
}


const IMAGE_TESTS = ["http://localhost:1338/file_streams/abc/account/post/synced_image_1592417944256.jpeg", "http://localhost:1338/file_streams/abc/account/post/synced_image_1592935202753.jpeg"]

const AccountParnersIdxStory: NextPage<any, any> = (props: any) => {
    const router = useRouter();
    const [images, setImages] = useStateReact<string[]>([]);
    const currentAccountId: string = router.query.idx as string || "";
    const { accountId, authToken } = getAuthInfo();

    const [currentPos, setCurrentPos] = useStateReact(0);
    const timers: Array<any> = [];


    const handleCloseStoryBtn = useCallback(
        () => {
            router.back()
        },
        [],
    )

    useEffect(() => {
        const runner = setTimeout(() => {
            handleClickControlStory("RIGHT")
        }, 10000);

        return () => {
            for (let idx = 0; idx < timers.length; idx++) {
                const _t = timers[idx];
                clearTimeout(_t)
            }

            // Clear runner
            clearTimeout(runner)
        }
    }, [images, currentPos])

    const handleClickControlStory = useCallback(
        (type: string, noLoop: boolean = true) => {
            switch (type) {
                case "LEFT":
                    setCurrentPos(Math.max(0, currentPos - 1))
                    break;
                case "RIGHT":
                    setCurrentPos(Math.min(images.length - 1, currentPos + 1))
                    break;
                default:
                    break;
            }

            if (noLoop) {
                const _t = setTimeout(() => {
                    handleClickControlStory("RIGHT", false)
                }, 10000);
                timers.push(_t)
            }

        }, [images, currentPos]
    )

    // Query data
    const { error, loading, data } = useQuery(GET_USER_STORY_QUERY, {
        variables: {
            account_id: accountId,
            auth_token: authToken,
            partner_id: currentAccountId
        }
    });

    useEffect(
        () => {
            if (data) {
                const userStory: UserStoryDto = data.userStory;
                setImages(userStory.mediaDatas.map((item) => item.mediaUrl));
            }

        }, [data]
    );
    if (error) {
        return <div>Error when loading story</div>;
    }
    if (loading) {
        return null;
    }

    return (
        <div style={{ position: "relative", height: '100vh' }}>
            <div className="close_btn" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }} onClick={() => handleCloseStoryBtn()}>
                <div style={{ height: "30px", width: "30px" }}>
                    <Image boxSize="100%" src={closeIcon} />
                </div>
            </div>
            <div className="header_slicing" style={{
                position: "absolute",
                width: "100%",
                top: "5px",
            }}>
                <div style={{ display: "flex", margin: "0px 5px" }}>
                    {
                        [...Array(images.length)].map((value, idx) =>
                            <SlicingItemComponent key={idx} isVisible={idx == currentPos ? true : false} />
                        )
                    }
                </div>
                <div style={{ margin: "15px", display: "flex" }}>
                    <div style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "white", overflow: "hidden" }}>
                        <img height="100%" width="100%" src={avatarIcon} />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <h6 style={{ margin: "0px", color: "white" }}>Nguyen Minh Tuan</h6>
                        <p style={{ margin: "0px", color: "#C7C7C7" }}>12 hours ago</p>
                    </div>
                </div>
            </div>
            <div className="area-click">
                <Box w="50%" h="100%" bg="transparent" position="absolute" top="0px" left="0px" onClick={() => handleClickControlStory("LEFT")} />
                <Box w="50%" h="100%" bg="transparent" position="absolute" top="0px" right="0px" onClick={() => handleClickControlStory("RIGHT")} />
            </div>
            <div className="Bg_viewer" style={{ width: "100%", height: "100%", zIndex: 0 }}>
                <Image boxSize="100%" src={images[currentPos]} />
            </div>
            <div className="chat_footer" style={{
                zIndex: 1, position: "absolute",
                width: "100%",
                bottom: "0%",
            }}>
                <div style={{ display: "flex" }}>
                    <input style={{ ...sendMessageStyle, padding: "0px 20px", width: "80%", margin: "5px 10px", border: "2px solid white" }} placeholder="Rely..." />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ height: "40px", width: "40px" }}>
                            <img width="100%" height="100%" src={sendIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Extended = withTranslation("common")(AccountParnersIdxStory);

export default Extended;

