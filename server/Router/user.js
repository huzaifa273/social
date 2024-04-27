const router = require("express").Router();
const User = require("../Modals/User");
const Post = require("../Modals/Post");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");
const { generateOTP } = require("./Extra/mail");
const JWT_SECRET = "YEUI^*&^#@!@#";
const nodemailer = require("nodemailer");
const VerificationToken = require("../Modals/VerificationToken");
// const ResetToken = require("../Modals/ResetToken");
const crypto = require("crypto");
const ResetToken = require("../Modals/ResetToken");
// Register
router.post("/register", async (req, res) => {
  // try {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json("Email already exists");
  }
  const secPassword = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: secPassword,
    profilePicture: req.body.profilePicture,
  });
  user = await newUser.save();
  const accessToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    JWT_SECRET
  );
  const OTP = generateOTP();
  const verificationToken = new VerificationToken({
    user: user._id,
    token: OTP,
  });
  const verify = await verificationToken.save();
  console.log(verify);
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  console.log(transport);
  transport.sendMail({
    from: "malikhuzaifa@gmail.com",
    to: user.email,
    subject: "Email Verification",
    text: `Your OTP is ${OTP}`,
  });
  res.status(200).json({
    Status: "Pending",
    msg: "Email has been sent to your email address",
    user: user._id,
  });
  // res.status(200).json({
  //   Status: "Pending",
  //   msg: "Email has been sent to your email address",
  //   user: user._id,
  // });
  // } catch (err) {
  //   res.status(400).json("Error Occured while creating a user: ", err);
  // }
});

// Verify Email
router.post("/verify/email", async (req, res) => {
  // try {
  const { user, OTP } = req.body;
  const mainUser = await User.findById(user);
  if (!mainUser) {
    return res.status(404).json("User not found");
  }
  if (mainUser.verified === true) {
    return res.status(400).json("User already verified");
  }
  const token = await VerificationToken.findOne({ user: mainUser._id });
  if (!token) {
    return res.status(404).json("Token not found");
  }
  const isMatch = await bcrypt.compare(OTP, token.token);
  if (!isMatch) {
    return res.status(400).json("Token is not correct");
  }
  console.log("Working...");
  mainUser.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await mainUser.save();
  const accessToken = jwt.sign(
    {
      id: mainUser._id,
      username: mainUser.username,
    },
    JWT_SECRET
  );
  const { password, ...others } = mainUser._doc;
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  console.log(transport);
  transport.sendMail({
    from: "malikhuzaifa@gmail.com",
    to: mainUser.email,
    subject: "Email Verified",
    text: `Now you can login your account`,
  });
  return res.status(200).json({ others, accessToken });
  // } catch (error) {
  //   res.status(500).json("Internal server error");
  // }
});
// Login
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(400).json("Password is incorrect");
    }
    const accessToken = await jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (error) {
    res.status(500).json({ "Internal Error Occured ": error });
  }
});

//Forget Password
router.post("/forget/password", async (req, res) => {
  // console.log("Hello");
  // try {
  const email = req.body;
  const user = await User.findOne(email);
  if (!user) {
    return res.status(400).json("User not found");
  }
  //console.log(user);
  const token = await ResetToken.findOne({ user: user._id });
  if (token) {
    return res.status(400).json("You can request new Token after one hour");
  }
  const RandomTxt = crypto.randomBytes(20).toString("hex");
  // console.log(RandomTxt);
  const resetToken = new ResetToken({
    user: user._id,
    token: RandomTxt,
  });
  const save = await resetToken.save();
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  transport.sendMail({
    from: "malikhuzaifa@gmail.com",
    to: user.email,
    subject: "Reset Token",
    text: `http://localhost:3000/reset/password?token=${RandomTxt}&_id=${user._id}`,
  });
  return res.status(200).json("Check your email to reset password");
  // } catch (error) {
  //   return res.status(500).json("Internal error occured");
  // }
});

// reset password
router.put("/reset/password", async (req, res) => {
  const { token, _id } = req.query;
  if (!token || !_id) {
    return res.status(400).json("User not found");
  }
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return res.status(400).json("User not found");
  }
  // console.log(user._id);
  const resetToken = await ResetToken.findOne({ user: user._id });
  // console.log(resetToken);
  if (!resetToken) {
    return res.status(400).json("Reset token is not found");
  }
  const isMatch = await bcrypt.compareSync(token, resetToken.token);
  if (!isMatch) {
    return res.status(400).json("Token is not valid");
  }
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  user.password = secPass;
  await user.save();
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  transport.sendMail({
    from: "malikhuzaifa@gmail.com",
    to: user.email,
    subject: "Your password reset succesfully",
    html: `Now you can login with new password`,
  });
  return res.status(200).json("Email has been send");
});

// Folowings the users
// router.put("/following/:id", verifyToken, async (req, res) => {
//   if (req.params.id !== req.body.user) {
//     const user = await User.findById(req.params.id);
//     const otherUser = await User.findById(req.body.user);

