import { gql } from '@apollo/client';

const GET_USER_STORY_LIST_QUERY = gql`
    query($account_id: String!, $auth_token: String!){
        userStories(authToken: $auth_token, accountId: $account_id){
            id
            name
            mediaDatas {
                id
                content
                mediaUrl
            }
        }
    }
`

export { GET_USER_STORY_LIST_QUERY }
