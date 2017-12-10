const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
   res.render('auth/login')
});

router.get('/register', (req, res) => {
   res.render('auth/register')
});


router.post('/auth/login', (req, res) => {
   res.send(req.body.user)
});


module.exports = router;