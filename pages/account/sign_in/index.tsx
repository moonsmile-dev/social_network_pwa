import { IAccountSignIn } from "@Interfaces";
import { withTranslation } from "@Server/i18n";
import UsernameIcon from "@Assets/images/username_icon.png";
import { NextPage } from "next";
import React from "react";
import "antd/dist/antd.css";
import FlexInput from "@Components/Basic/FlexButton";
import PasswordIcon from "@Assets/images/key.png";
import PasswordExpandIcon from "@Assets/images/eye.png";
import { btnCntStyle, CntTxt } from "@Styled/Base";

const headerInfoDivStyle = {
    margin: "30px 0px 0px 40px",
};
const headerStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0px",
};
const headerDetailStyle = {
    color: "#8F8F8F",
};


const AccountSignIn: NextPage<
    IAccountSignIn.IProps,
    IAccountSignIn.InitialProps
> = ({ }) => {

    return (
        <div>
            <div style={headerInfoDivStyle}>
                <p style={headerStyle}>Let's Sign You In</p>
                <p style={headerDetailStyle}>
                    Welcome back, you've been missed
                </p>
            </div>
            <div style={{ padding: "15px", marginTop: "100px" }}>
                <form>
                    <FlexInput
                        name="User name or Email"
                        iconUrl={UsernameIcon}
                        placeHolder="Input your user name and email"
                    />
                    <FlexInput
                        name="Password"
                        placeHolder="Input your password"
                        iconUrl={PasswordIcon}
                        iconExpand={PasswordExpandIcon}
                    />
                    <div style={{ textAlign: "center", marginTop: "100px" }}>
                        <button style={{ ...btnCntStyle, margin: "10px" }}>
                            <CntTxt style={{ fontWeight: "300" }}>
                                Sign In
                            </CntTxt>
                        </button>
                        <p style={{ color: "#A3A3A3" }}>
                            Forgot password! <span style={{ fontWeight: "bold", color: "black" }}>Reset now</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Extended = withTranslation("common")(AccountSignIn);

export default Extended;
