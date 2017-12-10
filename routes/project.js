const express = require('express');
const router = express.Router();
const Proposal = require('../models/proposal');
const Project = require('../models/project');


router.get('/project/project-show/:id', (req, res) => {
   Project.findById(req.params.id).populate('proposal').exec(function (err, doc) {
      if(err){
         return console.log(err)
      }
      res.render('project/project-show', { doc: doc })
   })

});


router.post('/project/create/:id', (req, res) => {
   Proposal.findById(req.params.id, function (err, doc) {
      if(err){
         return console.log(err)
      }else{
         let projectData = {};
         projectData.businessScore = doc.strategicFit + doc.revGrowth + doc.customerGrowth + doc.costSaving;
         projectData.pm = req.body.pm;
         projectData.phase = 'Pre-Study';
         projectData.status = 'Ongoing';
         projectData.proposal = doc;
         projectData.projectTeam = doc.proposalTeam;
         Project.create(projectData, function (err, doc) {
            if(err){
               console.log(err)
            }else{
               res.redirect('/project/project-show/' + doc._id)
            }
         });
      }
   });
});

router.put('/project/deleteTeamMember', (req, res) => {
   console.log(req.body);
   Project.update(req.body.id, {$pull: {projectTeam: {name: req.body.tm}}}, {multi: true}, function (err, members) {
      if(err){
         res.send(err)
      }else{
         console.log(members);
         res.send('back')
      }
   });

});

router.post('/project/AddMember/:id', (req, res) => {
   let pTeam = {projectTeam: req.body.projectTeam};

   Project.findByIdAndUpdate(req.params.id, {$push: {'projectTeam': req.body.projectTeam}}, function (err, doc) {
      if(err){
         console.log(err)
      }else{
         res.redirect('back')
      }
   })
});



module.exports = router;