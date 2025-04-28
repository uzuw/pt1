// graphql/mutations/projectMutation.ts
import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $startDate: String
    $githubRepoUrl: String
    $tags: [String]
    $userId:ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      startDate: $startDate
      githubRepoUrl: $githubRepoUrl
      tags: $tags
      userId:$userId
    ) {
      id
      name
      description
      status
      startDate
      githubRepoUrl
      tags
      $userId
    }
  }
`;
