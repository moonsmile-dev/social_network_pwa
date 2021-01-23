import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import imageExampleIcon from "@Assets/images/story_image.png";
import sendIcon from "@Assets/images/paper-plane.png";
import avatarIcon from "@Assets/images/profile.jpeg";
import closeIcon from "@Assets/images/close.png";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
interface ISlicingItem {
    isVisible?: boolean;
}

const SlicingItemComponent = (props: ISlicingItem) => {
    const stickStyle = {
        height: "4px",
        borderRadius: "2px",
        width: "100%",
        margin: "2px",
        backgroundColor: "white"
    }
    // eslint-disable-next-line react/destructuring-assignment
    const slicingVisibleStyling = props.isVisible ? {} : { opacity: "60%" }
    // eslint-disable-next-line react/react-in-jsx-scope
    return <div style={{ ...stickStyle, ...slicingVisibleStyling }} />;
};

const sendMessageStyle = {
    outline: "none",
    height: "46px",
    borderRadius: "23px",
    opacity: "50%",
    backgroundColor: "black",
    color: "white",
}


const AccountParnersIdxStory: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    const handleCloseStoryBtn = useCallback(
        () => {
            router.back()
        },
        [],
    )

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
                    <SlicingItemComponent isVisible={true} />
                    <SlicingItemComponent />
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
            <div className="Bg_viewer" style={{ backgroundColor: "yellow", width: "100%", height: "100%", zIndex: 0 }}>
                <Image boxSize="100%" src={imageExampleIcon} />
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

