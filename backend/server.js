const express = require("express");
const windturbineusers = require("./data");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await windturbineusers.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          "sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb",
          { expiresIn: "1h" }
        );
        res.json({ status: "exist", token: token, firstName: user.firstName });
      } else {
        res.json("incorrectPassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.post("/signup", cors(), async (req, res) => {
  const { email, password, firstName, lastName, phonenumber, role } = req.body;
  try {
    const check = await windturbineusers.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        phonenumber: phonenumber,
        role: role,
      };

      await windturbineusers.create(data);
      const user = await windturbineusers.findOne({ email: email });
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb",
        { expiresIn: "1h" }
      );
      res.json({ status: "notexist", token: token, firstName: user.firstName });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

/*app.post('/updateProfilePicture', cors(), async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb', async (err, user) => {
      if (err) return res.sendStatus(403);

      const userId = user.userId;
      const profilePicture = req.body.profilePicture; // Assuming the image data is sent in the request body

      // Update the user's profile picture
      await User.findByIdAndUpdate(userId, { $set: { profilePicture } });

      res.json({ status: 'success' });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
});*/

app.get("/user", cors(), async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    "sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb",
    async (err, user) => {
      if (err) return res.sendStatus(403);

      const userData = await windturbineusers.findOne({ _id: user.userId });

      res.json({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phonenumber: userData.phonenumber,
        email: userData.email,
        role: userData.role,
      });
    }
  );
});

app.listen(5000, () => {
  console.log("server is running");
});
