import { gql } from "@apollo/client";

const GET_POST_DETAIL_QUERY = gql`
query($account_id: String!, $auth_token: String!, $post_id: String!){
    userPostDetail(authToken: $auth_token, accountId: $account_id, postId: $post_id){
      id
      content
      medias {
        url
        type
      }
      userCommentCount
      userReactCount
      userComments {
        id
        accountId
        content
      }
      userReacts {
        type
        accountIds
      }
    }
  }
`

export { GET_POST_DETAIL_QUERY }