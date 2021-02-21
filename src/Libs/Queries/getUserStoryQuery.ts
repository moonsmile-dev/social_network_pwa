import { gql } from "@apollo/client";

const GET_USER_STORY_QUERY = gql`
query($account_id: String!, $auth_token: String!, $partner_id: String!){
    userStory(authToken: $auth_token, accountId: $account_id, partnerId: $partner_id){
      id
      name
      mediaDatas {
        mediaUrl
        id
      }
    }
  }
`
export { GET_USER_STORY_QUERY }