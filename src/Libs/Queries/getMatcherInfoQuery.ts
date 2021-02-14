import { gql } from "@apollo/client";

export const GET_MATCHER_INFO_QUERY = gql`
    query($auth_token: String!, $account_id: String!, $matcher_id: String!){
        matcherInfo(authToken: $auth_token, accountId: $account_id, matcherId: $matcher_id){
            matcherId
            name
            age
            gender
            address
            job
            reason
            status
            medias {
                type
                url
            }
        }
    }
`