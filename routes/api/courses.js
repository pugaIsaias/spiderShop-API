const express = require("express");
const router = express.Router();
const courses = require("../../controllers/Courses");

//Get all courses
router.get("/", courses.getCourses);

//Get single course
router.get("/:id", courses.getCourse);

module.exports = router;
