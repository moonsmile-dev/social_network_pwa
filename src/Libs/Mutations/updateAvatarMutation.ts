import { gql } from "@apollo/client";

export const UPDATE_AVATAR_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $data: AvatarMediaAccountType!){
    userUpdateAvatar(accountId: $account_id, authToken: $auth_token, data: $data){
      status
    }
  }
`