const express = require('express');
const bodyParser = require('body-parser'); // To parse JSON request body
const { checkDB } = require('./utils/dbs');
const { mapel } = require('./models/mapel');
require('dotenv').config();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require('./models/account');
const { quiz } = require('./models/quiz');
const { questions } = require('./models/questions');


const app = express();
const port = 51000; // Change to your desired port number

// Middleware to parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

checkDB();

app.post('/api/exams', async (req, res) => {
  try {
    const { question, choices, answer, questionid, isEssay } = req.body;

    const newExam = new Exam({
      questionid,
      question,
      choices,
      answer,
      isEssay
    });

    const savedExam = await newExam.save();

    res.status(201).json(savedExam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

app.post('/api/exams/fetch', async (req, res) => {
  try {
    const { username, id, kodesoal } = req.body;


    const exam = await Exam.find();

    res.status(201).json(exam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

app.post('/api/exams/fetch', async (req, res) => {
  try {
    const { username, id, kodesoal } = req.body;


    const exam = await Exam.find();

    res.status(201).json(exam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});



app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(203).json({ err: "Credentials not complete" });
  }

  // Generate unique id
  const id = Math.floor(Math.random() * 99999);
  const findId = await user.findOne({
    id: id,
  });

  while (findId) {
    id = Math.floor(Math.random() * 99999);
  }

  // Check now date
  const now = new Date();
  const fullDate = now.toLocaleString("en-IN", {
    day: "numeric",
    weekday: "long",
    year: "numeric",
    month: "long",
  });

  // Hash the password
  const salt = genSaltSync(10);
  const hashPass = hashSync(password, salt);

  // Check if username is already used
  const findByUsername = await user.findOne({
    username: username,
  });

  // Check if email is already used
  const findByEmail = await user.findOne({
    email: email,
  });

  if (findByUsername) {
    return res.status(201).json({ err: "Username already used" });
  }

  if (findByEmail) {
    return res.status(202).json({ err: "Email already used" });
  }

  // Create new user data
  await user.create({
    id: id,
    username: username,
    email: email,
    password: hashPass,
    usertype: 'STUDENT',
    special: false,
    createdAt: fullDate,
  });

  const token = jwt.sign(
    {
      id,
      username,
      email,
    },
    process.env.SECRET_TOKEN_KEY
  );

  return res
    .status(200)
    .json({ err: "Successfully Registered New Account!", token });
} )

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(201).json({ err: "Incomplete credentials" });
  }

  const findUser = await user.findOne({
    username: username,
  });

  if (!findUser) {
    return res.status(202).json({ err: "Username doesn't exists" });
  }

  const checkPass = compareSync(password, findUser.password);

  if (!checkPass) {
    return res.status(203).json({ err: "Incorrect password!" });
  }

  const id = findUser.id;
  const email = findUser.email;

  const token = jwt.sign(
    {
      id,
      username,
      email,
    },
    process.env.SECRET_TOKEN_KEY
  );

  return res.status(200).json({ user: findUser });
})

app.post('/api/getuserdata', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(201).json({ err: "User id not defined." });
  }

  const findUser = await user.findOne({
    id: id,
  });

  if (!findUser) {
    return res.status(202).json({ err: "User not found" });
  }

  return res.status(200).json(findUser);
});

app.post("/api/mapel/create", async (req, res) => {
  try {
    const { owner, mapelname } = req.body;

    // Create a new mapel document using the Mongoose model
    const newMapel = new mapel({
      mapelid: Math.floor(Math.random() * 99999),
      mapelname,
      owner
    });

    // Save the new mapel to the database
    await newMapel.save();

    res.status(201).json({ message: "Mapel created successfully", mapel: newMapel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create mapel" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
