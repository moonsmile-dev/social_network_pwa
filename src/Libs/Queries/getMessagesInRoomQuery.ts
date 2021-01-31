import { gql } from "@apollo/client";


export const GET_MESSAGES_IN_ROOM_QUERY = gql`
    query($account_id: String!, $auth_token: String!, $room_id: String!){
        userRoomMessages(authToken: $auth_token, accountId: $account_id, roomId: $room_id) {
            id
            senderId
            content
            createdAt
            mediaData {
                url
                type
            }
        }
    }
`
