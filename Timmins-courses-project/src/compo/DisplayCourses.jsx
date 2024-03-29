import axios from "axios";
import { useEffect, useState } from "react";
import CardImg from "../assets/courses.png";
import { Icon } from "@iconify-icon/react";

const DisplayCourses = () => {
  const [courses, setCourses] = useState([]);

  const handleEnroll = (courseID) => {
    // Redirect to the enrollment page with the course ID
    window.location.href = `/enroll/${courseID}`;
  };

  const addNewCourse = () => {
    window.location.href = `/addCourse`;
  };

  const handleDelete = (courseID) => {
    try {
      axios
        .delete(`http://localhost:3002/deleteCourse/${courseID}`)
        .then((response) => {
          console.log("Successfully deleted the course", response.data);
        });
    } catch (error) {
      console.log("Error Deleting the course", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    axios
      .get("http://localhost:3002/getCourses")
      .then((response) => {
        setCourses(response.data);
        console.log(courses.data + " courses details successfully fetched");
      })
      .catch((error) => {
        console.error("Error fetching course details from frontend", error);
      });
  };

  return (
    <>
      <div className="mb-5">
        <div className="row m-2">
          <div className="col-10">
            <h2 className="course-header">Course Details</h2>
          </div>

          <div className="col-2">
            <button onClick={addNewCourse} className="btn btn-dark mt-4">
              Add new course
            </button>
          </div>
        </div>
        <div className="row">
          {courses.map((items) => (
            <>
              <div key={items._id} className="col-lg-6">
                <div className="card mb-3">
                  <img
                    src={CardImg}
                    className="card-img-top"
                    alt={items.courseName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>{items.courseName}</b>
                    </h5>
                    <div className="card-text">
                      <p>Course Fee: {items.courseFee}$</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => handleEnroll(items._id)}
                          className="text-white"
                        >
                          Course Details
                        </button>

                        <Icon
                          onClick={() => handleDelete(items._id)}
                          className="deletebutton"
                          icon="ic:baseline-delete"
                          width="2rem"
                          height="2rem"
                          style={{ color: "black" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayCourses;
