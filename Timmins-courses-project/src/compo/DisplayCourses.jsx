import axios from "axios";
import { useEffect, useState } from "react";
import CardImg from '../assets/courses.png'

const DisplayCourses = () => {
  const [courses, setCourses] = useState([]);
  // const [students, setStudents] = useState([])
  // const [teachers, setTeahcers] = useState([])

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
        <h2 className="course-header">Course Details</h2>
        
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
                    <h5 className="card-title"><b>{items.courseName}</b></h5>
                    <div className="card-text">
                        <p>Course Fee: {items.courseFee}$</p>
                        <button className="text-white"> Enroll</button>
                        <p>{items.description}</p>
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
