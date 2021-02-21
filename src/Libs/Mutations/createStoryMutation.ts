import { gql } from "@apollo/client";

const CREATE_STORY_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $content: String!, $media_url: String!){
    userCreateStory(accountId: $account_id, authToken: $auth_token, storyData: {
      content: $content,
      mediaUrl: $media_url
    }){
      status
    }
  }
`

export { CREATE_STORY_MUTATION }