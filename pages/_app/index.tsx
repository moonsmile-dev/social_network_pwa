// #region Global Imports
import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
// #endregion Global Imports

// #region Local Imports
import { theme } from "@Definitions/Styled";
import { appWithTranslation } from "@Server/i18n";
import { AppWithStore } from "@Interfaces";
import { makeStore } from "@Redux";

import "@Static/css/main.scss";
// #endregion Local Imports

class WebApp extends App<AppWithStore> {
    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
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
            </Provider>
        );
    }
}

export default withRedux(makeStore)(appWithTranslation(WebApp));
