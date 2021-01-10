import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import plusIcon from "@Assets/images/add.png";
import sendIcon from "@Assets/images/send.png";
import previousIcon from "@Assets/images/previous.png";
import voiceIcon from "@Assets/images/voicemail.png";
import { useRouter } from "next/router";

interface IMessage {
    isMe: boolean;
    msg: string;
}

const MessageComponent = (props: IMessage) => {
    let posMsgStyle = {
        // left: "10px",
        textAlign: "left",
    }

    let boundedMsgBlock = {
        borderRadius: "10px 10px 10px 0px"
    }

    if (props.isMe) {
        posMsgStyle = {
            // right: "10px",
            textAlign: "right",
        }
        boundedMsgBlock = {
            borderRadius: "10px 10px 0px 10px"
        }
    }
    return (
        <div style={{ display: "block", ...posMsgStyle }}>
            <div style={{ margin: "8px" }}>
                <div className="message_area" style={{ backgroundColor: "white", ...boundedMsgBlock, padding: "10px", maxWidth: "70%", display: "inline-block" }}>
                    <p style={{ margin: "0px", textAlign: "left", wordBreak: "break-all" }}>{props.msg ? props.msg : "Nguyen Minh Tuan"}</p>
                </div>
            </div>
        </div >
    )
}

// const MessageListComponent = (props: any) => {
//     return (
//         <div style={{ width: "100%", display: "flex", flexDirection: "column-reverse" }}>
//             <MessageComponent isMe="true" />
//             <MessageComponent />
//         </div>
//     )
// }

const chatInputContainer = {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    right: "0%",
    backgroundColor: "#f2f2f2",
    border: "1px solid white",
};

const measureInputStyle = {
    fontWeight: "bold",
    border: "none",
    opacity: "70%",
    outline: "none",
    width: "70%",
};

const centerDisplayStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const AccountChatIdx: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    return (
        <div style={{ position: "relative", height: '100vh', backgroundColor: "#cfcfcf" }}>
            <div className="chat_header" style={{
                position: "absolute",
                top: "0%",
                left: "0%", right: "0%",
                backgroundColor: "#ca00ff"
            }}>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            height: "35px",
                            width: "35px",
                            margin: "10px",
                        }}
                        onClick={() => router.back()}
                    >
                        <img alt="XXX" height="100%" width="100%" src={previousIcon} />
                    </div>
                    <div className="txtHeaderName" style={{ marginLeft: "10px" }}>
                        <h4 style={{ lineHeight: "50px", color: "white" }}>Nguyen Minh Tuan</h4>
                    </div>
                </div>
                <div className="call_button" style={{ position: "absolute", top: "0%", right: "0%", height: "100%", ...centerDisplayStyle }}>
                    <div style={{ height: "40px", width: "40px", margin: "7px" }}>
                        <img src={voiceIcon} alt="XXX" width="100%" height="100%" />
                    </div>
                </div>
            </div>
            <div className="chat_area" style={{ height: "90%", display: "flex", flexDirection: "column-reverse" }}>
                <MessageComponent isMe="true" />
                <MessageComponent />
            </div>
            <div className="chat_input_container" style={chatInputContainer} >
                <div className="chat_input" style={{ display: "flex" }}>
                    <div className="icon_container" style={{ padding: "7px" }}>
                        <img alt="XXX" src={plusIcon} height="45px" width="45px" />
                    </div>
                    <input placeholder="Send message" style={{ ...measureInputStyle, backgroundColor: "inherit" }} />
                </div>
                <div className="send_icon" style={{ ...centerDisplayStyle, position: "absolute", right: "0%", top: "0%", height: "100%" }}>
                    <img src={sendIcon} alt="abc" height="40px" width="40px" />
                </div>
            </div>
        </div>
    )
}

const Extended = withTranslation("common")(AccountChatIdx);

export default Extended;
