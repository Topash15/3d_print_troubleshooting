const { Problem, Solution, Question, Answer } = require("../models");

const resolvers = {
  Query: {
    // get all problems
    problems: async(parent, args, context) => {
      return Problem.find();
    },
    // get all solutions
    solutions: async(parent, args, context) => {
      return Solution.find();
    },
    // get all answers
    answers: async(parent, args, context) => {
      return Answer.find();
    },
    // get all questions
    questions: async(parent, args, context) => {
      return Question.find();
    }
  },
  Mutation: {
    // creates new problem
    addProblem: async(parent, args, context) => {
      const problem = await Problem.create(args)
      return problem
    },
    // creates new question
    addQuestion: async(parent, args, context) => {
      const question = await Question.create(args)
      return question
    },
    // creates new answer
    addAnswer: async(parent, args, context) => {
      const answer = await Answer.create(args)
      return answer
    },
    // creates new solution
    addSolution: async(parent, args, context) => {
      const solution = await Solution.create(args)
      return solution
    }
  }
}

module.exports = resolvers;