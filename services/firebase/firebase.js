const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../credentials/firebase/credential.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://rotaract-metropoli-gt-default-rtdb.firebaseio.com/",
});

const firebaseDatabase = firebaseAdmin.database();

module.exports = {
  rdb: firebaseDatabase,
};
