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
    // {
    //   name: "Printer not extruding filament",
    //   description: "No filament is coming out of hot end.",
    // },
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
  });

  const responses1 = await Response.create(
    {
      text: "The first layer is sticking to the bed properly.",
      photo: "",
      nextStep: step1._id,
    }
  );

  const step1update

  //   const step2 = await Step.create({
  //     // index 1
  //     step: "Is the print releasing from the bed?",
  //     description:
  //       "Does the print release from the bed too early while it is printing (partially or entirely)?",
  //     category: problems[0]._id,
  //   });

  //   const problem2 = await Problem.findByIdAndUpdate(problems[1]._id, {
  //     firstStep: step2._id,
  //   });

  //   const steps = await Step.insertMany([
  //     {
  //       // index 0
  //       step: "Is the first layer sticking to the bed properly?",
  //       description:
  //         "The first layer should be consistent and not come off the bed if you lightly brush your fingers over it. There should not be areas that look like no plastic was extruded.",
  //       category: problems[0]._id
  //     },
  //     {
  //       // index 1
  //       step: "Is the print releasing from the bed?",
  //       description:
  //         "Does the print release from the bed too early while it is printing (partially or entirely)?",
  //       category: problems[0]._id
  //     },
  //     {
  //       // index 2
  //       step: "Relevel the bed",
  //       description:
  //         "Your nozzle should be approximately one piece of paper's width from the bed(.1mm). Preheat your bed to your planned printing temperature and move the nozzle to each corner of the bed. Lower/raise the bed until a piece of paper starts to rub on the nozzle. If it is scratching the paper, your nozzle is likely too low. Print a bed level line test and make minor adjustments as needed until lines adhere to bed.",
  //       category: problems[0]._id
  //     },
  //     {
  //       // index 3
  //       step: "Check bed temperature.",
  //       description:
  //         "If the first layer goes down properly, but the print starts to come off, it could be multiple issues. First, check that your bed temperature is within the manufacturer' recommended range. For PLA, 60 degrees is generally a good temperature. Also make sure that the ambient temperature isn't too low. A cool draft can cause uneven cooling and make a print lift off the bed early. Move your printer to a warmer location or use an enclosure to resolve this issue.",
  //       category: problems[0]._id
  //     },
  //     {
  //       // index 4
  //       step: "Nozzle may be too close to bed. Wait for print to cool.",
  //       description:
  //         "If a nozzle is too close to the bed, it can cause too good of adhesion and make it difficult to remove a print. Your nozzle should be approximately one piece of paper's width from the bed(.1mm). Preheat your bed to your planned printing temperature and move the nozzle to each corner of the bed. Lower/raise the bed until a piece of paper starts to rub on the nozzle. If it is scratching the paper, your nozzle is likely too low. Print a bed level line test and make minor adjustments as needed until lines adhere to bed.<br/> Make sure that you are allowing your bed and print to fully cool after it is completed. You can also spray some water around the base of your print after it is done. The water will get under the print and make it easier to remove.",
  //       category: problems[0]._id
  //     },
  //   ]);

  //   const responses = await Response.insertMany([
  //     {
  //       text: "The first layer is sticking to the bed properly.",
  //       photo: "",
  //       nextStep: steps[1]._id,
  //     },
  //     {
  //       text: "The first layer is NOT sticking to the bed properly.",
  //       photo: "",
  //       nextStep: steps[2]._id,
  //     },
  //     {
  //       text: "The print is coming off early.",
  //       photo: "",
  //       nextStep: steps[3]._id,
  //     },
  //     {
  //       text: "The print is not coming off early.",
  //       photo: "",
  //       nextStep: steps[4]._id,
  //     },
  //   ]);

  //   const problemUpdate1 = await Problem.findByIdAndUpdate(
  //       problems[0]._id, {
  //           firstStep: steps[0]._id
  //       }
  //   )

  // const problemUpdate2 = await Response.findByIdAndUpdate(
  //     Problem[1]._id, {
  //         firstStep: Step[0]._id
  //     }
  // )

  // const StepUpdate1 = await Step.findByIdAndUpdate(
  //     steps[0]._id, {
  //         responses: [responses[0]._id, responses[1]._id]
  //     }
  // )

  // const StepUpdate2 = await Step.findByIdAndUpdate(
  //     steps[1]._id, {
  //         responses: [responses[2]._id, responses[3]._id]
  //     }
  // )

  process.exit();
});
