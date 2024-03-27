import enrollCover from "../assets/enroll.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Enrollment = () => {
  const {courseID} = useParams();
  const [course, setCourse] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getCourseById(courseID);
  }, []);

  const getCourseById = (courseID) => {
    axios
      .get(`http://localhost:3002/getCourse/${courseID}`)
      .then((response) => {
        setCourse(response.data);
        console.log("successfully fetched course by ID");
      })
      .catch((error) => {
        console.error("Error fetching course detail from frontend", error);
      });
  };

  const handleSubmit = (emailAddress) => {
    //validation

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3002/postStudent", {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: emailAddress,
        phoneNo: phoneNo,
        address: address,
        password: password,
        enrolledCourses:[courseID]
      })
      .then((response) => {
        console.log(
          "student data successfully enrolled from frontend",
          response.data
        );
        



        setLastName("");
        setAddress("");
        setDob("");
        setFirstName("");
        setEmailAddress("");
        setConfirmPassword("");
        setPassword("");
        setPhoneNo("");
      });
  };
  return (
    <div className="mb-5">
      <img
        className="coursesCoverImg"
        src={enrollCover}
        alt="enrollment form cover page img"
      />
      {/* form container */}

      <h2 className="course-header ms-5 p-2">Enrollment Form for {course.courseName} Course

      </h2>
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

        <div className="form-floating mb-4 col-md-8">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label>Password</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="re-enterPassword"
          />
          <label>Confirm Password</label>
        </div>

        <button onClick={handleSubmit} className="text-white mb-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Enrollment;
