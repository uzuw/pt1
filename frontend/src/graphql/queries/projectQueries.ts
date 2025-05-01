import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjectsByUser($userId: ID!) {
  getProjectsByUser(userId: $userId) {
    id
    name
    description
    status
    startDate
    githubRepoUrl
    tags
  }
}

`;
