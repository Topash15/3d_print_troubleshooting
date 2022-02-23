const db = require("./connection");
const { Problem, Step, Response } = require("../models");

db.once("open", async () => {
  await Problem.deleteMany();
  console.log("problems deleted");

  await Step.deleteMany();
  console.log("steps deleted");

  await Response.deleteMany();
  console.log("responses deleted");

  const problems = await Problem.insertMany([
    {
      name: "Bed Adhesion Issue",
      description:
        "Print is not sticking to bed, coming off bed during print, or not coming off after print is completed.",
    },
    {
      name: "Printer not extruding filament",
      description: "No filament is coming out of hot end.",
    },
  ]);
  console.log("problems seeded");

  const step1 = await Step.create({
    // index 0
    step: "Is the first layer sticking to the bed properly?",
    description:
      "The first layer should be consistent and not come off the bed if you lightly brush your fingers over it. There should not be areas that look like no plastic was extruded.",
    category: problems[0]._id,
  });

  const problem1 = await Problem.findByIdAndUpdate(problems[0]._id, {
    firstStep: step1._id,
    steps: [step1._id]
  });

  const responses1 = await Response.create(
    {
      text: "The first layer is sticking to the bed properly.",
      photo: "",
    }
  );

  const Step1Update = await Step.findByIdAndUpdate(step1._id, {
    responses: responses1.id
  })


  const step2 = await Step.create({
    // index 0
    step: "Can filament be pushed through when the hotend is heated??",
    description:
      "Preheat the hotend to your printing temperature. Squeeze the extruder arm and push filament through. Check for any extruding through the nozzle.",
    category: problems[1]._id,
  });

  const problem2 = await Problem.findByIdAndUpdate(problems[1]._id, {
    firstStep: step2._id,
    steps: [step2._id]
  });

  const responses2 = await Response.create(
    {
      text: "Nothing is extruding",
      photo: "",
    }
  );

  const Step2Update = await Step.findByIdAndUpdate(step2._id, {
    responses: responses2.id
  })

  process.exit();
});
