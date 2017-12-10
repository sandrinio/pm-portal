const express = require('express');
const router = express.Router();
const Project = require('../models/project');


router.get('/dashboard', (req, res) => {
   Project.find({}).populate('proposal').exec(function (err, doc) {
      if(err){
         console.log(err)
      }else{
         console.log(doc)
         res.render('landing/dashboard', {doc: doc})
      }
   });

});



module.exports = router;