import User from "../models/user.js";
const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}
const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", " welcome to wanderLust ");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}
const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
const login = async (req, res) => {
  req.flash("success", "you are successfully  login ");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
}

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are successfully logges out ");
    res.redirect("/listings");
  })
}

export { signup, renderSignupForm, renderLoginForm, login, logOut };