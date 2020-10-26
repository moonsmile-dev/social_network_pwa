import { IAcountSignUp } from "@Interfaces";
import { withTranslation } from "@Server/i18n";
import { Col, Row } from "antd";
import React from "react";
import emailIcon from "@Assets/images/email.png";
import usernameIcon from "@Assets/images/username_icon.png";
import passwordIcon from "@Assets/images/key.png";
import passwordExpandIcon from "@Assets/images/eye.png";
import usernameExpandIcon from "@Assets/images/confirm.png";
import fbIcon from "@Assets/images/facebook.png";
import FlexInput from "@Components/Basic/FlexButton";
import { btnCntStyle, CntTxt } from "@Styled/Base";
import Link from "next/link";

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
const fbBtnStyle = {
    height: "44px",
    width: "348px",
    borderRadius: "22px",
    backgroundColor: "#0047FF",
    borderColor: "#798FFF",
};

const AccountSignUp: NextPage<
    IAcountSignUp.IProps,
    IAcountSignUp.InitialProps
// eslint-disable-next-line no-empty-pattern
> = ({ }) => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <div style={headerInfoDivStyle}>
                        <p style={headerStyle}>Getting started</p>
                        <p style={headerDetailStyle}>
                            create an account to continue
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <form style={{ margin: "50px 15px" }}>
                        <FlexInput
                            name="Email"
                            placeHolder="Input your email"
                            iconUrl={emailIcon}
                        />
                        <FlexInput
                            name="Username"
                            placeHolder="Input your username"
                            iconUrl={usernameIcon}
                            iconExpand={usernameExpandIcon}
                        />
                        <FlexInput
                            name="Password"
                            placeHolder="Input your password"
                            iconUrl={passwordIcon}
                            iconExpand={passwordExpandIcon}
                        />
                        <div style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "5px",
                                }}
                            />
                            <p style={{ lineHeight: "20px" }}>
                                By checking box, you agreed our{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    terms and conditions
                                </span>
                            </p>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "35px" }}>
                            <button style={{ ...btnCntStyle, margin: "10px" }}>
                                <CntTxt style={{ fontWeight: "300" }}>
                                    Sign Up
                                </CntTxt>
                            </button>
                            <p style={{ color: "#A3A3A3" }}>
                                Already have an account?{" "}
                                <Link href="/account/sign_in">
                                    <a>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: "black",
                                            }}
                                        >
                                            Sign In
                                        </span>
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <button style={fbBtnStyle}>
                            <div
                                style={{
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    style={{
                                        width: "27px",
                                        height: "27px",
                                        marginRight: "10px",
                                    }}
                                    src={fbIcon}
                                />
                                <p style={{ color: "white", margin: "0px" }}>
                                    Connect with Facebook
                                </p>
                            </div>
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const Extended = withTranslation("common")(AccountSignUp);

export default Extended;
