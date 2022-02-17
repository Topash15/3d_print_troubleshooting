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

export const CREATE_RESPONSE = gql`
  mutation Mutation($text: String!, $photo: String) {
    addResponse(text: $text, photo: $photo) {
      _id
      text
      photo
    }
  }
`;

export const EDIT_PROBLEM = gql`
  mutation Mutation(
    $id: ID!
    $name: String
    $description: String
    $links: String
    $photos: String
    $firstStep: String
    $steps: String
  ) {
    editProblem(
      _id: $id
      name: $name
      description: $description
      links: $links
      photos: $photos
      firstStep: $firstStep
      steps: $steps
    ) {
      _id
      name
      description
      links
      photos
      firstStep {
        _id
        step
      }
      steps {
        _id
        step
      }
    }
  }
`;
