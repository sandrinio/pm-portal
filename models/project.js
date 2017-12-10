const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
   pm: String,
   generalComment: String,
   businessScore: Number,
   phase: String,
   status: String,
   solutionOwner: String,
   date: {type: Date, default: Date.now},
   preStudyFiles: [String],
   planningFiles: [String],
   executionFiles: [String],
   otherFiles: [String],
   projectTeam: [],
   proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal"
   },
   techEvaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "techEval"
   },
});

module.exports = mongoose.model("Project", UserSchema);