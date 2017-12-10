const express = require('express');
const router = express.Router();
const Proposal = require('../models/proposal');
const Project = require('../models/project');
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/uploads/projectFiles/')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
   }
});
const upload = multer({ storage: storage });

//proposals list
router.get('/docs/project-proposals', (req, res) => {
   Proposal.find({}).exec(function (err, doc) {
      if(err){
         console.log(err)
      }else{
         res.render('docs/proposals_list', { doc: doc })
      }
   });
});

//show proposal
router.get('/docs/proposal/:id', (req, res) => {
   Proposal.findById(req.params.id, function (err, doc) {
      if(err){
         res.send(err)
      }else{
         console.log(doc.proposalTeam[0].department)
         res.render('docs/proposal_show', {doc: doc})
      }
   })
});

//new proposal
router.get('/docs/proposal_new', (req, res) => {
   res.render('docs/proposal_new')
});


//create a proposal
router.post('/docs/proposal', (req, res) => {
   let propo = req.body.proposal;
        let dep = req.body.proposalTeam.department;
        let name = req.body.proposalTeam.name;
        let role = req.body.proposalTeam.role;
            teamArray = name.map(function (x, i) {
               return {"name": x, "department": dep[i], "role": role[i] }
                    });
                 console.log(teamArray);
                 //add team object to schema
               propo.proposalTeam = teamArray;
  Proposal.create(propo, function (err, doc) {
     if(err){
        req.flash({'error': 'Something went wrong'})
     }else{
        res.redirect('/docs/proposal/' + doc._id)
     }
  })
});

// file upload from pre-study tab
router.post('/docs/preStudy-file', upload.single('preStudy-file'), (req, res) =>{
   let data = req.file;
   console.log(data);
   Project.findById(req.body.docId, function (err, doc) {
      if(err){
         return res.status(404)
      }
      doc.preStudyFiles.push(data.filename);
      doc.save();
          res.status(200).json(data)
   });

});

// H/L solution
router.post('/docs/tech-evaluation', (req, res) => {
   res.send(req.body.techEval)
});



module.exports = router;