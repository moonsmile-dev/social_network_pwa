import { gql } from '@apollo/client';

export const CREATE_ROOM_MUTATION = gql`
    mutation($account_id: String!, $auth_token: String!, $receiver_id: String!){
        userCreateRoom(accountId: $account_id, authToken:$auth_token, receiverId: $receiver_id){
        roomId
        }
    }
`
