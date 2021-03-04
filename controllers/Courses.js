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

exports.getCourses = (req, res, next) => {
  rdb
    .ref("courses")
    .get()
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

exports.getCourse = (req, res, next) => {
  const courseId = req.params.id;
  rdb
    .ref("courses")
    .child(courseId)
    .once("value", (snapshot) => {
      let course = snapshot.val();
      if (course != null) {
        course = { id: courseId, ...snapshot.val() };
      }
      res.status(200).json({ ...course });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deleteCourse = (req, res, next) => {
  const courseId = req.params.id;
  rdb
    .ref("courses")
    .child(courseId)
    .remove()
    .then(() =>
      res
        .status(200)
        .json({ msg: `curso con id:${courseId} removido` })
        .catch((error) => res.status(400).json({ error: error }))
    );
};
