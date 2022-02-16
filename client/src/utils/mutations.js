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

export const CREATE_STEP = gql`
  mutation Mutation(
    $step: String!
    $category: String!
    $description: String
    $links: String
  ) {
    addStep(
      step: $step
      category: $category
      description: $description
      links: $links
    ) {
      _id
      step
      description
      category {
        _id
        name
      }
    }
  }
`;
