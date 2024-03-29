import enrollCover from "../assets/enroll.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import ShowStudentsDetails from "./ShowStudentsDetails";
// import ShowStudentsDetails from "./ShowStudentsDetails";

const Enrollment = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState({});
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  

  useEffect(() => {
    getCourseById(courseID);
  }, []);

  //sendEmail start
  const sendEmail = (emailAddress, courseName, firstName, lastName) => {
    const servideId = "service_6dwiys9";
    const templated = "template_cod2ny2";
    const publicKey = "Hp7zwn8I3jI5UnvZ7";
    // console.log(emailAddress , courseName)

    const params = {
      to_email: emailAddress,
      courseName: courseName,
      to_name: firstName + lastName,
      subject: `Enrollment Confirmation: ${courseName}`,
    };

    emailjs.send(servideId, templated, params, publicKey).then(
      (response) => {
        console.log("Email sent successfully:", response.text);
      },
      (error) => {
        console.log("Error sending email:", error.text);
      }
    );
  };
  //end of sendEmail

  //getcourseByid start
  const getCourseById = (courseID) => {
    axios
      .get(`http://localhost:3002/getCourse/${courseID}`)
      .then((response) => {
        setCourse(response.data);
        console.log("successfully fetched course by ID");
        setEnrolledStudents(response.data.enrolledStudents);
      })
      .catch((error) => {
        console.error("Error fetching course detail from frontend", error);
      });
  };

  //end of courseByid

  //start of handleSubmit fn
  const handleSubmit = () => {
    //validation

    axios
      .post("http://localhost:3002/postStudent", {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: emailAddress,
        phoneNo: phoneNo,
        address: address,
        enrolledCourses: [courseID],
      })
      .then((response) => {
        console.log(
          "student data successfully enrolled from frontend",
          response.data
        );

        sendEmail(emailAddress, course.courseName, firstName, lastName);

        setLastName("");
        setAddress("");
        setDob("");
        setFirstName("");
        setEmailAddress("");

        setPhoneNo("");
      });
  };
  // end of submit fn
  return (
    <div className="mb-5">
      <img
        className="coursesCoverImg"
        src={enrollCover}
        alt="enrollment form cover page img"
      />

      {/* Course Details displaying container */}
      <div className="container">
        <h1 className="mt-4 mb-4">{course.courseName}</h1>

        <p>{course.description}</p>
        <p>
          <b>Course Start Date:</b> {course.startDate}
        </p>
        <p>
          <b>Course Duration :</b> {course.duration}
        </p>
        <p>
          <b>Course fee:</b> {course.courseFee}$
        </p>
        <p>
          <b>No of students enrolled for this course:</b>
          {" " + enrolledStudents.length}
        </p>

        <div className="container">
          
          <h1 className="mb-4 mt-4">Students Details: </h1>
          <div className="row">
          {enrolledStudents.map((stu) => {
            return (
              <>
              
              <ShowStudentsDetails id={stu} />
              
                
              </>
            );
          })}
          </div>
        </div>

        {/* <b>Details of the students who enrolled for this course:</b> */}
      </div>

      {/* form container */}
      <div className="container">
        <h2 className="course-header">
          Enrollment Form for {course.courseName} Course
        </h2>
      </div>

      <div className="container mt-4">
        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your First Name"
          />
          <label>First Name</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your Last Name"
          />
          <label>Last Name</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Select the date of birth"
          />
          <label>Date of Birth</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="email"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="name@example.com"
          />
          <label>Email address</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="0XX XXXXXXX"
          />
          <label>Phone Number</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Enter you Address"
          />
          <label>Address</label>
        </div>

        <button onClick={handleSubmit} className="text-white mb-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Enrollment;
