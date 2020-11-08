import avatarIcon from "@Assets/images/profile.jpeg";

export const UserPost = (props: {}) => {
    const boundContainer = {
        left: "0%",
        position: "absolute",
        top: "50%",
        transform: "translate(0%, -50%)",
        paddingLeft: "10px",
        display: "flex",
    }
    const iconTicketStyle = {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        overflow: "hidden",
        marginLeft: "-10px",
        border: "solid 2px white",
    };
    return (
        <div style={{ backgroundColor: "white", padding: "10px", margin: "1px" }}>
            <div className="header_post" style={{ height: "60px", position: "relative" }}>
                <div style={boundContainer}>
                    <div style={{ width: "54px", height: "54px", borderRadius: "50%", overflow: "hidden" }}>
                        <img style={{ height: "100%", width: "100%" }} alt="X" src={props.avatar ? props.avatar : avatarIcon} />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <p style={{ margin: "4px 0px", fontWeight: "bold" }}>Nguyen Minh Tuan</p>
                        <p style={{ margin: "0px", fontSize: "12px", color: "#9597A1" }}>4 mins ago</p>
                    </div>
                </div>
            </div>
            <div className="main_post" style={{ margin: "0px 10px" }}>
                <p>{props.cnt ? props.cnt : "We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues."}</p>
            </div>
            <div className="footer_post" style={{ height: "40px", position: "relative" }}>
                <div style={boundContainer}>
                    <div style={{ display: "flex", marginRight: "5px" }}>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={props.avatar ? props.avatar : avatarIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={props.avatar ? props.avatar : avatarIcon} />
                        </div>
                        <div style={iconTicketStyle}>
                            <img style={{ height: "100%", width: "100%" }} alt="X" src={props.avatar ? props.avatar : avatarIcon} />
                        </div>
                    </div>

                    <p style={{ margin: "0px", lineHeight: "30px", color: "#9597A1" }}>20 likes</p>
                </div>

                <div style={{ right: "0%", position: "absolute", top: "50%", transform: "translate(0%, -50%)", display: "flex" }}>
                    <p style={{ margin: "0px", marginRight: "5px", color: "#9597A1" }}>{props.num_comments ? props.num_comments : 10} comments</p>
                    <p style={{ margin: "0px", color: "#9597A1" }}>{props.num_shared ? props.num_shared : 2} shared</p>
                </div>
            </div>
        </div>
    )
}
