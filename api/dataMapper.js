const client = require('./database');

const dataMapper = {
  signup: (username, email, password, best_score, callback) => {
    if (best_score) {
      client.query(
        `INSERT INTO "user" ("username", "email", "password", "best_score") VALUES
          ($1, $2, $3, $4)`,
        [username, email, password, best_score],
        callback
      );
    } else {
      client.query(
        `INSERT INTO "user" ("username", "email", "password") VALUES
          ($1, $2, $3)`,
        [username, email, password],
        callback
      );
    }
  },
  getUserByUsername: (username, callback) => {
    client.query(
      `SELECT * FROM "user" WHERE "username" = $1`,
      [username],
      callback
    );
  },
  getUserByEmail: (email, callback) => {
    client.query(`SELECT * FROM "user" WHERE email = $1`, [email], callback);
  },
};

module.exports = dataMapper;
