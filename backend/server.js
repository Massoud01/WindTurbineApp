const express = require("express");
const { users, data,contactus } = require("./data");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/update_data", (req, res) => {
  const simulationData = req.body.simulation_data;
  console.log("Received simulation data:", simulationData);

  res.sendStatus(200);
});

app.post("/contactus", cors(), async (req, res) => {
  try {
    const { name, email, phonenumber, query } = req.body;

    await contactus.create({
      name,
      email,
      phonenumber,
      query,
    });

    res.json({ status: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email: email });

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
    const check = await users.findOne({ email: email });

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

      await users.create(data);
      const user = await users.findOne({ email: email });
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

app.get("/wind-speeds", cors(), async (req, res) => {
  try {
    const windData = await data.find().sort({ _id: -1 }).limit(10);
    const windSpeeds = windData.map((doc) => ({
      speed: doc.windSpeed,
      date: doc.date,
    }));
    res.json(windSpeeds);
    console.log(windSpeeds);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error while retrieving wind speeds" });
  }
});

app.get("/user", cors(), async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    "sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb",
    async (err, user) => {
      if (err) return res.sendStatus(403);

      const userData = await users.findOne({ _id: user.userId });

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

app.post("/save-data", cors(), async (req, res) => {
  try {
    let { windSpeed, windDirection, date } = req.body;
    windSpeed = windSpeed === 0 ? 1 : windSpeed;
    const newdata = new data({
      windSpeed,
      windDirection,
      date,
    });
    await newdata.save();
    res.json({ status: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error while saving data" });
  }
});
app.listen(5000, () => {
  console.log("server is running");
});
