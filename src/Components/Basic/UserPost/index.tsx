import avatarIcon from "@Assets/images/profile.jpeg";
import Gallery from 'react-photo-gallery';

// const IMAGES =
//     [{
//         src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 174,
//         isSelected: false,
//         caption: "After Rain (Jeshu John - designerspics.com)"
//     },
//     {
//         src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
//         thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212,
//         tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
//         caption: "Boats (Jeshu John - designerspics.com)"
//     },

//     {
//         src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
//         thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
//         thumbnailWidth: 320,
//         thumbnailHeight: 212
//     }]

const PHOTOS = [
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/xejm9edreuxuuokne_0b8aba5c.jpeg",
        width: 4,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/ccg1walpzr5lq4mbq_fce894ad.jpeg",
        width: 4,
        height: 1,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/cm9owltqkl0xbcods_ed868f53.jpeg",
        width: 2,
        height: 2,
    },
    {
        src: "https://s3-ap-southeast-1.amazonaws.com/odv-stag/tenants/cd99c164-11b0-4ce2-ada4-4b8c6dd2d4ad/photos/4pjjidpb5ugjmjrim_eed38f0d.jpeg",
        width: 2,
        height: 4,
    }
];

interface IUserPostProp {
    isDetail: boolean;
    avatar: string;
    cnt: string;
};


export const UserPost = (props: IUserPostProp) => {
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
                <Gallery photos={PHOTOS} />

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

                <div style={{ right: "0%", position: "absolute", top: "50%", transform: "translate(0%, -50%)", display: "flex" }} onClick={() => { alert("Turn on comment") }}>
                    <p style={{ margin: "0px", marginRight: "5px", color: "#9597A1" }}>{props.num_comments ? props.num_comments : 10} comments</p>
                    <p style={{ margin: "0px", color: "#9597A1" }}>{props.num_shared ? props.num_shared : 2} shared</p>
                </div>
            </div>
        </div>
    )
}
