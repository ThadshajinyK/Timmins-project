const express = require("express");
// const connectDB = require("./config/db.js")
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
mongoURI ="mongodb+srv://shajiny:shajiny-timmins-project@cluster0.mvioz0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connectDB();
//mongoose.connect(mongoURI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log("error",error)
    process.exit();
  }
};

connectDB()



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
  // taughtBy: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Teachers",
  //   },
  // ],
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

// const teachersSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   courses: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Courses",
//   },
// });

// const Teachers = mongoose.model("Teachers", teachersSchema);

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

app.get("/getStudent/:_id", (req, res) => {
  try {
    const studentID = req.params._id;
    Students.findById(studentID).then(function (student) {
      res.json(student);
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

// app.get("/studentsCount/:_id", (req, res) =>{
//   try{
//     const _id = req.params._id;
//     const studentsCount = Courses.find({_id: _id}).enrolledCourses.count()
//     console.log(studentsCount)

//   }catch(error){
//     console.log("Error finding the count")
//     console.log(error)
//   }
// })

app.post("/postStudent", async (req, res) => {
  const { email, enrolledCourses, ...studentData } = req.body;
  try {
    let existingStudent = await Students.findOne({ email: email });

    if (existingStudent) {
      //student already exists, add new enrolledcourseId
      await Students.updateOne(
        { _id: existingStudent._id },
        { $addToSet: { enrolledCourses: enrolledCourses } }
      );
      await existingStudent.save();
      //update the course by adding the enrolledStudent id
      await Courses.updateOne(
        { _id: enrolledCourses },
        { $addToSet: { enrolledStudents: existingStudent._id } }
      );
      console.log(enrolledCourses);
      console.log(existingStudent);

      res.json(existingStudent);
    } else {
      //create new student
      const newStudent = new Students(req.body);
      await newStudent.save();
      res.json(newStudent);
      const enrolledCourseId = req.body.enrolledCourses;
      console.log(enrolledCourseId);
      await Courses.updateOne(
        { _id: enrolledCourseId },
        { $addToset: { enrolledStudents: newStudent._id } }
      );
      console.log(Courses.findById(enrolledCourseId));
    }
  } catch (error) {
    console.log("Error posting student data", error);
  }
});

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
    console.log(error);
  }
});

//Delete function

// Handle course deletion
app.delete("/deleteCourse/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    await Courses.findByIdAndDelete(courseId);

    // Remove course from enrolledCourses array in all related students
    await Students.updateMany(
      { enrolledCourses: courseId }, // Filter: Find all students who are enrolled in the deleted course
      { $pull: { enrolledCourses: courseId } } // Update: Pull the deleted courseId from enrolledCourses array
    );

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("Error deleting course:", error);
    res.status(500).json({ error: "Error deleting course" });
  }
});

///when delete the student account completely we can use this
app.delete("/deleteStudent/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    await Students.findByIdAndDelete(studentId);
    //delete the student record in each courses

    await Courses.updateMany(
      { enrolledStudents: studentId },
      { $pull: { enrolledStudents: studentId } }
    );
  } catch (error) {
    console.log("Error in deleting student", error);
  }
});

//need to write a deleteStudent fn to delete a student from particular course enrollment
// deleteStudentId from corresponding course
//remove the correspoding courseId from the student table

app.delete("/deleteStudentByCourse/:courseID/:studentID", async (req, res) => {
  const courseId = req.params.courseID;
  const studentId = req.params.studentID;
  try {
    //write the query
    console.log("Successfully deleted the student from this course");
  } catch (error) {
    console.log("Error deleting student from this course", error);
  }
});

app.listen("3002", () => {
  console.log("server is running");
});
