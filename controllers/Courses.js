const courses = require("../Courses");
const { rdb } = require("../services/firebase/firebase");

exports.createCourse = (req, res, next) => {
  const image = req.file;
  console.log(image);

  const newCourse = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    banner: req.body.banner,
    link: req.body.link,
  };

  rdb
    .ref("courses")
    .push(newCourse)
    .then((ref) => {
      res.status(201).json({
        msg: "Curso agregado correctamente",
        product: { id: ref.key, ...newCourse },
      });
    });
};

exports.getCourses = (req, res) => {
  rdb
    .ref("courses")
    .get()
    .then((dataSnapShot) => res.status(200).json(dataSnapShot))
    .catch((error) => res.status(400).json({ error }));
};

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
