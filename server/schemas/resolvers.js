const { Problem, Step, Response } = require("../models");

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
    // get all steps
    steps: async (parent, args, context) => {
      return Step.find()
        .populate({
          path: "responses",
          populate: "response",
        })
        .populate("category");
    },
    // get single step
    step: async (parent, { _id }, context) => {
      const step = Step.findById(_id)
        .populate({
          path: "responses",
          populate: "response",
        })
        .populate("category");
      return step;
    },
    // get all responses
    responses: async (parent, args, context) => {
      return Response.find();
    },
    // get single response
    response: async (parent, { _id }, context) => {
      const response = Response.findById(_id);
      return response;
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
    // deletes existing problem
    // creates new step
    addStep: async (parent, args, context) => {
      const step = await Step.create(args)
      .populate("category")
      .populate("responses");
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
      )
        .populate("category")
        .populate("responses");
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
      ).populate("category");
      return step;
    },
    // deletes category from step
    // adds response to step
    addResponsesStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          $addToSet: { responses: args.responses },
        },
        { new: true }
      ).populate("responses");
      return step;
    },
    // deletes response from step
    // deletes step
    // creates new response
    addResponse: async (parent, args, context) => {
      const response = await Response.create(args);
      return response;
    },
    // add nextStep to response
    // deletes nextStep from response
    // deletes response
  },
};

module.exports = resolvers;
