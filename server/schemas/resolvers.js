const { Problem, Step, Answer } = require("../models");

const resolvers = {
  Query: {
    // get all problems
    problems: async (parent, args, context) => {
      return Problem.find().populate({
        path: "firstStep",
        populate: "step",
      });
    },
    //get single problem
    problem: async (parent, { _id }, context) => {
      const problem = Problem.findById(_id).populate({
        path: "firstStep",
        populate: "step",
      });
      return problem;
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
    // get all steps
    steps: async (parent, args, context) => {
      return Step.find()
        .populate({
          path: "answers",
          populate: "answer",
        })
        .populate("category");
    },
    // get single step
    step: async (parent, { _id }, context) => {
      const step = Step.findById(_id)
        .populate({
          path: "answers",
          populate: "answer",
        })
        .populate("category");
      return step;
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
    //deletes firstStep from Problem
    // deletes existing problem
    // creates new step
    addStep: async (parent, args, context) => {
      const step = await Step.create(args);
      return step;
    },
    // allows changes to existing step and description of Step
    editStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
      return step;
    },
    // adds category to step
    addCategoryStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          $addToSet: { category: args.category },
        },
        { new: true }
      );
      return step;
    },
    // deletes category from step
    // adds answer to step
    addAnswersStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          $addToSet: { answers: args.answers },
        },
        { new: true }
      );
      return step;
    },
    // deletes answer from step
    // deletes step
    // creates new answer
    addAnswer: async (parent, args, context) => {
      const answer = await Answer.create(args);
      return answer;
    },
    // add nextStep to answer
    // deletes nextStep from answer
    // deletes answer
  },
};

module.exports = resolvers;
