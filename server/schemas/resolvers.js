const { Problem, Solution, Question, Answer } = require("../models");

const resolvers = {
  Query: {
    // get all problems
    problems: async (parent, args, context) => {
      return Problem.find().populate({
        path: "firstQuestion",
        populate: "question",
      });
    },
    //get single problem
    problem: async (parent, { _id }, context) => {
      const problem = Problem.findById(_id).populate({
        path: "firstQuestion",
        populate: "question",
      });
      return problem;
    },
    // get all solutions
    solutions: async (parent, args, context) => {
      return Solution.find();
    },
    // get single solution
    solution: async (parent, { _id }, context) => {
      const solution = Solution.findById(_id);
      return solution;
    },
    // get all answers
    answers: async (parent, args, context) => {
      return Answer.find();
    },
    // get single answer
    answer: async (parent, { _id }, context) => {
      const answer = Answer.findById(_id);
      return answer;
    },
    // get all questions
    questions: async (parent, args, context) => {
      return Question.find().populate({
        path: "answers",
        populate: "answer",
      });
    },
    // get single question
    question: async (parent, { _id }, context) => {
      const question = Question.findById(_id).populate({
        path: "answers",
        populate: "answer",
      });
      return question;
    },
  },
  Mutation: {
    // creates new problem
    addProblem: async (parent, args, context) => {
      const problem = await Problem.create(args);
      return problem;
    },
    // allows changes to existing problem
    editProblem: async (parent, args, context) => {
      const problem = await Problem.findOneAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
      return problem;
    },
    //deletes firstQuestion from Problem 
    // deletes existing problem
    // creates new question
    addQuestion: async (parent, args, context) => {
      const question = await Question.create(args);
      return question;
    },
    // allows changes to existing question and description of Question
    editQuestion: async (parent, args, context) => {
      const question = await Question.findOneAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
      return question;
    },
    // adds category to question
    addCategoryQuestion: async (parent, args, context) => {
      const question = await Question.findOneAndUpdate(
        args._id,
        {
          $addToSet: { category: args.category },
        },
        { new: true }
      );
      return question;
    },
    // deletes category from question
    // adds answer to question
    addAnswersQuestion: async (parent, args, context) => {
      const question = await Question.findOneAndUpdate(
        args._id,
        {
          $addToSet: { answers: args.answers },
        },
        { new: true }
      );
      return question;
    },
    // deletes answer from question
    // deletes question
    // creates new answer
    addAnswer: async (parent, args, context) => {
      const answer = await Answer.create(args);
      return answer;
    },
    // add solution to answer
    addSolutionAnswer: async (parent, args, context) => {
      const answer = findOneAndUpdate(args._id, {
        nextQuestion: null,
        $addToSet: {solution: args.solution}
      })
    },
    // add nextQuestion to answer
    // deletes nextQuestion from answer
    // deletes solution from answer
    // deletes answer
    // creates new solution
    addSolution: async (parent, args, context) => {
      const solution = await Solution.create(args);
      return solution;
    },
    // deletes solution
  },
};

module.exports = resolvers;
