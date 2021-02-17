import { gql } from "@apollo/client";

export const GET_ACCOUNT_INFO_DATA_QUERY = gql`
query($account_id: String!, $auth_token: String!){
    accountInfo(authToken: $auth_token, accountId: $account_id){
      id
      verifyStatus
    }
  }
`