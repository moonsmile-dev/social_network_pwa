import { gql } from "@apollo/client";

const GET_ACCOUNT_MEDIAS_QUERY = gql`
query($account_id: String!, $auth_token: String!){
    accountMedias(authToken: $auth_token, accountId: $account_id){
      url
      type
    }
  }
`

export { GET_ACCOUNT_MEDIAS_QUERY };