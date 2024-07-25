const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!!",
    });
  } catch (err) {
    // res.status(500).json(err.message);
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!!"));
    }
    const isValidPassword = bcrypt.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Wrong Credentials!!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports.google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar : req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200);
    }
  } catch (err) {
    next(err);
  }
};
