import { useState, useEffect } from "react";
import axios from "axios";
import studentImg from "../assets/user.png";
import { Icon } from "@iconify-icon/react";

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
    <>
      <div className="card mb-3 col-lg-4 ">
        <img
          src={studentImg}
          className="student-img"
          alt="student profile image"
        />
        <div className="card-body pt-1">
          <h5 className="card-title text-center">
            <b>
              {student.firstName} {student.lastName}
            </b>
          </h5>
          <div className="card-text">
            <div className="d-flex">
              <Icon
                icon="ion:location-sharp"
                width="1.5rem"
                height="1.5rem"
                style={{ color: "black", marginRight: "10px" }}
              />
              <p> {student.address}</p>
            </div>
            <div className="d-flex">
              <Icon
                icon="solar:phone-bold"
                width="1.5rem"
                height="1.5rem"
                style={{ color: "black", marginRight: "10px" }}
              />
              <p>{student.phoneNo}</p>
            </div>

            <div className="d-flex">
              <Icon
                icon="clarity:email-solid"
                width="1.5rem"
                height="1.5rem"
                style={{ color: "black", marginRight: "10px" }}
              />
              <p>{student.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowStudentsDetails;
