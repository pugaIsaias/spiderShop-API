const { rdb } = require("../services/firebase/firebase");
const CourseDB = require("../models/course");

exports.createCourse = async (req, res, next) => {
  const image = req.file;
  console.log(image);

  const newCourse = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    banner: req.body.banner,
    link: null,
  };

  CourseDB.createCourse(newCourse).then((ref) => {
    res.status(201).json({
      msg: "Curso agregado correctamente",
      product: { id: ref.key, ...newCourse, link: "/" + ref.key },
    });
  });
};

exports.getCourses = async (req, res, next) => {
  CourseDB.getCourses()
    .then((dataSnapShot) => {
      let courses = dataSnapShot.val();
      courses = Object.keys(courses).map((key) => ({
        id: key,
        ...courses[key],
      }));
      res.status(200).json(courses);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getCourse = async (req, res, next) => {
  const courseId = req.params.id;
  CourseDB.getCourse(courseId)
    .once("value", (snapshot) => {
      let course = snapshot.val();
      if (course != null) {
        course = { id: courseId, ...snapshot.val() };
      }
      res.status(200).json({ ...course });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.updateCourse = async (req, res, next) => {
  const courseId = req.params.id;
  if (req.body.price) {
    req.body.price = parseFloat(req.body.price);
  }

  CourseDB.updateCourse(courseId)
    .update({
      ...req.body,
    })
    .then(() => res.status(201).json({ id: courseId, ...req.body }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;
  CourseDB.deleteCourse(courseId)
    .then(() =>
      res.status(200).json({ msg: `curso con id:${courseId} removido` })
    )
    .catch((error) => res.status(400).json({ error: error }));
};
