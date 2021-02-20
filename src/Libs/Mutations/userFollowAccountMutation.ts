import { gql } from "@apollo/client";

const USER_FOLLOW_ACCOUNT_MUTATION = gql`
mutation($auth_token: String!, $account_id: String!, $target_id: String!) {
    userFollowUser(accountId: $account_id, authToken: $auth_token, targetId: $target_id) {
      status
    }
  }  
`

export { USER_FOLLOW_ACCOUNT_MUTATION }