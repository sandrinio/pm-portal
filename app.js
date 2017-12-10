const express = require("express");
const app = express();

const  mongoose       = require("mongoose"),
       passport       = require("passport"),
       bodyParser     = require("body-parser"),
       flash          = require("connect-flash"),
       LocalStrategy  = require("passport-local"),
       session        = require("express-session"),
       methodOverride = require("method-override"),

       User           = require("./models/user");

const authRoutes      = require('./routes/auth'),
      landingRoutes   = require('./routes/landing'),
      projectRoutes   = require('./routes/project'),
      documentsRoutes = require('./routes/documents');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));

app.use(authRoutes);
app.use(landingRoutes);
app.use(projectRoutes);
app.use(documentsRoutes);

app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/pm_portal', {
   useMongoClient: true,
   /* other options */
});



/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში

app.listen(process.env.PORT || 3000, process.env.IP, () => {  //if server is on
   console.log("======STARTED======");
});