import { gql } from '@apollo/client';

const GET_ACCOUNT_PROFILE_QUERY = gql`
    query($auth_token: String!, $account_id: String!){
        accountProfile(authToken: $auth_token, accountId: $account_id){
            email
            phoneNumber
            firstName
            lastName
            gender
            maritalStatus
            birthDate
            school
            address
            bio
            avatarUrl
            coverUrl
        }
    }
`

export {
    GET_ACCOUNT_PROFILE_QUERY
}
