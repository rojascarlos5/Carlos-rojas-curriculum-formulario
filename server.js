const express = require("express");
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('mi ultra hiper secreto'));
app.use(session({
  secret: 'mi ultra hier secreto',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/* MI LINEA */
app.use(express.static(__dirname + '/css'));


passport.use(new PassportLocal(function (username, password, done) {
 
  if (username === "codigofacilito" && password === "12345678")
    return done(null, { id: 1, name: "Cody" });

  done(null, false);
}));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "Cody" });
});



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("login");
}, (req, res) => {
  //Cuando entra al login
  /* MI LINEA */
  res.render("cv");
})



app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login"
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

