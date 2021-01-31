import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT_PROFILE_MUTATION = gql`
mutation($account_id: String!, $auth_token: String!, $address: String!, $avatar_url: String!, $bio: String!, $birth_date: Date, $cover_url: String!, $email: String!, $first_name: String!, $gender: String!, $last_name: String!, $marital_status: String!, $phone_number: String!, $school: String!){
    updateAccountProfile(accountId: $account_id, address: $address, authToken: $auth_token, avatarUrl: $avatar_url, bio: $bio, birthDate: $birth_date, coverUrl: $cover_url, email: $email, firstName: $first_name, gender: $gender, lastName: $last_name, maritalStatus: $marital_status, phoneNumber: $phone_number, school: $school){
      status
    }
  }
`
