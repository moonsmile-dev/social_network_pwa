import { gql } from '@apollo/client';

export interface IAccountInfo {
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

const GET_ACCOUNT_INFO_QUERY = gql`
    query($auth_token: String!, $account_id: String!){
        accountProfile(authToken: $auth_token, accountId: $account_id){
            firstName
            lastName
            avatarUrl
        }
    }
`
export { GET_ACCOUNT_INFO_QUERY };
