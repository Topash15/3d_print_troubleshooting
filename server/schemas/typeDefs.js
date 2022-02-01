const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Problem{
        _id: ID
        name: String
        description: String
        links: String
        photos: String
    }

    type Query{
        problems: [Problem]
    }

    type Mutation{
        addProblem(name:String!, description: String!, links: String, Photos: String): Problem
    }
`

module.exports = typeDefs