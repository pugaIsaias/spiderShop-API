const express = require("express");
const router = express.Router();
const courses = require("../../Courses");

//Get all courses
router.get("/", (req, res) => res.json(courses));

//Get single course
router.get("/:id", (req, res) => {
  const found = courses.some((course) => course.id === parseInt(req.params.id));

  found
    ? res.json(
        courses.filter((course) => course.id === parseInt(req.params.id))
      )
    : res
        .status(400)
        .json({ msg: `No member with the id of ${req.params.id}` });
});

module.exports = router;
