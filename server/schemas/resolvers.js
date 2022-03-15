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
        return Step.find()
          .populate("responses")
          .populate("category")
          .populate("linkedResponses");
      }

      // find all steps with matching category
      const steps = Step.find({ category: category })
        .populate("responses")
        .populate("category")
        .populate("linkedResponses");
      return steps;
    },
    // get single step
    step: async (parent, { _id }, context) => {
      const step = Step.findById(_id)
        .populate("responses")
        .populate("category")
        .populate("linkedResponses");
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
        .populate("responses")
        .populate("linkedResponses");
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
    // adds linked response to step
    addLinkedResponsesStep: async (parent, args, context) => {
      const step = await Step.findByIdAndUpdate(
        args._id,
        {
          $addToSet: { linkedResponses: args.linkedResponses },
        },
        { new: true }
      ).populate("linkedResponses");
      return step;
    },
    // deletes linked response from step
    removeLinkedResponsesStep: async (parent, args, context) => {
      const step = await Step.findByIdAndUpdate(
        args._id,
        {
          $pull: { linkedResponses: args.linkedResponses },
        },
        { new: true }
      ).populate("linkedResponses");
      return step;
    },
    // deletes step
    deleteStep: async (parent, args, context) => {
      const { category, _id } = args;

      // if no category is specified, delete by _id
      // allows for deleting all steps within single Problem
      if (!category) {
        const step = await Step.deleteMany({
          _id: {
            $all: [_id],
          },
        });
        return step;
      } else {
        const step = await Step.deleteMany({
          category: category,
        });
        return step;
      }
    },
    // creates new response
    addResponse: async (parent, args, context) => {
      const response = await Response.create(args);
      return response;
    },
    // sets nextStep for response
    editResponse: async (parent, args, context) => {
      const response = await Response.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      ).populate("nextStep");
      return response;
    },
    // deletes response
    deleteResponse: async (parent, args, context) => {
      const response = await Response.deleteMany({
        id: {
          $in: args.id,
        },
      });
      return response;
    },
  },
};

module.exports = resolvers;
