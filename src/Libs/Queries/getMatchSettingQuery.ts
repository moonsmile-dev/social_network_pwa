import { gql } from "@apollo/client";

const GET_MATCH_SETTING_QUERY = gql`
query($account_id: String!, $auth_token: String!){
    userMatchSetting(authToken: $auth_token, accountId: $account_id){
      minAge
      maxAge
      maxDistance
      targetGender
    }
  }
`
export { GET_MATCH_SETTING_QUERY }