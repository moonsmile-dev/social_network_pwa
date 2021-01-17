import { IAcountSignUp } from "@Interfaces";
import { withTranslation } from "@Server/i18n";
import React from "react";
import emailIcon from "@Assets/images/email.png";
import usernameIcon from "@Assets/images/username_icon.png";
import passwordIcon from "@Assets/images/key.png";
import passwordExpandIcon from "@Assets/images/eye.png";
import usernameExpandIcon from "@Assets/images/confirm.png";
import fbIcon from "@Assets/images/facebook.png";
import FlexInput from "@Components/Basic/FlexInput";
import { btnCntStyle, CntTxt } from "@Styled/Base";
import Link from "next/link";
import { NextPage } from "next";
import { State, useState } from "@hookstate/core";
import { useMutation } from "@apollo/client";
import { SIGN_UP_ACCOUNT_MUTATION } from "@Libs/Mutations/signUpAccountMutation";
import { LOGIN_ACCOUNT_MUTATION } from "@Libs/Mutations/loginAccountMutation";
import { useRouter } from "next/router";
import { ACCOUNT_CONFIRM_OTP_PAGE_ROUTE, HOME_PAGE_ROUTE } from "src/Routes/contants";
import { saveAuthInfo } from "src/Commons/Auths/utils";
import AuthenticatePageNotRequired from "@Components/Auths/AuthenticatePageNotRequired";

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
    const email = useState("");
    const username = useState("");
    const password = useState("");

    const [signUpAction] = useMutation(SIGN_UP_ACCOUNT_MUTATION);
    const [signInAction] = useMutation(LOGIN_ACCOUNT_MUTATION)
    const router = useRouter();


    const handleSignUpAccount = async () => {
        try {
            await signUpAction({
                variables: {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                },
            });

            const { data } = await signInAction({
                variables: {
                    username: username.value,
                    password: password.value,
                },
            });
            const { accountId, authToken, refreshToken } = data.loginAccount;
            saveAuthInfo(accountId, authToken, refreshToken);

            router.push(ACCOUNT_CONFIRM_OTP_PAGE_ROUTE)
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <AuthenticatePageNotRequired>
            <div style={headerInfoDivStyle}>
                <p style={headerStyle as React.CSSProperties}>Getting started</p>
                <p style={headerDetailStyle}>
                    create an account to continue
                        </p>
            </div>
            <div>
                <div style={{ margin: "50px 15px" }}>
                    <FlexInput
                        name="Email"
                        placeHolder="Input your email"
                        iconUrl={emailIcon}
                        onChange={(event) => email.set(event.target.value)}
                    />
                    <FlexInput
                        name="Username"
                        placeHolder="Input your username"
                        iconUrl={usernameIcon}
                        onChange={(event) => username.set(event.target.value)}
                        iconExpand={usernameExpandIcon}
                    />
                    <FlexInput
                        name="Password"
                        placeHolder="Input your password"
                        iconUrl={passwordIcon}
                        iconExpand={passwordExpandIcon}
                        onChange={(event) => { password.set(event.target.value) }}
                        hideContent={true}
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
                        <button style={{ ...btnCntStyle, margin: "10px" }} onClick={() => { handleSignUpAccount() }}>
                            <CntTxt style={{ fontWeight: "bold" }}>
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
                </div>
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
            </div>
        </AuthenticatePageNotRequired>
    );
};

const Extended = withTranslation("common")(AccountSignUp);

export default Extended;
