const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Problem{
        _id: ID
        name: String
        description: String
        links: String
        photos: String
    }

    type Solution{
        _id: ID
        title: String
        description: String
        photo: String
        link: String
    }

    type Query{
        problems: [Problem]
        problem: Problem
        solutions: [Solution]
        Solution: Solution
    }

    type Mutation{
        addProblem(name:String!, description: String!, links: String, Photos: String): Problem
    }
`

module.exports = typeDefs