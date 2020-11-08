import storyIcon from "@Assets/images/profile.jpeg";

export const StoryHome = (props: {}) => {
    const container = {
        width: "70px",
        height: "90px",
        backgroundColor: "white",
        paddingTop: "5px",
    }
    return (
        <div style={container}>
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
                <p style={{ fontWeight: "bold" }}>{props.name ? props.name : "Alex"}</p>
            </div>
        </div>
    );
};
