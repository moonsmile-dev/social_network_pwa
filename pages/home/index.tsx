// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
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
import { HomeActions } from "@Actions";
import { Heading, LocaleButton } from "@Components";
import { useQuery } from "@apollo/client";

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

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = (props: any) => {
    // const renderLocaleButtons = (activeLanguage: string) =>
    //     ["en", "es", "tr"].map(lang => (
    //         <LocaleButton
    //             key={lang}
    //             lang={lang}
    //             isActive={activeLanguage === lang}
    //             onClick={() => i18n.changeLanguage(lang)}
    //         />
    //     ));

    const { loading, error, data } = useQuery(helloQuery);
    if (error) {
        return <div>Error loading players.</div>;
    }
    if (loading) {
        return <div>Loading</div>;
    }

    console.log(`Fetched data: ${JSON.stringify(data)}`)


    return (
        <Container>
            <div style={logoRawStyle}>
                <div span={24}>
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
                    <div style={divBtnStyle}>
                        <Link href="/account/sign_up" style={{ btnCntStyle }}>
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

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    const data = await apolloClient.query({
        query: helloQuery,
    });

    console.log(`Data is gotten on reload page: ${JSON.stringify(data)}`)


    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1,
    };
}


const Extended = withTranslation("common")(Home);

export default Extended;
