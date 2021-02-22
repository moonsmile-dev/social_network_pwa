import { gql } from "@apollo/client";

export const USER_REACT_POST_MUTATION = gql`
mutation mutation_userReactPo79($account_id: String!, $auth_token: String!, $post_id: String!, $type: String!) {
    userReactPost(accountId: $account_id, authToken: $auth_token, postId: $post_id, reactData: {type: $type}) {
      status
    }
  }  
`