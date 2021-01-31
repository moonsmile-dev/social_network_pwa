import { gql } from "@apollo/client";

export const GET_ROOM_CHAT_LIST_QUERY = gql`
    query($account_id: String!, $auth_token: String!){
        userRooms(authToken: $auth_token, accountId: $account_id){
            id
            avtIconUrl
            name
            latestMsg
            latestMsgTime
            numUnReadMsg
        }
    }
`
