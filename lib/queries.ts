import { gql } from "@apollo/client";

export const GET_TEACHER_STATEMENTS = gql`
  query {
  statements {
    nodes {
      title
      teacherFields {
        name
        text
        image {
          node {
            databaseId
          }
        }
      }
    }
  }
}

`;
