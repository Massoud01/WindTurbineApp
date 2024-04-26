const express = require("express");
const { users, data, contactus, simulationData,VBR,VCharge } = require("./data");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/update_data_VCHARGE", (req, res) => {
  console.log("API called");
  const hi = req.body.simulation_data_VCharge;
  console.log("Received simulation data:", hi);
  const P = hi.Vcharge;
  console.log("Received vCHARGE data:", P);
  const simulationDataInstance = new VCharge({ VCharge: P });
  simulationDataInstance
    .save()
    .then(() => {
      console.log("VCHARGE Simulation data saved.");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error saving simulation data:", err);
      res.sendStatus(500);
    });
});
app.post("/update_data_VBR", (req, res) => {
  console.log("API called");
  const hi = req.body.simulation_data_VBR;
  console.log("Received simulation data:", hi);

  // Accessing the P data from the request body directly
  const P = hi.VBR;
  console.log("Received P data:", P);

  // Create a new instance of SimulationData model
  const simulationDataInstance = new VBR({ VBR: P });

  // Save the instance to the database
  simulationDataInstance
    .save()
    .then(() => {
      console.log("Simulation data saved.");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error saving simulation data:", err);
      res.sendStatus(500);
    });
});
app.post("/update_data", (req, res) => {
  console.log("API called");
  const hi = req.body.simulation_data;
  console.log("Received simulation data:", hi);

  // Accessing the P data from the request body directly
  const P = hi.P;
  console.log("Received P data:", P);

  // Create a new instance of SimulationData model
  const simulationDataInstance = new simulationData({ P: P });

  // Save the instance to the database
  simulationDataInstance
    .save()
    .then(() => {
      console.log("Simulation data saved.");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error saving simulation data:", err);
      res.sendStatus(500);
    });
});

app.get("/get_data", (req, res) => {
  simulationData
    .find({})
    .sort({ _id: -1 })
    .limit(1)

    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Endpoint for vbr collection
app.get("/get_vbr_data", (req, res) => {
  VBR
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Endpoint for vcharge collection
app.get("/get_vcharge_data", (req, res) => {
  VCharge
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
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
