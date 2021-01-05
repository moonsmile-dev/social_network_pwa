import { gql } from "@apollo/client";


const SIGN_UP_ACCOUNT_MUTATION = gql`
    mutation($email: String!, $username: String!, $password: String!) {
        registerAccount(
            email: $email
            password: $password
            username: $username
        ) {
        status
        }
    }
`;

export { SIGN_UP_ACCOUNT_MUTATION };
