import { NextPage } from "next";
import { IAccountProfile } from "@Interfaces"
import { withTranslation } from "@Server/i18n";
import coverImg from "@Assets/images/shanghai-skyline.png";
import profileImage from "@Assets/images/profile.jpeg";
import followerImage from "@Assets/images/followers.png";
import { UserPost } from "@Components/Basic";
import backImage from "@Assets/images/back.png";
import { useRouter } from "next/router";


const chatStyle = {
    width: "134px",
    height: "24px",
    marginRight: "10px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "#5458F7",
    border: "solid 0px",
}
const followerStyle = {
    width: "50px",
    height: "24px",
    backgroundColor: "white",
    borderRadius: "12px",
    display: "flex",
    border: "solid 1px #F2F2F2",
    justifyContent: "center",
};

const MasterDetailCnt = (props: { val: string, cnt: string }) => {
    return (
        <div style={{ margin: "5px" }}>
            <h6 style={{ marginBottom: "3px" }}>{props.val}</h6>
            <p style={{ fontSize: "10px", color: "#9597A1", marginBottom: "5px" }}>{props.cnt}</p>
        </div>
    );
};

const FConnection = () => {
    return (
        <div >
            <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto auto", borderSpacing: "5px", width: "100%", paddingLeft: "10px" }}>
                <MasterDetailCnt val="142" cnt="Posts" />
                <MasterDetailCnt val="7.4M" cnt="Followers" />
                <MasterDetailCnt val="117" cnt="Following" />
            </div>
            <div style={{ display: "flex" }}>
                <button style={chatStyle}>
                    Message
                </button>
                <div style={followerStyle}>
                    <img src={followerImage} alt="Friend" height="80%" />
                </div>
            </div>
        </div>
    );
};

const ProfileInformation = () => {
    const normalCnt = {
        marginBottom: "5px",
        color: "#9597A1",
    };
    return (
        <div style={{ marginTop: "20px", width: "250px" }}>
            <h5 style={{ marginBottom: "1px" }}>SH.HAI</h5>
            <p style={normalCnt}>Software/Developer</p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}><span style={{ fontWeight: "bold" }}>Bio:</span> This is Ho Chi Minh City, where I live and she is also here.</p>
            <a href="http://facebook.com">abchub.com</a>
        </div>
    );
};

const scrollTabStyle = {
    height: "40px",
    width: "100%",
    backgroundColor: "#FAFAFA",
    display: "inline-grid",
    gridTemplateColumns: "auto auto"
};
interface IAccountProfileProp {
    cover: string;
    avtImg: string;
}

const AccountProfile: NextPage<any, any> = (props: any) => {
    const router = useRouter();

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <div style={{ position: "fixed", height: "35px", width: "35px", top: "15px", left: "15px", zIndex: "1" }} onClick={() => router.back()}>
                <img src={backImage} alt="X" height="100%" width="100%" />
            </div>
            <div style={{ height: "58%" }}>
                <div style={{ height: "218px" }}>
                    <img src={props.cover ? props.cover : coverImg} alt="Cover" height="100%" width="100%" />
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: "0%", top: "10px" }}>
                        <FConnection />
                    </div>
                    <div style={{ marginLeft: "15px", marginTop: "15px" }}>
                        <div style={{ height: "80px", width: "80px", overflow: "hidden", borderRadius: "50%" }}>
                            <img alt="Profile" height="100%" width="100%" src={props.avtImg ? props.avtImg : profileImage} />
                        </div>
                        <ProfileInformation />
                    </div>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <div style={scrollTabStyle}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ lineHeight: "40px", color: "#8987FF" }}>Timeline</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h5 style={{ lineHeight: "40px", color: "#CFCFCF" }}>Photos</h5>
                    </div>
                </div>
                <div>
                    <UserPost />
                    <UserPost />
                    <UserPost />
                </div>
            </div>
        </div >
    )
}

const Extended = withTranslation("common")(AccountProfile);

export default Extended;
