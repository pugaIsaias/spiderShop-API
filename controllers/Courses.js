const courses = require("../Courses");

exports.getCourses = (req, res) => res.status(200).json(courses);

exports.getCourse = (req, res) => {
  const found = courses.some((course) => course.id === parseInt(req.params.id));

  found
    ? res
        .status(200)
        .json(courses.filter((course) => course.id === parseInt(req.params.id)))
    : res
        .status(400)
        .json({ msg: `No member with the id of ${req.params.id}` });
};
