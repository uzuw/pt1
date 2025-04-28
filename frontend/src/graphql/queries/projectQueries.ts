import { gql } from "@apollo/client";

const GET_PROJECTS=gql`
query getProjects{
    projects{
        id
        name
        description
        status
        startDate
        githubRepoUrl
        tags
        conpletedDate
        userId
    }

}
`

export {GET_PROJECTS}