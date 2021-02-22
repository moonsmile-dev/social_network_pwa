import { gql } from "@apollo/client";

const GET_MATCHING_DATA_QUERY = gql`
query($account_id: String!, $auth_token: String!){
    matchingData(authToken: $auth_token, accountId: $account_id){
      numSmartChatUsers
      numTraditionalMatchUsers
      nearlyUsers {
        id
        avatar
        name
        bio
        age
        gender
      }
    }
  }
`

export { GET_MATCHING_DATA_QUERY }