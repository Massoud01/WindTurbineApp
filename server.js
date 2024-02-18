const express = require("express")
const { contactus, collection, Article } = require('./mongo');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id, email: user.email }, 'sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb', { expiresIn: '1h' });
        res.json({ status: "exist", token: token });
      } else {
        res.json("incorrectPassword");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    alert(e);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.post("/signup", cors(), async (req, res) => {
  const { email, password, age, firstName, lastName, dateofbirth, password1, phonenumber } = req.body;
  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = {
        email: email,
        password: hashedPassword,
        age: age,
        firstName: firstName,
        lastName: lastName,
        dateofbirth: dateofbirth,
        password1: password1,
        phonenumber: phonenumber

      };

      await collection.insertMany([data]);
      const user = await collection.findOne({ email: email });
      const token = jwt.sign({ userId: user._id, email: user.email }, 'sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb', { expiresIn: '1h' });
      res.json({ status: "notexist", token: token });

    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.post('/contactus', cors(), async (req, res) => {
  try {
    const { issue, email, phonenumber, query } = req.body;

    await contactus.create({
      issue,
      email,
      phonenumber,
      query

    });

    res.json({ status: 'success' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });

  }
});

app.post('/updateProfilePicture', cors(), async (req, res) => {
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
});


app.get("/user", cors(), async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'sdbjqidbUIDVBuduiwdwugiwuid7w9F8FHIwdkbhnufajb', async (err, user) => {
    if (err) return res.sendStatus(403);

    const userData = await collection.findOne({ _id: user.userId });

    res.json({ firstName: userData.firstName, lastName: userData.lastName, age: userData.age, phonenumber: userData.phonenumber, dateofbirth: userData.dateofbirth, email: userData.email });
  });
});

app.post('/save-article', cors(), async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // Create a new article instance
    const newArticle = new Article({
      title,
      description,
      link,
    });

    // Save the article to the database
    await newArticle.save();

    res.json({ status: 'success' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.listen(8000, () => {
  console.log("server is running")
});
