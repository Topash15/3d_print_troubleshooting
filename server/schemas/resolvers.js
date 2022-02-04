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
      return Step.find().populate("responses").populate("category");
    },
    // get single step
    step: async (parent, { _id }, context) => {
      const step = Step.findById(_id)
        .populate("responses")
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
    deleteProblem: async (parent, {_id}, context) => {
      const problem = await Problem.findOneAndDelete(_id, {new: true});
      return problem
    },
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
    // sets category for step
    addCategoryStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          category: args.category,
        },
        { new: true }
      ).populate("category");
      return step;
    },
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
    removeResponsesStep: async (parent, args, context) => {
      const step = await Step.findOneAndUpdate(
        args._id,
        {
          $pull: { responses: args.responses },
        },
        { new: true }
      ).populate("responses");
      return step;
    },
    // deletes step
    deleteStep: async (parent, {_id}, context) => {
      const step = await Step.findOneAndDelete(_id, {new: true});
      return step
    },
    // creates new response
    addResponse: async (parent, args, context) => {
      const response = await Response.create(args);
      return response;
    },
    // sets nextStep for response
    addNextStep: async (parent, args, context) => {
      const response = await Response.findOneAndUpdate(
        args._id,
        {
          nextStep: args.nextStep,
        },
        { new: true }
      ).populate("nextStep");
      return response;
    },
    // deletes response
    deleteResponse: async (parent, {_id}, context) => {
      const response = await Response.findOneAndDelete(_id, {new: true});
      return response
    },
  },
};

module.exports = resolvers;
