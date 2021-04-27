const path = require("path"),
  rootPath = path.normalize(__dirname + "/..");
require("dotenv").config();

const env = process.env.NODE_ENV || "production";

const config = {
  test: {
    root: rootPath,
    app: {
      name: "talkie-phote",
    },
    port: 27017,
    db: "mongodb://localhost:27017/react-discord",
    jwtSecret: process.env.jwtSecret,
  },
  production: {
    root: rootPath,
    app: {
      name: "talkie-phote",
    },
    port: 27017,
    db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qmrxs.mongodb.net/talkie-phote?retryWrites=true&w=majority`,
    jwtSecret: process.env.jwtSecret,
  },
};

module.exports = config[env];
