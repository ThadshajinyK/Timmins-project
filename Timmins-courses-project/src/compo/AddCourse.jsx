import axios from "axios"
import Image from '../assets/fill.svg'

import { useState } from "react"


const AddCourse = () => {
    const [courseName, setCourseName] = useState ('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] =useState('')
    const [duration, setDuration] = useState('')
    const [courseFee, setCourseFee] = useState('')

    const handleSubmit = () => {
        try{
            axios.post("http://localhost:3002/postCourse", {
                courseName, description, startDate, duration, courseFee
            })
            .then((response) =>{
                console.log("succesfully add new course")
                console.log(response.data)

                setCourseName('')
                setDescription('')
                setDuration('')
                setCourseFee('')
                setStartDate('')
            })
        }catch(error){
            console.log("Error Adding New course", error)
        }
        
    }
  return (
    <div className="mb-5">
        <img className="formImage" src={Image} alt="fill from image" />
        
        <h2 className="course-header ms-5 p-2">
        Add new course Form
      </h2>
      <div className="container mt-4">
        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            
          />
          <label>Course Name</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            
          />
          <label>Description</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            
          />
          <label>Start Date</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            
          />
          <label>Duration</label>
        </div>

        <div className="form-floating mb-4 col-md-8">
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
  )
}

export default AddCourse