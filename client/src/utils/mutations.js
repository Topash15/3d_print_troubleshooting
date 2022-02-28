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
      }
      steps {
        _id
      }
    }
  }
`;

export const ADD_RESPONSE_TO_STEP = gql`
  mutation Mutation($id: ID!, $responses: String!) {
    addResponsesStep(_id: $id, responses: $responses) {
      _id
      step
      description
      category {
        _id
        name
      }
      responses {
        _id
        text
        photo
        nextStep {
          _id
        }
      }
    }
  }
`;

export const REMOVE_RESPONSE_FROM_STEP = gql`
  mutation Mutation($id: ID!, $responses: String!) {
    removeResponsesStep(_id: $id, responses: $responses) {
      _id
    }
  }
`;

export const ADD_LINKED_RESPONSE_TO_STEP = gql`
  mutation AddLinkedResponsesStep($id: ID!, $linkedResponses: String!) {
    addLinkedResponsesStep(_id: $id, linkedResponses: $linkedResponses) {
      _id
      step
      description
      linkedResponses {
        _id
        text
      }
    }
  }
`;

export const REMOVE_LINKED_RESPONSE_FROM_STEP = gql`
mutation RemoveLinkedResponsesStep($id: ID!, $linkedResponses: String!) {
  removeLinkedResponsesStep(_id: $id, linkedResponses: $linkedResponses) {
    _id
    step
    description
    linkedResponses {
      _id
      text
    }
  }
}
`;

export const EDIT_RESPONSE = gql`
  mutation Mutation(
    $id: ID!
    $text: String
    $photo: String
    $nextStep: String
  ) {
    editResponse(_id: $id, text: $text, photo: $photo, nextStep: $nextStep) {
      _id
    }
  }
`;

export const DELETE_STEP = gql`
  mutation Mutation($id: ID, $category: String) {
    deleteStep(_id: $id, category: $category) {
      _id
    }
  }
`;

export const DELETE_PROBLEM = gql`
  mutation Mutation($id: ID!) {
    deleteProblem(_id: $id) {
      _id
    }
  }
`;

export const DELETE_RESPONSE = gql`
  mutation Mutation($id: ID!) {
    deleteResponse(_id: $id) {
      _id
    }
  }
`;
