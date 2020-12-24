// #region Global Imports
import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { appWithTranslation, withTranslation } from "@Server/i18n";

import "@Static/css/main.scss";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@Libs/apolloClient";
// #endregion Local Imports

function WebApp(props: any) {
    const { Component, pageProps } = props;
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                    />
                    <meta name="description" content="Description" />
                    <meta name="keywords" content="Keywords" />
                    <title>Next.js PWA Example</title>

                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="/favicon-16x16.png"
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                    />
                    <link
                        href="/favicon-32x32.png"
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                    />
                    <link rel="apple-touch-icon" href="/apple-icon.png" />
                    <meta name="theme-color" content="#317EFB" />
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );

}

export default withTranslation("common")(WebApp);
