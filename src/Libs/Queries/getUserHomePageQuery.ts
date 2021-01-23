import { gql } from '@apollo/client';

const GET_USER_HOME_PAGE_QUERY = gql`
    query($auth_token: String!, $account_id: String!){
        accountHomepage(authToken: $auth_token, accountId: $account_id){
            articlePosts {
                id,
                accountId,
                content,
                medias {
                url,
                type
                },
                userCommentCount,
                userReactCount
            }
        }
    }

`

export { GET_USER_HOME_PAGE_QUERY }
