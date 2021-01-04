import { gql } from "@apollo/client";


const LOGIN_ACCOUNT_MUTATION = gql`
    mutation($username: String!, $password: String!){
        loginAccount(password: $password, username: $username){
            accountId
            authToken
        refreshToken
        }
    }
`;

export { LOGIN_ACCOUNT_MUTATION };
