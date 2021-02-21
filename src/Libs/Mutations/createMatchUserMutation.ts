import { gql } from "@apollo/client";

export const CREATE_MATCH_USER_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $receiver_id: String!, $status: Int!){
    userCreateMatch(accountId: $account_id, authToken: $auth_token, receiverId: $receiver_id, status: $status){
      status
    }
  }
`