//     if (!user.followers.includes(req.body.user)) {
//       // Here might be little conceptual error in following/followers so watch out
//       await user.updateOne({ $push: { followers: req.body.user } });
//       await otherUser.updateOne({ $push: { following: req.params.id } });
//       return res.status(200).json("User has followed");
//     } else {
//       return res.status(400).json("You are alraedy following this user");
//     }
//   } else {
//     res.status(400).json("You can't follow yourself");
//   }
// });
// Folowings the users
router.put("/following/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      const otherUser = await User.findById(req.params.id);
      const user = await User.findById(req.user.id);

      if (!user.following.includes(req.params.id)) {
        // Here might be little conceptual error in following/followers so watch out
        await user.updateOne({ $push: { following: req.params.id } });
        await otherUser.updateOne({ $push: { followers: req.user.id } });
        return res.status(200).json("User has followed");
      } else {
        await user.updateOne({ $pull: { following: req.params.id } });
        await otherUser.updateOne({ $pull: { followers: req.user.id } });
        return res.status(200).json("User has unfollowed");
      }
    } else {
      res.status(400).json("You can't follow yourself");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
// To unfollow the user
router.put("/unfollow/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      const otherUser = await User.findById(req.params.id);
      const user = await User.findById(req.user.id);

      if (user.following.includes(req.params.id)) {
        await user.updateOne({ $pull: { following: req.params.id } });
        await otherUser.updateOne({ $pull: { followers: req.user.id } });
        return res.status(200).json("unfollowed");
      } else {
        return res.status(400).json("You are not following this user");
      }
    } else {
      res.status(400).json("You can't unfollow yourself");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
// Fetch posts from the people we are following
router.get("/flw/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // const posts = user.following;
    const followingsPosts = await Promise.all(
      user.following.map((item) => {
        return Post.find({ user: item });
      })
    );
    const userPost = await Post.find({ user: user._id });
    res.status(200).json(userPost.concat(...followingsPosts));
  } catch (error) {
    res.status(500).json("Internal Error Occured");
  }
});

// update User Password
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = secPassword;
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        await updateUser.save();
        return res.status(200).json(updateUser);
        // console.log(req.body.password);
      }
    } else {
      return res
        .status(400)
        .json("You are not allowed to change this user details");
    }
  } catch (error) {
    return res.status(500).json("Internal Error Occured");
  }
});

// delete user account
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(400).json("Account doesn't match");
    } else {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User account has been deleted");
    }
  } catch (error) {
    return res.status(500).json({ "internal error occured": error });
  }
});

// get user data for post
router.get("/post/user/details/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    const { email, password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});

// Suggested for you list(user to follow)
// router.get("/all/user", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const allUsers = await User.find().select("_id");
//     const currentUser = await User.findById(userId).populate({
//       path: "following",
//       select: "_id name image",
//     });
//     const followingIds = currentUser.following.map((user) => user._id);
//     const suggestedUsers = allUsers.filter(
//       (user) => !followingIds.includes(user._id)
//     );
//     const filterUsers = await Promise.all(
//       suggestedUsers.map(async (item) => {
//         const oneUser = await User.findById(item);
//         const {
//           email,
//           phoneNumber,
//           followers,
//           following,
//           password,
//           ...others
//         } = oneUser._doc;
//         return others;
//       })
//     );
//     console.log(suggestedUsers);
//     res.status(200).json(filterUsers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json("internal server error");
//   }
// });
router.get("/all/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const allUsers = await User.find().select("_id");
    const currentUser = await User.findById(userId).select("following");

    const followingIds = currentUser.following;
    // console.log(followingIds);
    const suggestedUsers = allUsers.filter(
      (user) => !followingIds.includes(user._id.toString())
    );
    const filterUsers = await Promise.all(
      suggestedUsers.map(async (item) => {
        const oneUser = await User.findById(item);
        const { email, phoneNumber, followers, following, password, ...other } =
          oneUser._doc;
        return other;
      })
    );
    // console.log(suggestedUsers);
    res.status(200).json(filterUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
});

// get following of user(Users that I am follwong)
router.get("/following/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const allFollowing = await User.findById(userId);
    if (!allFollowing) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remember for this method to word you still to access followings using . because it return object containing id and following
    // const abc = await User.findById(userId).select("following");

    // console.log("Filter users: ");
    const filterUsers = await Promise.all(
      allFollowing.following.map(async (item) => {
        const oneUser = await User.findById(item);
        if (!oneUser) {
          console.log(`User with ID ${item} not found`);
          return null; // or handle this case as you prefer
        }
        const { email, phoneNumber, followers, password, ...other } =
          oneUser._doc;
        return other;
      })
    );
    // console.log(filterUsers);
    res.status(200).json(filterUsers.filter(Boolean));
  } catch (error) {
    res.status(500).json({ "Internal error occured": error });
  }
});

// get followers of user(Users that are following me)
// router.get("/followers/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const allFollers = await User.findById(userId);

//     // Remember for this method to word you still to access followings using . because it return object containing id and following
//     // const abc = await User.findById(userId).select("following");
//     // console.log(allFollers.followers);
//     const filterUsers = await Promise.all(
//       allFollers.followers.map(async (item) => {
//         const oneUser = await User.findById(item);
//         const { email, phoneNumber, password, ...others } = oneUser._doc;
//         // console.log(others);
//         return others;
//       })
//     );
//     // console.log("filterUsers");
//     res.status(200).json(filterUsers);
//   } catch (error) {
//     res.status(500).json({ "Internal error occured": error });
//   }
// });
router.get("/followers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const allFollowers = await User.findById(userId);

    if (!allFollowers) {
      return res.status(404).json({ message: "User not found" });
    }

    const filterUsers = await Promise.all(
      allFollowers.followers.map(async (item) => {
        try {
          const oneUser = await User.findById(item);
          if (!oneUser) {
            console.log(`User with ID ${item} not found`);
            return null; // or handle this case as you prefer
          }
          const { email, phoneNumber, password, ...other } = oneUser._doc;
          // console.log(others);
          return other;
        } catch (error) {
          console.error(`Error fetching user with ID ${item}:`, error);
          throw error; // Throw the error to propagate it up
        }
      })
    );

    // console.log("filterUsers:", filterUsers);
    res.status(200).json(filterUsers.filter(Boolean)); // Filter out null values
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ "Internal error occurred": error.message });
  }
});

module.exports = router;
