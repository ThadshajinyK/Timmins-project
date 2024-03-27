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
    ref: "Courses",
  },
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

app.get("/getCourse/:_id", (req, res) => {
  try {
    const courseID = req.params._id;
    Courses.findById(courseID).then(function (course) {
      res.json(course);
    });
  } catch (error) {
    console.log("Error fetching course By id ", error);
  }
});

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

// app.post("/postCourse", async (req, res) => {
//   const newCourse = new Courses(req.body);

//   try {
//     await newCourse.save();
//     res.json(newCourse);
//   } catch (error) {
//     console.log("Error posting course data");
//   }
// });

app.post("/postCourse", async (req, res) => {
  try {
    const newCourse = new Courses(req.body);
    await newCourse.save();

    //Update enrolledStudents in Students collection
    await Students.updateMany(
      { _id: { $in: newCourse.enrolledStudents } },
      { $addToSet: { enrolledCourses: newCourse._id } }
    );
    res.json(newCourse);
  } catch (error) {
    console.error("Error posting course data", error);
    console.log(error)
  }
});



//Delete function eluthanum
// Handle student deletion
app.delete("/deleteStudent/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    await Students.findByIdAndDelete(studentId);

    // Remove student from enrolledStudents array in all related courses
    await Courses.updateMany(
      { enrolledStudents: studentId },
      { $pull: { enrolledStudents: studentId } }
    );

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

// Handle course deletion
app.delete("/deleteCourse/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await Courses.findByIdAndDelete(courseId);

    // Remove course from enrolledCourses array in all related students
    await Students.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } }
    );

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("Error deleting course:", error);
    res.status(500).json({ error: "Error deleting course" });
  }
});

// app.post("/postStudent", async (req, res) => {
//   const newStudent = new Students(req.body);
//   try {
//     await newStudent.save();
//     res.json(newStudent);
//   } catch (error) {
//     console.log("Error posting student data");
//   }
// });

app.post("/postTeacher", async (req, res) => {
  const newTeacher = new Teachers(req.body);
  try {
    await newTeacher.save();
    res.json(newTeacher);
  } catch (error) {
    console.log("Error posting teacher data");
  }
});

app.post("/postStudent", async (req, res) => {
  const { email, enrolledCourses, ...studentData } = req.body;
  try {
    let existingStudent = await Students.findOne({email: email});

    if (existingStudent) {
      //student already exists, update enroleldSourses
      existingStudent.enrolledCourses.$addToSet(...enrolledCourses);
      await existingStudent.save();
      res.json(existingStudent);
    } else {
      //create new student
      const newStudent = new Students(req.body);
      await newStudent.save();
      res.json(newStudent);
    }
  } catch (error) {
    console.log("Error posting student data", error);
  }
});

app.listen("3002", () => {
  console.log("server is running");
});


//mail sending
//-------------------------------------
// const nodemailer = require('nodemailer');

// Create a nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Specify your email service provider
//   auth: {
//     user: 'shajiny26@gmail.com', // Your email address
//     pass: 'Vkthadsha@google1', // Your email password
//   },
// });

// Function to send acknowledgment email
// const sendAcknowledgmentEmail = (studentEmail) => {
//   const mailOptions = {
//     from: 'shajiny26@gmail.com', // Your email address
//     to: studentEmail, // Student's email address
//     subject: 'Enrollment Acknowledgment', // Email subject
//     text: `Dear Student,\n\nThank you for enrolling in the  course. We acknowledge your enrollment and look forward to seeing you in the course.\n\nBest regards,\nTimmins Training & Consulting`, // Email body
//   };

  // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// Call sendAcknowledgmentEmail function after successful enrollment
// app.post('/postStudent', async (req, res) => {
//   const newStudent = new Students(req.body);
//   try {
//     await newStudent.save();
//     // Send acknowledgment email to the enrolled student
//     sendAcknowledgmentEmail(newStudent.email, req.body.courseName);
//     res.json(newStudent);
//   } catch (error) {
//     console.log('Error posting student data:', error);
//     res.status(500).json({ error: 'Error posting student data' });
//   }
// });

