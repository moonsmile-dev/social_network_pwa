import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
    mutation($account_id: String!, $auth_token: String!, $content: String!, $medias: [MediaPostType] ) {
        userCreatePost(accountId: $account_id, authToken: $auth_token, content: $content, medias: $medias){
        status
        }
    }
`
