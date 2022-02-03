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
        Solution: [Solution]
    }

    type Question{
        _id: ID
        question: String!
        description: String
        answer: [Answer]
    }

    type Query{
        problems: [Problem]
        problem: Problem
        solutions: [Solution]
        solution: Solution
        answers: [Answer]
        answer: Answer
        questions: [Question]
        question: Question
    }

    type Mutation{
        addProblem(name:String!, description: String!, links: String, photos: String): Problem
        addQuestion(question:String!, description: String, links: String): Question
        addAnswer(text:String!, photo: String): Answer
        addSolution(title:String!, description: String!, link: String, photo: String): Solution
    }
`

module.exports = typeDefs