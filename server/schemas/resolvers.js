const { Problem, Step, Response } = require("../models");

const resolvers = {
  Query: {
    // get all problems
    problems: async (parent, args, context) => {
      return Problem.find()
        .populate("firstStep")
        .populate("firstStep.responses")
        .populate("steps");
    },
    //get single problem
    problem: async (parent, { _id }, context) => {
      const problem = Problem.findById(_id)
        .populate("firstStep")
        .populate("steps");
      return problem;
    },
    // get all steps
    steps: async (parent, args, context) => {
      const { category } = args;

      // if category is not specified, return all steps
      if (!category) {
        return Step.find().populate("responses").populate("category");
      }

      // find all steps with matching category
      const steps = Step.find({ category: category}).populate("responses").populate('category')
      return steps
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
      const problem = await Problem.findByIdAndUpdate(
        args._id,
        {
          name: args.name,
          description: args.description,
          links: args.link,
          photos: args.photos,
          firstStep: args.firstStep,
          $addToSet: { steps: args.steps },
        },
        { new: true }
      ).populate("steps");
      return problem;
    },
    // deletes existing problem
    deleteProblem: async (parent, { _id }, context) => {
      const problem = await Problem.findByIdAndDelete(_id, { new: true });
      return problem;
    },
    // creates new step
    addStep: async (parent, args, context) => {
      const step = await Step.create(args);
      return step;
    },
    // allows changes to existing step and description of Step
    editStep: async (parent, args, context) => {
      const step = await Step.findByIdAndUpdate(
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
      const step = await Step.findByIdAndUpdate(
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
      const step = await Step.findByIdAndUpdate(
        args._id,
        {
          $pull: { responses: args.responses },
        },
        { new: true }
      ).populate("responses");
      return step;
    },
    // deletes step
    deleteStep: async (parent, { _id }, context) => {
      const step = await Step.findByIdAndDelete(_id, { new: true });
      return step;
    },
    // creates new response
    addResponse: async (parent, args, context) => {
      const response = await Response.create(args);
      return response;
    },
    // sets nextStep for response
    addNextStep: async (parent, args, context) => {
      const response = await Response.findByIdAndUpdate(
        args._id,
        {
          nextStep: args.nextStep,
        },
        { new: true }
      ).populate("nextStep");
      return response;
    },
    // deletes response
    deleteResponse: async (parent, { _id }, context) => {
      const response = await Response.findByIdAndDelete(_id, { new: true });
      return response;
    },
  },
};

module.exports = resolvers;
