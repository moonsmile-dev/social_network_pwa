// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import {
    Container
} from "@Styled/Home";

import LogoImage from "@Assets/images/dating_logo.jpg";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage } from "@Interfaces";
import { btnCntStyle, CntTxt } from "@Styled/Base";
import Link from "next/link";
import { helloQuery } from "@Libs/Queries/helloQuery";
import { initializeApollo } from "@Libs/apolloClient";
// #endregion Interface Imports

const logoRawStyle = {
    width: "100%",
    height: "60%",
    position: "relative",
} as React.CSSProperties;

const cntStyle = {
    backgroundColor: "white",
    width: "100%",
    height: "40%",
} as React.CSSProperties;

const bigCircleStyle = {
    position: "absolute",
    right: "0px",
    transform: "translate(100px,-100px)"
} as React.CSSProperties;
const smallCircleStyle = {
    position: "absolute",
    transform: "translate(-50px,300px)",
} as React.CSSProperties;

const logoImageStyle = {
    width: "275px",
    height: "275px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
} as React.CSSProperties;
const divInfoStyle = {
    textAlign: "center",
    padding: "20px"
} as React.CSSProperties;

const divBtnStyle = {
    textAlign: "center",
    padding: "20px",
};

const txtMasterStyle = {
    fontSize: "20px",
    fontWeight: "bold"
} as React.CSSProperties;

const txtDetailStyle = {
    fontSize: "12px",
    padding: "0px 50px",
};

const barStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "25px",
};
const barItemStyle = {
    backgroundColor: "#9799D6",
    width: "88px",
    height: "2px",
    borderRadius: "1px",
    margin: "2px",
};

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = (props: any) => {

    return (
        <Container>
            <div style={logoRawStyle}>
                <div>
                    <img src={LogoImage} style={logoImageStyle} />
                    <div style={{
                        ...bigCircleStyle,
                        width: "274px",
                        height: "274px",
                        borderRadius: "137px",
                        background: "#713FFF"
                    }} />
                    <div style={{
                        ...smallCircleStyle,
                        width: "150px",
                        height: "150px",
                        borderRadius: "75px",
                        background: "#9C9FFF"
                    }} />
                </div>
            </div>
            <div style={cntStyle}>
                <div>
                    <div style={barStyle}>
                        <div style={barItemStyle} />
                        <div style={barItemStyle} />
                        <div style={barItemStyle} />
                    </div>
                    <div style={divInfoStyle}>
                        <p style={txtMasterStyle}>
                            Welcome to our social network
                        </p>
                        <p style={txtDetailStyle}>
                            We are helping every peoples to search your truly
                            lover. Please join us...
                        </p>
                    </div>
                    <div style={divBtnStyle as React.CSSProperties}>
                        <Link href="/account/sign_up">
                            <button style={btnCntStyle}>
                                <CntTxt>Get Started</CntTxt>
                            </button>
                        </Link >
                    </div>
                </div>
            </div>
        </Container >
    );
};

const Extended = withTranslation("common")(Home);

export default Extended;
