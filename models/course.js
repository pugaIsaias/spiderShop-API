const { rdb } = require("../services/firebase/firebase");

module.exports = class Course {
  static getCourses() {
    return rdb.ref("courses").get();
  }

  static getCourse(courseId) {
    return rdb.ref("courses").child(courseId);
  }

  static createCourse(newCourse) {
    return rdb.ref("courses").push(newCourse);
  }

  static updateCourse(courseId) {
    return rdb.ref("courses").child(courseId);
  }

  static deleteCourse(courseId) {
    return rdb.ref("courses").child(courseId).remove();
  }
};
