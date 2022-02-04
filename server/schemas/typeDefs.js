const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Problem{
        _id: ID
        name: String
        description: String
        links: String
        photos: String
        firstQuestion: Question
    }

    type Solution{
        _id: ID
        title: String
        description: String
        photo: String
        link: String
    }

    type Answer{
        _id: ID
        text: String!
        photo: String
        nextQuestion: Question
        solution: [Solution]
    }

    type Question{
        _id: ID
        question: String!
        description: String
        category: [Problem]
        answers: [Answer]
    }

    type Query{
        problems: [Problem]
        problem(_id: ID!): Problem
        solutions: [Solution]
        solution(_id: ID!): Solution
        answers: [Answer]
        answer(_id: ID!): Answer
        questions: [Question]
        question(_id: ID!): Question
    }

    type Mutation{
        addProblem(name:String!, description: String!, links: String, photos: String, firstQuestion: String): Problem
        editProblem(_id: ID!, name:String, description: String, links: String, photos: String, firstQuestion: String): Problem

        addQuestion(question:String!, description: String, links: String, category: String!): Question
        editQuestion(_id: ID!, question: String, description: String): Question
        addCategoryQuestion(_id: ID!, category: String): Question
        addAnswersQuestion(_id: ID!, answers: String): Question

        addAnswer(text:String!, photo: String): Answer
        addSolutionAnswer(_id: ID!, solution: String): Answer

        addSolution(title:String!, description: String!, link: String, photo: String): Solution
    }
`

module.exports = typeDefs