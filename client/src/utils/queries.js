import { gql } from "graphql-tag";

export const QUERY_ALL_PROBLEMS = gql`
  query Query {
    problems {
      _id
      name
      description
      links
      photos
      firstStep {
        _id
        step
        description
      }
    }
  }
`;

export const QUERY_PROBLEM = gql`
  query Query($id: ID!) {
    problem(_id: $id) {
      _id
      name
      description
      links
      photos
      firstStep {
        _id
        step
        description
      }
    }
  }
`;

export const QUERY_STEP = gql`
  query Query($id: ID!) {
    step(_id: $id) {
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

export const QUERY_RESPONSE = gql`
  query Query($id: ID!) {
    response(_id: $id) {
      _id
      text
      photo
      nextStep {
        _id
      }
    }
  }
`;
