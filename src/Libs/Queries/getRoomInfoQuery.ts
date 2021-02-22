import { from } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_ROOM_INFO_QUERY = gql`
query($auth_token: String!, $account_id: String!, $room_id: String!){
    roomInfo(authToken: $auth_token, accountId: $account_id, roomId: $room_id){
      id
      partnerId
      partnerName
    }
  }
`;

export { GET_ROOM_INFO_QUERY }