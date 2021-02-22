import { gql } from '@apollo/client';

const GET_ACCOUNT_TIME_LINE_QUERY = gql`
query($account_id: String!, $auth_token: String!){
    accountTimeline(authToken: $auth_token, accountId: $account_id){
      articlePosts {
        id
        accountId
        content
        userReactCount
        userCommentCount
        reactStatus
        medias {
          url
          type
        }
      }
    }
  }
`

export { GET_ACCOUNT_TIME_LINE_QUERY }
