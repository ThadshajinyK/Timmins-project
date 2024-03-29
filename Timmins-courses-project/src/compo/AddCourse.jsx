import axios from "axios";
import addCourseImg from "../assets/addCourse.png";

import { useState } from "react";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [courseFee, setCourseFee] = useState("");

  const handleSubmit = () => {
    try {
      axios
        .post("http://localhost:3002/postCourse", {
          courseName,
          description,
          startDate,
          duration,
          courseFee,
        })
        .then((response) => {
          console.log("succesfully add new course");
          console.log(response.data);

          setCourseName("");
          setDescription("");
          setDuration("");
          setCourseFee("");
          setStartDate("");
        });
    } catch (error) {
      console.log("Error Adding New course", error);
    }
  };
  return (
    <div className="container mb-5">
      <div className="row">
      <h2 className="course-header">Add new course Form</h2>
      </div>
      
      <div className="mt-4 mb-3 row">
        <div className="container row">
        <div className="col-lg-6">
          <img
            className="addCourseFormImage"
            src={addCourseImg}
            alt="fill from image"
          />
        </div>
        <div className="col-lg-6">
          <div className="form-floating mb-4 col">
            <input
              type="text"
              className="form-control"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <label>Course Name</label>
          </div>

          <div className="form-floating mb-4 col">
            <textarea
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>

          <div className="form-floating mb-4 col">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>Start Date</label>
          </div>

          <div className="form-floating mb-4 col">
            <input
              type="text"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <label>Duration</label>
          </div>

          <div className="form-floating mb-4 col">
            <input
              type="number"
              className="form-control"
              value={courseFee}
              onChange={(e) => setCourseFee(e.target.value)}
            />
            <label>Course Fee</label>
          </div>
          <button onClick={handleSubmit} className="text-white mb-4">
            Submit
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddCourse;
