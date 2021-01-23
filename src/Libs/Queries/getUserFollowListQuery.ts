import { gql } from '@apollo/client';


const GET_USER_FOLLOW_LIST_QUERY = gql`
    query($auth_token: String!, $account_id: String!){
        userFollowers(authToken: $auth_token, accountId: $account_id){
        id
        name
        avatar
        }
    }
`

export { GET_USER_FOLLOW_LIST_QUERY }
