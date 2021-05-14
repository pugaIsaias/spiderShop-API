if (process.env.NODE_ENV == "production") {
  module.exports = {
    scheme: "https",
    server: "rotaract-metropoli-gt.uc.r.appspot.com",
    ip: process.env.IP,
    port: process.env.PORT || 2500,
  };
} else {
  module.exports = {
    scheme: "http",
    server: "localhost",
    ip: "127.0.0.1",
    port: process.env.PORT || 2500,
  };
}
