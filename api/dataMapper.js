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
          ($1, $2, $3) RETURNING "id", "username", "best_score"`,
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
  updateScore: (newScore, userId, callback) => {
    client.query(
      `UPDATE "user" SET "best_score" = $1 WHERE "id" = $2`,
      [newScore, userId],
      callback
    );
  },
  getRank: (callback) => {
    client.query(
      `SELECT "username", "best_score" FROM "user" WHERE "best_score" >= 0 ORDER BY "best_score" DESC`,
      callback
    );
  },
  addFlag: (name, image, region, callback) => {
    client.query(
      `INSERT INTO "flags" ("name", "image", "region") VALUES ($1, $2, $3)`,
      [name, image, region],
      callback
    );
  },
  getFlags: (callback) => {
    client.query(`SELECT * FROM "flags"`, callback);
  },
  updatePassword: (password, userId, callback) => {
    client.query(
      `UPDATE "user" SET "password" = $1 WHERE "id" = $2`,
      [password, userId],
      callback
    );
  },
};

module.exports = dataMapper;
