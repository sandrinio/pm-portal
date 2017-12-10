const mongoose = require("mongoose");


let UserSchema = new mongoose.Schema({
         projectName: {type: String, required: true},
         reqDepartment: String,
         businessOwner: String,
         status: String,
         reqOwner: {type: String, required: true},
         businessValueClass: String,
         investmentReason: String,
         vendorReq: String,
         category: String,
         apprxCost: String,
         approxLaunchDate: String,
         projectDescr: String,
         businessImpactDesc: String,
         dependencies: String,
         proposalTeam: [],
         strategicFit: Number,
         revGrowth: Number,
         customerGrowth: Number,
         extraFile: [],
         costSaving: Number,
         deliverables: String,
         other: String,
         date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Proposal", UserSchema);