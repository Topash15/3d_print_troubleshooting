const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Problem {
    _id: ID
    name: String
    description: String
    links: String
    photos: String
    firstStep: Step
  }

  type Response {
    _id: ID
    text: String!
    photo: String
    nextStep: Step
  }

  type Step {
    _id: ID
    step: String!
    description: String
    category: [Problem]
    responses: [Response]
  }

  type Query {
    problems: [Problem]
    problem(_id: ID!): Problem
    responses: [Response]
    response(_id: ID!): Response
    steps: [Step]
    step(_id: ID!): Step
  }

  type Mutation {
    addProblem(
      name: String!
      description: String!
      links: String
      photos: String
      firstStep: String
    ): Problem
    editProblem(
      _id: ID!
      name: String
      description: String
      links: String
      photos: String
      firstStep: String
    ): Problem

    addStep(
      step: String!
      description: String
      links: String
      category: String!
    ): Step
    editStep(_id: ID!, step: String, description: String): Step
    addCategoryStep(_id: ID!, category: String!): Step
    addResponsesStep(_id: ID!, responses: String!): Step

    addResponse(text: String!, photo: String): Response
  }
`;

module.exports = typeDefs;
