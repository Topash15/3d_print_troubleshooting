const { Problem } = require("../models");

const resolvers = {
  Query: {
    problems: async(parent, args, context) => {
      return Problem.find();
    }
  }
}

module.exports = resolvers;