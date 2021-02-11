import { gql } from "@apollo/client";

export const GET_MATCHER_LIST_QUERY = gql`
    query($auth_token: String!, $account_id: String!){
        matchers(authToken: $auth_token, accountId: $account_id){
            matcherId
            name
            age
            bio
            status
            medias {
                url
                type
            }
        }
    }
`