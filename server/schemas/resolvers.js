const { Problem, Solution } = require("../models");

const resolvers = {
  Query: {
    problems: async(parent, args, context) => {
      return Problem.find();
    },
    solutions: async(parent, args, context) => {
      return Solution.find();
    }
  },
  Mutation: {
    addProblem: async(parent, args, context) => {
      const problem = await Problem.create(args)
      return problem
    }
  }
}

module.exports = resolvers;