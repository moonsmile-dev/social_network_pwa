import { gql } from "@apollo/client";

export const VERIFY_ACCOUNT_MUTATION = gql`
    mutation($account_id: String!, $auth_token: String!, $front_photo_url: String!, $back_photo_url: String!){
        accountVerify(accountId: $account_id, authToken: $auth_token, data: 
        {
        backPhotoUrl: $back_photo_url,
        frontPhotoUrl: $front_photo_url
        }){
        status
        }
    }
`