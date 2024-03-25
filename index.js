const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Timmins");

/** import model */
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courseImg: String,
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
  startDate: Date,
  duration: String,
  courseFee: Number,
  taughtBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teachers",
    },
  ],
});

const Courses = mongoose.model("Courses", courseSchema);

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: Date,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: String,
  address: String,
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  StudentImg: String,
  password: {
    type: String,
    required: true,
  },
});

const Students = mongoose.model("Students", studentSchema);

const teachersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',}
});

const Teachers = mongoose.model("Teachers", teachersSchema);

/** HTTP methods */

//GET Methods
app.get("/getCourses", (req, res) => {
  try {
    Courses.find({}).then(function (response) {
      res.json(response);
    });
  } catch (error) {
    console.log("Error fetching Courses records");
    console.error(error);
  }
});

app.get("/getCourse/:_id", (req, res) =>{
  try{
    const courseID = req.params._id;
    Courses.findById(courseID).then(function (course) {
      res.json(course)
    });
  }catch (error) {
    console.log("Error fetching course By id ", error)
  }
})

app.get("/getStudents", (req, res) => {
  try {
    Students.find({}).then(function (response) {
      res.json(response);
    });
  } catch (error) {
    console.log("Error fetching Students records");
    console.log(error);
  }
});

app.get("/getTeachers", (req, res) => {
  try {
    Teachers.find({}).then(function (response) {
      res.json(response);
    });
  } catch (error) {
    console.log("Error fetching Teachers records");
    console.log(error);
  }
});

// POST methods

app.post("/postCourse", async (req, res) => {
  const newCourse = new Courses(req.body);

  try {
    await newCourse.save();
    res.json(newCourse);
  } catch (error) {
    console.log("Error posting course data");
  }
});

app.post("/postStudent", async (req, res) => {
  const newStudent = new Students(req.body);

  try {
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    console.log("Error posting student data");
  }
});

app.post("/postTeacher", async (req, res) => {
  const newTeacher = new Teachers(req.body);
  try {
    await newTeacher.save();
    res.json(newTeacher);
  } catch (error) {
    console.log("Error posting teacher data");
  }
});

app.listen("3002", () => {
  console.log("server is running");
});
