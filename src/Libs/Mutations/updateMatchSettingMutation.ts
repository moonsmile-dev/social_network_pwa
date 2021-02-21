import { gql } from "@apollo/client";

const UPDATE_MATCH_SETTING_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $min_age: Int!, $max_age: Int!, $max_distance: Int!, $target_gender: String!){
    userUpdateMatchSetting(accountId: $account_id, authToken: $auth_token, maxAge: $max_age, maxDistance: $max_distance, minAge: $min_age, targetGender: $target_gender){
      status
    }
  }
`

export { UPDATE_MATCH_SETTING_MUTATION }