

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Timmins")

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        courseImg: String,
        enrolledStudents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Students'
        }],
        startDate: Date,
        duration: String, 
        courseFee: Number,
        taughtBy: [
            {
                type: mongoose.Schema.type.ObjectId,
                ref: 'Teachers'
            }
        ]
        

        })

        const Course = mongoose.model('Courses', courseSchema)

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    dob: Date,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: String,
    address: String, 
    enrolledStudents: [
        {
            type: mongoose.Schema.type.ObjectId,
            ref: 'Courses'
        }
    ],
    StudentImg: String,
    password: {
        type:  String,
        required: true
    }
})

const Students = mongoose.model('Students', studentSchema)











