import { gql } from "@apollo/client";

export const REPORT_USER_MUTATION = gql`
    mutation($account_id: String!, $auth_token: String!, $receiver_id: String!, $reason: String!, $related_post_id: String!){
        reportUser(accountId: $account_id, authToken: $auth_token, data: {
        reason: $reason
        relatedPostId: $related_post_id
        receiverId: $receiver_id
        }){
        status
        }
    }
`