import { gql } from "@apollo/client";

export const UPDATE_MEDIAS_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $medias: [MediaAccountType]!){
    userUpdateMedias(accountId: $account_id, authToken: $auth_token, medias: $medias){
      status
    }
  }
`