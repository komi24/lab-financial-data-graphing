var express = require('express');
var router = express.Router();
const passport = require("passport");
var User = require('../models/users');
var bcrypt = require('bcrypt');
var bcryptSalt = 10;

router.post('/distance_matrix', function(req, res, next) {
	console.log(req.body)
	res.json({message: "Hello"});
});
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("hello server side");
	res.render('index', { user: req.user ,title: (req.user) ? 'Welcome '+req.user.username :'Express' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup');
})
router.get('/login', function(req, res, next) {
	res.render('login');
})
router.post('/login',  passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}))

router.post('/signup', function(req, res, next) {
	let username = req.body.username;
	let password = req.body.password;

	User.findOne({username})
	.then(user =>{
		if (user)
			return res.render('signup', {errorMessage: 'Already exists'})

		const salt     = bcrypt.genSaltSync(bcryptSalt);
	  	const hashPass = bcrypt.hashSync(password, salt);

	  	var user = new User({username, password: hashPass});
	  	user.save()
	  	.then(()=>{
			res.redirect('/');
		})
	})
})

const ensureLogin = require("connect-ensure-login");
router.get("/private-page", ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.send(req.user)
});

module.exports = router;
