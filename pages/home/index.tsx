// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import {
    Container,
    Top,
    TopText,
    Middle,
    MiddleLeft,
    MiddleLeftButtons,
    MiddleRight,
    Apod,
    ApodButton,
    LogoPreview,
    InfoGetStarted,
    Circle,
} from "@Styled/Home";
import { IStore } from "@Redux/IStore";
import { HomeActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";

import LogoImage from "@Assets/images/dating_logo.jpg";
// #endregion Local Imports

// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
import { Row, Col } from "antd";
import { btnCntStyle, CntTxt } from "@Styled/Base";
import Link from "next/link";
// #endregion Interface Imports

const logoRawStyle = {
    width: "100%",
    height: "60%",
    position: "relative",
};

const cntStyle = {
    backgroundColor: "white",
    width: "100%",
    height: "40%",
};

const bigCircleStyle = {
    position: "absolute",
    right: "0px",
    transform: "translate(100px,-100px)"
};
const smallCircleStyle = {
    position: "absolute",
    transform: "translate(-50px,300px)",
};

const logoImageStyle = {
    width: "275px",
    height: "275px",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
};
const divInfoStyle = {
    textAlign: "center",
    padding: "20px"
};

const divBtnStyle = {
    textAlign: "center",
    padding: "20px",
};

const txtMasterStyle = {
    fontSize: "20px",
    fontWeight: "bold"
};

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

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
    t,
    i18n,
}) => {
    const home = useSelector((state: IStore) => state.home);
    const dispatch = useDispatch();

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <LocaleButton
                key={lang}
                lang={lang}
                isActive={activeLanguage === lang}
                onClick={() => i18n.changeLanguage(lang)}
            />
        ));

    return (
        <Container>
            <Row style={logoRawStyle}>
                <Col span={24}>
                    <img src={LogoImage} style={logoImageStyle} />
                    <Circle style={bigCircleStyle} r="137" color="#713FFF" />
                    <Circle style={smallCircleStyle} r="75" color="#9C9FFF" />
                </Col>
            </Row>
            <Row style={cntStyle}>
                <Col span={24}>
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
                    <div style={divBtnStyle}>
                        <Link href="/account/sign_up" style={{ btnCntStyle }}>
                            <button style={btnCntStyle}>
                                <CntTxt>Get Started</CntTxt>
                            </button>
                        </Link >
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    await ctx.store.dispatch(
        HomeActions.GetApod({
            params: { hd: true },
        })
    );
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;
