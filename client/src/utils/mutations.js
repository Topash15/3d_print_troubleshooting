import { gql } from "graphql-tag";

export const CREATE_PROBLEM = gql`
  mutation Mutation(
    $name: String!
    $description: String!
    $links: String
    $photos: String
  ) {
    addProblem(
      name: $name
      description: $description
      links: $links
      photos: $photos
    ) {
      _id
      name
      description
      links
      photos
    }
  }
`;
