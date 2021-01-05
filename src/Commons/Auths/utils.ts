const REFRESH_TOKEN_KEY = "refresh_token";
const ACCOUNT_ID_KEY = "account_id";
const AUTH_TOKEN_KEY = "auth_token";

export const saveAuthInfo = (
    accountId: string,
    authToken: string,
    refreshToken: string
) => {
    localStorage.setItem(ACCOUNT_ID_KEY, accountId);
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAuthInfo = () => {
    return {
        accountId: localStorage.getItem(ACCOUNT_ID_KEY),
        authToken: localStorage.getItem(AUTH_TOKEN_KEY),
        refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    };
};
