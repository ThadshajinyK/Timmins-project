import { useState, useEffect } from "react";
import axios from "axios";
import studentImg from "../assets/profile-user.png";

const ShowStudentsDetails = (props) => {
  const [student, setStudent] = useState({});
  //getStudentById

  useEffect(() => {
    fetchStudentDetails(props.id);
  }, []);

  const fetchStudentDetails = (studentID) => {
    axios
      .get(`http://localhost:3002/getStudent/${studentID}`)
      .then((response) => {
        //*********************** */
        setStudent(response.data);
        console.log("succesfully fetch student by id", response.data);
      })
      .catch((error) => {
        console.log("Error in getting student details", error);
      });
  };
  return (
    <div>
      <div className="col-lg-6">
        <div className="card mb-3">
          <img
            src={studentImg}
            className="student-img"
            alt="student profile image"
          />
          <div className="card-body">
            <h5 className="card-title">
              <b className="">{student.firstName} {student.lastName}</b>
            </h5>
            <div className="card-text">
              <p>{student.address}</p>
              <p>{student.phoneNo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowStudentsDetails;
