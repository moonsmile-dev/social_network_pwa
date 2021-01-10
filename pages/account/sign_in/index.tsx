import { IAccountSignIn } from "@Interfaces";
import { withTranslation } from "@Server/i18n";
import UsernameIcon from "@Assets/images/username_icon.png";
import { NextPage } from "next";
import React, { useEffect } from "react";
import FlexInput from "@Components/Basic/FlexInput";
import PasswordIcon from "@Assets/images/key.png";
import PasswordExpandIcon from "@Assets/images/eye.png";
import { btnCntStyle, CntTxt } from "@Styled/Base";
import { useState } from "@hookstate/core";
import { useMutation } from "@apollo/client";
import { LOGIN_ACCOUNT_MUTATION } from "@Libs/Mutations/loginAccountMutation";
import { NextRouter, useRouter } from "next/router";
import { HOME_PAGE_ROUTE } from "src/Routes/contants";
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


const handleRoute = async (router: NextRouter) => {
    const authToken: string = localStorage.getItem('auth_token')

    if (authToken) {
        await router.push("/main_in_app/root")
    }
}

const AccountSignIn: NextPage<
    IAccountSignIn.IProps,
    IAccountSignIn.InitialProps
> = (props: any) => {
    const username = useState("");
    const password = useState("");
    const [loginAccount, { data, error, loading }] = useMutation(
        LOGIN_ACCOUNT_MUTATION
    );
    const router = useRouter();

    useEffect(() => {
        handleRoute(router)
    })



    const handleSignInOnClick = async () => {
        try {
            const { data } = await loginAccount({
                variables: { username: username.value, password: password.value },
            });

            const {
                accountId,
                authToken,
                refreshToken,
            } = data.loginAccount;

            saveAuthInfo(accountId, authToken, refreshToken);
            await router.push(HOME_PAGE_ROUTE);

        } catch (error) {
            console.log(error.message)
        }

    };

    return (
        <AuthenticatePageNotRequired>
            <div style={headerInfoDivStyle}>
                <p style={headerStyle}>Let's Sign You In</p>
                <p style={headerDetailStyle}>
                    Welcome back, you've been missed
                </p>
            </div>
            <div style={{ padding: "15px", marginTop: "100px" }}>
                <FlexInput
                    name="User name or Email"
                    iconUrl={UsernameIcon}
                    placeHolder="Input your user name and email"
                    onChange={(event) => username.set(event.target.value)}
                />
                <FlexInput
                    name="Password"
                    placeHolder="Input your password"
                    iconUrl={PasswordIcon}
                    iconExpand={PasswordExpandIcon}
                    hideContent={true}
                    onChange={(event) => password.set(event.target.value)}
                />
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <button style={{ ...btnCntStyle, margin: "10px" }} onClick={handleSignInOnClick}>
                        <CntTxt style={{ fontWeight: "300" }}>
                            Sign In
                            </CntTxt>
                    </button>
                    <p style={{ color: "#A3A3A3" }}>
                        Forgot password! <span style={{ fontWeight: "bold", color: "black" }}>Reset now</span>
                    </p>
                </div>
            </div>
        </AuthenticatePageNotRequired>
    );
};

const Extended = withTranslation("common")(AccountSignIn);
export default Extended;
