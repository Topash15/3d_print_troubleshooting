import { gql } from "graphql-tag";

export const QUERY_ALL_PROBLEMS = gql`
  query getAllProblems {
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
      steps {
        _id
        step
        description
      }
    }
  }
`;

export const QUERY_PROBLEM = gql`
  query getProblem($id: ID!) {
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
  query getStep($id: ID!) {
    step(_id: $id) {
      _id
      step
      description
      successCount
      totalCount
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

export const QUERY_ALL_STEPS = gql`
  query Responses($category: String) {
    steps(category: $category) {
      _id
      step
      description
      category {
        _id
        name
        description
        links
        photos
        firstStep {
          _id
        }
      }
      responses {
        _id
        text
        photo
        nextStep {
          _id
        }
      }
      linkedResponses {
        _id
        text
        photo
      }
    }
  }
`;

export const QUERY_RESPONSE = gql`
  query getResponse($id: ID!) {
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
