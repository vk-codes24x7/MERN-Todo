const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//SIGN UP API
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashedPassword });
    await user.save().then(() => {
      res.status(200).json({ user: user });
    });
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
});

//SIGN IN API
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(400)
        .json({ message: "Account doesn't exist, Please Signup first" });
    }
    const IsPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!IsPasswordCorrect) {
      res.status(400).json({ message: "User name or password incorrect!" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong. Please try again later" });
  }
});

module.exports = router;
