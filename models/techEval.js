const mongoose = require("mongoose");


let UserSchema = new mongoose.Schema({
   technologyImpact: String,
   technicalComplexity: {
      architecturalImpact: Number,
      internalEffort: Number,
      cost: Number,
      duration: Number
   },
   technicalDescription: String,
   highLevelSolution: String,
   detailedSolutionDesignPreperation: [],
   projectTeam: [String],
   risksAndOpportunities: [],
   dependencies: String,
   other: String,
   extraFiles: [String]
});

module.exports = mongoose.model("techEval", UserSchema);