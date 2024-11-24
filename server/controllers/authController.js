const jwt = require("jsonwebtoken");
const User = require("./../modal/userModal");
const { promisify } = require("util");

//sending token while singup

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    // httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  //cookie sending
  res.cookie("jwt", token, cookieOptions);
  res.cookie("name", user.name);

  //remove the password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.singUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      company: req.body.company,
      lastLogin: req.body.lastLogin,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);

    // const token = signToken(newUser._id);
    // res.status(200).json({
    //   status: 'success',
    //   token,
    //   data: {
    //     newUser,
    //   },
    // });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //check if email and password exist..
    if (!email || !password) {
      res.status(401).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    //check if user exist and password is correct..

    const user = await User.findOne({ email }).select("+password");
    // console.log(user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    createSendToken(user, 200, res);

    //if everything is fine send the jwt token..
    // const token = signToken(user._id);
    // res.status(200).json({
    //   status: 'success',
    //   token,
    // });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//protection middleware
exports.protect = async (req, res, next) => {
  //getting token if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Your not logged in! Please log in and try again.",
    });
  }

  //verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    res.status(401).json({
      status: "fail",
      message: "The user belonging to the token doesn't exist",
    });
  }

  //check if user password changed after the token is being given..
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    res.status(401).json({
      status: "fail",
      message: "User recently changed password please login again",
    });
  }

  //grant access to protect route...
  req.user = freshUser;
  next();
};
