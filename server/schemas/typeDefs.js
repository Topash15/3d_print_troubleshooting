const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Problem {
    _id: ID
    name: String
    description: String
    links: String
    photos: String
    firstStep: Step
    steps: [Step]
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
    category: Problem
    responses: [Response]
    linkedResponses: [Response]
    successCount: Int
    totalCount: Int
  }

  type Query {
    problems: [Problem]
    problem(_id: ID!): Problem
    responses: [Response]
    response(_id: ID!): Response
    steps(category: String): [Step]
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
      steps: String
    ): Problem

    deleteProblem(_id: ID!): Problem


    addStep(
      step: String!
      description: String
      links: String
      category: String!
    ): Step

    editStep(_id: ID!, step: String, description: String, successCount: Int, totalCount: Int): Step
    addCategoryStep(_id: ID!, category: String!): Step
    addResponsesStep(_id: ID!, responses: String!): Step
    removeResponsesStep(_id: ID!, responses: String!): Step
    addLinkedResponsesStep(_id: ID!, linkedResponses: String!): Step
    removeLinkedResponsesStep(_id: ID!, linkedResponses: String!): Step
    deleteStep(_id: ID, category: String): Step

    
    addResponse(text: String!, photo: String): Response
    editResponse(_id: ID!, text: String, photo: String, nextStep: String): Response
    deleteResponse(_id: ID!): Response
  }
`;

module.exports = typeDefs;
