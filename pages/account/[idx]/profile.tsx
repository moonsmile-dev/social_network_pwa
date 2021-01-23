import { NextPage } from "next";
import { withTranslation } from "@Server/i18n";
import coverImg from "@Assets/images/shanghai-skyline.png";
import profileImage from "@Assets/images/profile.jpeg";
import followerImage from "@Assets/images/followers.png";
import { UserPost } from "@Components/Basic";
import backImage from "@Assets/images/back.png";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_TIME_LINE_QUERY } from "@Libs/Queries/getAccountTimeLineQuery";
import { getAuthInfo } from "src/Commons/Auths/utils";
import { IArticlePost } from "@Libs/Dtos/articlePost.interface";
import { GET_ACCOUNT_PROFILE_QUERY } from "@Libs/Queries/getAccountProfileQuery";
import { IAccountProfile } from "@Libs/Dtos/accountProfile.interface";


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

interface IProfileInfo {
    bio: string;
    name: string;
    job?: string;
    link?: string;
}

const ProfileInformation = (props: IProfileInfo) => {
    const normalCnt = {
        marginBottom: "5px",
        color: "#9597A1",
    };
    return (
        <div style={{ marginTop: "20px", width: "250px" }}>
            <h5 style={{ marginBottom: "1px", fontWeight: "bold" }}>{props.name}</h5>
            <p style={normalCnt}>Software/Developer</p>
            <p style={{ fontSize: "14px", marginBottom: "5px" }}><span style={{ fontWeight: "bold" }}>Bio:</span> {props.bio || "This is Ho Chi Minh City, where I live and she is also here."}</p>
            <a href="http://facebook.com">{props.link || "abchub.com"}</a>
        </div>
    );
};

const AccountTimeLine = (props: any) => {
    const { accountId, authToken } = getAuthInfo();


    const currentAccountId: string = props.accountId;
    const { error, loading, data } = useQuery(GET_ACCOUNT_TIME_LINE_QUERY, {
        variables: {
            account_id: currentAccountId,
            auth_token: authToken
        }
    })

    if (error) {
        return <div>Error when get account timeline</div>
    }
    if (loading) {
        return null;
    }

    const articlePorts: Array<IArticlePost> = data.accountTimeline.articlePosts;

    return (
        <>
            {
                articlePorts.map((post, idx) => (
                    <UserPost
                        key={idx}
                        isDetail={false}
                        cnt={post.content}
                        accountId={currentAccountId}
                        medias={post.medias}
                        num_comments={post.userCommentCount}
                        num_reacts={post.userReactCount}
                        id={post.id || ""}
                    />
                ))
            }
        </>
    )
}

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

    const currentAccountId: string = props.accountId;
    const { accountId, authToken } = getAuthInfo();

    const { error, data, loading } = useQuery(GET_ACCOUNT_PROFILE_QUERY, {
        variables: {
            auth_token: authToken,
            account_id: currentAccountId
        }
    })

    if (error) {
        return <div>Error when get account profile</div>
    }
    if (loading) {
        return null
    }

    const accountProfile: IAccountProfile = data.accountProfile;

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <div style={{ position: "fixed", height: "35px", width: "35px", top: "15px", left: "15px", zIndex: 1 }} onClick={() => router.back()}>
                <img src={backImage} alt="X" height="100%" width="100%" />
            </div>
            <div style={{ height: "58%" }}>
                <div style={{ height: "218px" }}>
                    <img src={coverImg} alt="Cover" height="100%" width="100%" />
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: "0%", top: "10px" }}>
                        <FConnection />
                    </div>
                    <div style={{ marginLeft: "15px", marginTop: "15px" }}>
                        <div style={{ height: "80px", width: "80px", overflow: "hidden", borderRadius: "50%" }}>
                            <img alt="Profile" height="100%" width="100%" src={accountProfile.avatarUrl ? accountProfile.avatarUrl : profileImage} />
                        </div>
                        <ProfileInformation
                            bio={accountProfile.bio}
                            name={`${accountProfile.firstName} ${accountProfile.lastName}`} job={accountProfile.school} />
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
                    <AccountTimeLine accountId={currentAccountId} />
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            accountId: context.params.idx
        },
    }
}


const Extended = withTranslation("common")(AccountProfile);

export default Extended;
